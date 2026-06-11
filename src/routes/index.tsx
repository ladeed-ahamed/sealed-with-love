import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { wedding } from "@/lib/wedding-data";
import { FloatingParticles } from "@/components/wedding/FloatingParticles";
import { CornerOrnament } from "@/components/wedding/CornerOrnament";
import { Envelope } from "@/components/wedding/Envelope";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal, Divider } from "@/components/wedding/Reveal";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${wedding.groom.name.split(" ")[0]} & ${wedding.bride.name.split(" ")[0]} — Wedding Invitation` },
      { name: "description", content: wedding.body },
      { property: "og:title", content: `${wedding.groom.name} & ${wedding.bride.name}` },
      { property: "og:description", content: wedding.body },
    ],
  }),
  component: Index,
});

const galleryImages = [
  "https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80",
  "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=900&q=80",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=900&q=80",
  "https://images.unsplash.com/photo-1525772764200-be829a350797?w=900&q=80",
  "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?w=900&q=80",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80",
];

function Index() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden text-ink">
      <FloatingParticles count={40} />
      <MusicPlayer />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section
            key="envelope"
            className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-12"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <CornerOrnament className="pointer-events-none absolute left-4 top-4 h-24 w-24 text-rosegold/60 sm:h-32 sm:w-32" />
            <CornerOrnament className="pointer-events-none absolute right-4 top-4 h-24 w-24 text-rosegold/60 sm:h-32 sm:w-32" flipX />
            <CornerOrnament className="pointer-events-none absolute bottom-4 left-4 h-24 w-24 text-rosegold/60 sm:h-32 sm:w-32" flipY />
            <CornerOrnament className="pointer-events-none absolute bottom-4 right-4 h-24 w-24 text-rosegold/60 sm:h-32 sm:w-32" flipX flipY />

            <motion.div
              className="mb-10 max-w-xl text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <p className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                YOU ARE CORDIALLY INVITED TO WITNESS
              </p>
              <h1 className="mt-3 font-display text-2xl font-medium italic text-ink sm:text-3xl">
                The Celebration of Love &amp; Togetherness
              </h1>
            </motion.div>

            <Envelope onOpen={() => setOpened(true)} />
          </motion.section>
        ) : (
          <motion.main
            key="invitation"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10"
          >
            {/* SECTION 1 — HERO */}
            <section className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 text-center">
              <CornerOrnament className="pointer-events-none absolute left-3 top-3 h-20 w-20 text-rosegold/60 sm:h-28 sm:w-28" />
              <CornerOrnament className="pointer-events-none absolute right-3 top-3 h-20 w-20 text-rosegold/60 sm:h-28 sm:w-28" flipX />

              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
                }}
                className="flex max-w-3xl flex-col items-center gap-6"
              >
                {[
                  <p key="a" className="font-arabic text-xl text-rosegold sm:text-2xl" dir="rtl">
                    {wedding.openingLine}
                  </p>,
                  <p key="b" className="font-body text-sm italic text-ink-muted sm:text-base">
                    {wedding.openingTranslation}
                  </p>,
                  <p key="c" className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                    {wedding.hosts.toUpperCase()}
                  </p>,
                  <div key="d" className="flex flex-col items-center gap-3 sm:flex-row sm:gap-8">
                    <div className="text-center">
                      <h2 className="font-script text-5xl text-ink sm:text-7xl">{wedding.groom.name.split(" ")[0]}</h2>
                      <p className="mt-1 font-label text-[10px] tracking-widest text-rosegold-soft sm:text-xs">
                        {wedding.groom.name}
                      </p>
                    </div>
                    <span className="font-display text-3xl italic text-rosegold sm:text-5xl">&amp;</span>
                    <div className="text-center">
                      <h2 className="font-script text-5xl text-ink sm:text-7xl">{wedding.bride.name.split(" ")[0]}</h2>
                      <p className="mt-1 font-label text-[10px] tracking-widest text-rosegold-soft sm:text-xs">
                        {wedding.bride.name}
                      </p>
                    </div>
                  </div>,
                  <Divider key="e" className="my-2" />,
                  <p key="f" className="font-display text-xl text-ink sm:text-2xl">
                    {wedding.event.date}
                  </p>,
                  <p key="g" className="font-script text-3xl text-rosegold sm:text-4xl">
                    {wedding.culturalPhrase}
                  </p>,
                ].map((node, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 24 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
                    }}
                  >
                    {node}
                  </motion.div>
                ))}
              </motion.div>

              <CornerOrnament className="pointer-events-none absolute bottom-3 left-3 h-20 w-20 text-rosegold/60 sm:h-28 sm:w-28" flipY />
              <CornerOrnament className="pointer-events-none absolute bottom-3 right-3 h-20 w-20 text-rosegold/60 sm:h-28 sm:w-28" flipX flipY />
            </section>

            {/* SECTION 2 — COUNTDOWN */}
            <section className="px-5 py-20">
              <div className="mx-auto max-w-3xl text-center">
                <Reveal>
                  <p className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                    COUNTING THE MOMENTS
                  </p>
                  <h3 className="mt-3 font-display text-3xl italic sm:text-4xl">Until We Begin Forever</h3>
                  <Divider className="mt-6" />
                </Reveal>
                <Reveal delay={0.2}>
                  <div className="mt-10">
                    <Countdown iso={wedding.event.iso} />
                  </div>
                </Reveal>
              </div>
            </section>

            {/* SECTION 3 — INVITATION MESSAGE */}
            <section className="px-5 py-20">
              <div className="mx-auto max-w-2xl text-center">
                <Reveal>
                  <Divider />
                  <p className="mt-8 font-display text-2xl italic leading-relaxed text-ink sm:text-3xl">
                    “{wedding.body}”
                  </p>
                  <p className="mt-6 font-script text-3xl text-rosegold sm:text-4xl">
                    with our families' blessings
                  </p>
                </Reveal>
              </div>
            </section>

            {/* SECTION 4 — WEDDING DETAILS */}
            <section className="px-5 py-20">
              <div className="mx-auto max-w-2xl">
                <Reveal>
                  <motion.div
                    whileHover={{ y: -4, boxShadow: "0 40px 80px -30px rgba(0,0,0,0.25)" }}
                    transition={{ duration: 0.3 }}
                    className="parchment-card shimmer rounded-lg px-6 py-10 text-center sm:px-12 sm:py-14"
                  >
                    <CornerOrnament className="pointer-events-none absolute left-2 top-2 h-14 w-14 text-rosegold/60" />
                    <CornerOrnament className="pointer-events-none absolute right-2 top-2 h-14 w-14 text-rosegold/60" flipX />
                    <CornerOrnament className="pointer-events-none absolute bottom-2 left-2 h-14 w-14 text-rosegold/60" flipY />
                    <CornerOrnament className="pointer-events-none absolute bottom-2 right-2 h-14 w-14 text-rosegold/60" flipX flipY />

                    <p className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                      {wedding.event.label.toUpperCase()}
                    </p>
                    <h3 className="mt-3 font-script text-4xl text-ink sm:text-5xl">
                      {wedding.event.culturalName}
                    </h3>
                    <Divider className="my-6" />

                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="font-label text-[10px] tracking-widest text-rosegold">DATE</p>
                        <p className="mt-1 font-display text-lg sm:text-xl">{wedding.event.date}</p>
                        <p className="font-body text-xs italic text-ink-muted">{wedding.event.secondaryDate}</p>
                      </div>
                      <div>
                        <p className="font-label text-[10px] tracking-widest text-rosegold">TIME</p>
                        <p className="mt-1 font-display text-lg sm:text-xl">{wedding.event.time}</p>
                      </div>
                      <div className="sm:col-span-2">
                        <p className="font-label text-[10px] tracking-widest text-rosegold">VENUE</p>
                        <p className="mt-1 font-display text-lg sm:text-xl">{wedding.event.venue}</p>
                        <p className="font-body text-sm text-ink-muted">{wedding.event.address}</p>
                      </div>
                    </div>

                    <a
                      href={wedding.event.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-sm border border-rosegold/60 bg-rosegold/10 px-6 py-3 font-label text-[11px] tracking-[0.25em] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-rosegold hover:text-primary-foreground"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-7 8-13a8 8 0 10-16 0c0 6 8 13 8 13z" />
                        <circle cx="12" cy="9" r="3" />
                      </svg>
                      OPEN MAPS
                    </a>
                  </motion.div>
                </Reveal>
              </div>
            </section>

            {/* SECTION 5 — FAMILY */}
            <section className="px-5 py-20">
              <div className="mx-auto max-w-4xl">
                <Reveal>
                  <div className="text-center">
                    <p className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                      WITH BLESSINGS FROM
                    </p>
                    <h3 className="mt-3 font-display text-3xl italic sm:text-4xl">Our Beloved Families</h3>
                    <Divider className="mt-6" />
                  </div>
                </Reveal>

                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  {[wedding.groom, wedding.bride].map((p, idx) => (
                    <Reveal key={p.name} delay={idx * 0.15}>
                      <div className="parchment-card rounded-lg px-6 py-10 text-center">
                        <p className="font-label text-[10px] tracking-[0.3em] text-rosegold">
                          {idx === 0 ? "THE GROOM" : "THE BRIDE"}
                        </p>
                        <h4 className="mt-3 font-script text-4xl text-ink">{p.name.split(" ")[0]}</h4>
                        <p className="font-display text-lg italic text-ink">{p.name}</p>
                        <Divider className="my-5" />
                        <p className="font-body text-sm text-ink-muted">{p.subtitle}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 6 — GALLERY */}
            <section className="px-5 py-20">
              <div className="mx-auto max-w-6xl">
                <Reveal>
                  <div className="text-center">
                    <p className="font-label text-[10px] tracking-[0.35em] text-rosegold sm:text-xs">
                      MOMENTS WE TREASURE
                    </p>
                    <h3 className="mt-3 font-display text-3xl italic sm:text-4xl">A Glimpse of Our Story</h3>
                    <Divider className="mt-6" />
                  </div>
                </Reveal>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {galleryImages.map((src, i) => (
                    <Reveal key={src} delay={(i % 3) * 0.1}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.3 }}
                        className="parchment-card overflow-hidden rounded-md p-2"
                      >
                        <div className="overflow-hidden rounded-sm">
                          <img
                            src={src}
                            alt="Wedding moment"
                            loading="lazy"
                            className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                            style={{ filter: "sepia(0.08) saturate(0.95)" }}
                          />
                        </div>
                      </motion.div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            {/* SECTION 7 — BLESSING */}
            <section className="px-5 py-24">
              <div className="mx-auto max-w-2xl text-center">
                <Reveal>
                  <Divider />
                  <p className="mt-8 font-display text-xl italic leading-relaxed text-ink sm:text-2xl">
                    {wedding.closingBlessing}
                  </p>
                </Reveal>
                <Reveal delay={0.25}>
                  <h2 className="mt-12 font-script text-7xl leading-none text-rosegold sm:text-9xl">
                    {wedding.closingWord}
                  </h2>
                  <p className="mt-2 font-display italic text-ink-muted">{wedding.closingScript}</p>
                </Reveal>
              </div>
            </section>

            {/* SECTION 8 — FOOTER */}
            <footer className="px-5 pb-12 pt-6">
              <div className="mx-auto max-w-3xl text-center">
                <Divider className="mb-6" />
                <p className="font-label text-[10px] tracking-[0.3em] text-rosegold sm:text-xs">
                  {wedding.footerTagline.toUpperCase()}
                </p>
              </div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
