import { motion } from "framer-motion";
import { useState } from "react";
import { siteConfig } from "../config/siteConfig";
import { photos } from "../data/photos";
import { PhotoImage } from "../components/ui/PhotoImage";

export function LetterSection() {
  const [open, setOpen] = useState(false);
  const { letter } = siteConfig;

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-24">
      <h2 className="text-center font-display text-3xl text-ivory">
        I wrote something for you.
      </h2>

      {!open ? (
        <motion.button
          type="button"
          className="mx-auto mt-12 block"
          onClick={() => setOpen(true)}
          whileTap={{ scale: 0.98 }}
          aria-label="Open envelope"
        >
          <div className="relative h-32 w-48">
            <div className="absolute inset-0 rounded-md bg-[#c9a88a] shadow-[0_16px_40px_rgb(0_0_0/0.35)]" />

            <div className="absolute inset-x-0 top-0 h-16 origin-top bg-[#b89272] [clip-path:polygon(0_0,50%_70%,100%_0)]" />

            <div className="absolute inset-x-4 bottom-4 top-8 rounded-sm border border-[#8a6f55]/30 bg-[#f0e4d8]" />
          </div>

          <span className="mt-4 block font-body text-sm text-champagne/80">
            Tap the envelope
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-5xl items-stretch gap-8 lg:grid-cols-2"
        >
          {/* Love letter */}
          <article
            className="
      h-[65svh] min-h-0 overflow-y-auto overscroll-contain
      rounded-2xl border border-glass-border bg-glass
      p-6 sm:p-8
      [scrollbar-width:thin]
      [scrollbar-color:rgba(232,213,196,0.45)_transparent]
      lg:h-[75vh]
    "
          >
            <p className="break-words font-display text-2xl leading-relaxed text-champagne">
              {letter.greeting}
            </p>

            {letter.paragraphs.map((p, index) => (
              <p
                key={index}
                className="mt-4 whitespace-pre-line break-words font-body text-sm leading-7 text-ivory/85"
              >
                {p}
              </p>
            ))}

            <p className="mt-8 break-words font-body text-sm leading-relaxed text-ivory/70">
              {letter.closing}
            </p>

            <p className="mt-2 break-words font-display text-xl leading-relaxed text-ivory">
              {letter.signature}
            </p>
          </article>

          {/* Image box — same height as letter */}
          <div className="h-[65svh] w-full overflow-hidden rounded-2xl shadow-[0_24px_80px_rgb(0_0_0/0.35)] lg:h-[75vh]">
            <PhotoImage
              {...photos.letter}
              priority
              className="h-full w-full object-contain"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}
