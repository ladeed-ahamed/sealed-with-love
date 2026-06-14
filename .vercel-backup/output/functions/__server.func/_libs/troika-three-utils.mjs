import {
  Y as MeshDistanceMaterial,
  Z as MeshDepthMaterial,
  _ as RGBADepthPacking,
  G as UniformsUtils,
  $ as ShaderChunk,
} from "./three.mjs";
const voidMainRegExp = /\bvoid\s+main\s*\(\s*\)\s*{/g;
function expandShaderIncludes(source) {
  const pattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
  function replace(match, include) {
    let chunk = ShaderChunk[include];
    return chunk ? expandShaderIncludes(chunk) : match;
  }
  return source.replace(pattern, replace);
}
const _lut = [];
for (let i = 0; i < 256; i++) {
  _lut[i] = (i < 16 ? "0" : "") + i.toString(16);
}
function generateUUID() {
  const d0 = (Math.random() * 4294967295) | 0;
  const d1 = (Math.random() * 4294967295) | 0;
  const d2 = (Math.random() * 4294967295) | 0;
  const d3 = (Math.random() * 4294967295) | 0;
  const uuid =
    _lut[d0 & 255] +
    _lut[(d0 >> 8) & 255] +
    _lut[(d0 >> 16) & 255] +
    _lut[(d0 >> 24) & 255] +
    "-" +
    _lut[d1 & 255] +
    _lut[(d1 >> 8) & 255] +
    "-" +
    _lut[((d1 >> 16) & 15) | 64] +
    _lut[(d1 >> 24) & 255] +
    "-" +
    _lut[(d2 & 63) | 128] +
    _lut[(d2 >> 8) & 255] +
    "-" +
    _lut[(d2 >> 16) & 255] +
    _lut[(d2 >> 24) & 255] +
    _lut[d3 & 255] +
    _lut[(d3 >> 8) & 255] +
    _lut[(d3 >> 16) & 255] +
    _lut[(d3 >> 24) & 255];
  return uuid.toUpperCase();
}
const assign =
  Object.assign ||
  function () {
    let target = arguments[0];
    for (let i = 1, len = arguments.length; i < len; i++) {
      let source = arguments[i];
      if (source) {
        for (let prop in source) {
          if (Object.prototype.hasOwnProperty.call(source, prop)) {
            target[prop] = source[prop];
          }
        }
      }
    }
    return target;
  };
const epoch = Date.now();
const CONSTRUCTOR_CACHE = /* @__PURE__ */ new WeakMap();
const SHADER_UPGRADE_CACHE = /* @__PURE__ */ new Map();
let materialInstanceId = 1e10;
function createDerivedMaterial(baseMaterial, options) {
  const optionsKey = getKeyForOptions(options);
  let ctorsByDerivation = CONSTRUCTOR_CACHE.get(baseMaterial);
  if (!ctorsByDerivation) {
    CONSTRUCTOR_CACHE.set(baseMaterial, (ctorsByDerivation = /* @__PURE__ */ Object.create(null)));
  }
  if (ctorsByDerivation[optionsKey]) {
    return new ctorsByDerivation[optionsKey]();
  }
  const privateBeforeCompileProp = `_onBeforeCompile${optionsKey}`;
  const onBeforeCompile = function (shaderInfo, renderer) {
    baseMaterial.onBeforeCompile.call(this, shaderInfo, renderer);
    const cacheKey =
      this.customProgramCacheKey() +
      "|" +
      shaderInfo.vertexShader +
      "|" +
      shaderInfo.fragmentShader;
    let upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey];
    if (!upgradedShaders) {
      const upgraded = upgradeShaders(this, shaderInfo, options, optionsKey);
      upgradedShaders = SHADER_UPGRADE_CACHE[cacheKey] = upgraded;
    }
    shaderInfo.vertexShader = upgradedShaders.vertexShader;
    shaderInfo.fragmentShader = upgradedShaders.fragmentShader;
    assign(shaderInfo.uniforms, this.uniforms);
    if (options.timeUniform) {
      shaderInfo.uniforms[options.timeUniform] = {
        get value() {
          return Date.now() - epoch;
        },
      };
    }
    if (this[privateBeforeCompileProp]) {
      this[privateBeforeCompileProp](shaderInfo);
    }
  };
  const DerivedMaterial = function DerivedMaterial2() {
    return derive(options.chained ? baseMaterial : baseMaterial.clone());
  };
  const derive = function (base) {
    const derived = Object.create(base, descriptor);
    Object.defineProperty(derived, "baseMaterial", { value: baseMaterial });
    Object.defineProperty(derived, "id", { value: materialInstanceId++ });
    derived.uuid = generateUUID();
    derived.uniforms = assign({}, base.uniforms, options.uniforms);
    derived.defines = assign({}, base.defines, options.defines);
    derived.defines[`TROIKA_DERIVED_MATERIAL_${optionsKey}`] = "";
    derived.extensions = assign({}, base.extensions, options.extensions);
    derived._listeners = void 0;
    return derived;
  };
  const descriptor = {
    constructor: { value: DerivedMaterial },
    isDerivedMaterial: { value: true },
    type: {
      get: () => baseMaterial.type,
      set: (value) => {
        baseMaterial.type = value;
      },
    },
    isDerivedFrom: {
      writable: true,
      configurable: true,
      value: function (testMaterial) {
        const base = this.baseMaterial;
        return (
          testMaterial === base ||
          (base.isDerivedMaterial && base.isDerivedFrom(testMaterial)) ||
          false
        );
      },
    },
    customProgramCacheKey: {
      writable: true,
      configurable: true,
      value: function () {
        return baseMaterial.customProgramCacheKey() + "|" + optionsKey;
      },
    },
    onBeforeCompile: {
      get() {
        return onBeforeCompile;
      },
      set(fn) {
        this[privateBeforeCompileProp] = fn;
      },
    },
    copy: {
      writable: true,
      configurable: true,
      value: function (source) {
        baseMaterial.copy.call(this, source);
        if (!baseMaterial.isShaderMaterial && !baseMaterial.isDerivedMaterial) {
          assign(this.extensions, source.extensions);
          assign(this.defines, source.defines);
          assign(this.uniforms, UniformsUtils.clone(source.uniforms));
        }
        return this;
      },
    },
    clone: {
      writable: true,
      configurable: true,
      value: function () {
        const newBase = new baseMaterial.constructor();
        return derive(newBase).copy(this);
      },
    },
    /**
     * Utility to get a MeshDepthMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDepthMaterial: {
      writable: true,
      configurable: true,
      value: function () {
        let depthMaterial = this._depthMaterial;
        if (!depthMaterial) {
          depthMaterial = this._depthMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial
              ? baseMaterial.getDepthMaterial()
              : new MeshDepthMaterial({ depthPacking: RGBADepthPacking }),
            options,
          );
          depthMaterial.defines.IS_DEPTH_MATERIAL = "";
          depthMaterial.uniforms = this.uniforms;
        }
        return depthMaterial;
      },
    },
    /**
     * Utility to get a MeshDistanceMaterial that will honor this derived material's vertex
     * transformations and discarded fragments.
     */
    getDistanceMaterial: {
      writable: true,
      configurable: true,
      value: function () {
        let distanceMaterial = this._distanceMaterial;
        if (!distanceMaterial) {
          distanceMaterial = this._distanceMaterial = createDerivedMaterial(
            baseMaterial.isDerivedMaterial
              ? baseMaterial.getDistanceMaterial()
              : new MeshDistanceMaterial(),
            options,
          );
          distanceMaterial.defines.IS_DISTANCE_MATERIAL = "";
          distanceMaterial.uniforms = this.uniforms;
        }
        return distanceMaterial;
      },
    },
    dispose: {
      writable: true,
      configurable: true,
      value() {
        const { _depthMaterial, _distanceMaterial } = this;
        if (_depthMaterial) _depthMaterial.dispose();
        if (_distanceMaterial) _distanceMaterial.dispose();
        baseMaterial.dispose.call(this);
      },
    },
  };
  ctorsByDerivation[optionsKey] = DerivedMaterial;
  return new DerivedMaterial();
}
function upgradeShaders(material, { vertexShader, fragmentShader }, options, key) {
  let {
    vertexDefs,
    vertexMainIntro,
    vertexMainOutro,
    vertexTransform,
    fragmentDefs,
    fragmentMainIntro,
    fragmentMainOutro,
    fragmentColorTransform,
    customRewriter,
    timeUniform,
  } = options;
  vertexDefs = vertexDefs || "";
  vertexMainIntro = vertexMainIntro || "";
  vertexMainOutro = vertexMainOutro || "";
  fragmentDefs = fragmentDefs || "";
  fragmentMainIntro = fragmentMainIntro || "";
  fragmentMainOutro = fragmentMainOutro || "";
  if (vertexTransform || customRewriter) {
    vertexShader = expandShaderIncludes(vertexShader);
  }
  if (fragmentColorTransform || customRewriter) {
    fragmentShader = fragmentShader.replace(
      /^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,
      "\n//!BEGIN_POST_CHUNK $1\n$&\n//!END_POST_CHUNK\n",
    );
    fragmentShader = expandShaderIncludes(fragmentShader);
  }
  if (customRewriter) {
    let res = customRewriter({ vertexShader, fragmentShader });
    vertexShader = res.vertexShader;
    fragmentShader = res.fragmentShader;
  }
  if (fragmentColorTransform) {
    let postChunks = [];
    fragmentShader = fragmentShader.replace(
      /^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,
      // [^]+? = non-greedy match of any chars including newlines
      (match) => {
        postChunks.push(match);
        return "";
      },
    );
    fragmentMainOutro = `${fragmentColorTransform}
${postChunks.join("\n")}
${fragmentMainOutro}`;
  }
  if (timeUniform) {
    const code = `
uniform float ${timeUniform};
`;
    vertexDefs = code + vertexDefs;
    fragmentDefs = code + fragmentDefs;
  }
  if (vertexTransform) {
    vertexShader = `vec3 troika_position_${key};
vec3 troika_normal_${key};
vec2 troika_uv_${key};
${vertexShader}
`;
    vertexDefs = `${vertexDefs}
void troikaVertexTransform${key}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${vertexTransform}
}
`;
    vertexMainIntro = `
troika_position_${key} = vec3(position);
troika_normal_${key} = vec3(normal);
troika_uv_${key} = vec2(uv);
troikaVertexTransform${key}(troika_position_${key}, troika_normal_${key}, troika_uv_${key});
${vertexMainIntro}
`;
    vertexShader = vertexShader.replace(
      /\b(position|normal|uv)\b/g,
      (match, match1, index, fullStr) => {
        return /\battribute\s+vec[23]\s+$/.test(fullStr.substr(0, index))
          ? match1
          : `troika_${match1}_${key}`;
      },
    );
    if (!(material.map && material.map.channel > 0)) {
      vertexShader = vertexShader.replace(/\bMAP_UV\b/g, `troika_uv_${key}`);
    }
  }
  vertexShader = injectIntoShaderCode(
    vertexShader,
    key,
    vertexDefs,
    vertexMainIntro,
    vertexMainOutro,
  );
  fragmentShader = injectIntoShaderCode(
    fragmentShader,
    key,
    fragmentDefs,
    fragmentMainIntro,
    fragmentMainOutro,
  );
  return {
    vertexShader,
    fragmentShader,
  };
}
function injectIntoShaderCode(shaderCode, id, defs, intro, outro) {
  if (intro || outro || defs) {
    shaderCode = shaderCode.replace(
      voidMainRegExp,
      `
${defs}
void troikaOrigMain${id}() {`,
    );
    shaderCode += `
void main() {
  ${intro}
  troikaOrigMain${id}();
  ${outro}
}`;
  }
  return shaderCode;
}
function optionsJsonReplacer(key, value) {
  return key === "uniforms" ? void 0 : typeof value === "function" ? value.toString() : value;
}
let _idCtr = 0;
const optionsHashesToIds = /* @__PURE__ */ new Map();
function getKeyForOptions(options) {
  const optionsHash = JSON.stringify(options, optionsJsonReplacer);
  let id = optionsHashesToIds.get(optionsHash);
  if (id == null) {
    optionsHashesToIds.set(optionsHash, (id = ++_idCtr));
  }
  return id;
}
export { createDerivedMaterial as c, voidMainRegExp as v };
