import { motion } from "framer-motion";
import { useState } from "react";
import { quizCompleteMessage, quizQuestions } from "../data/quizData";
import { quizPhotos } from "../data/photos";
import { PhotoImage } from "../components/ui/PhotoImage";

export function MemoryQuiz() {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [answer, setAnswer] = useState<number | null>(null);
  const question = quizQuestions[index];

  if (done) {
    return (
      <section className="px-6 py-16 text-center">
        <p className="font-display text-2xl text-champagne">
          {quizCompleteMessage}
        </p>
      </section>
    );
  }

  if (!question) return null;
  const photo = quizPhotos[question.photoIndex] ?? quizPhotos[0];

  return (
    <section className="mx-auto max-w-lg px-6 py-16">
      <h2 className="text-center font-display text-3xl text-ivory">
        How well do you remember our moments?
      </h2>
      <p className="mt-6 text-center font-body text-sm text-ivory/70">
        Question {index + 1} of {quizQuestions.length} · {question.prompt}
      </p>

      <div className="mt-6 w-full overflow-hidden rounded-2xl">
        <div className="relative aspect-video w-full">
          <PhotoImage
            {...photo}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>

      <ul className="mt-6 flex flex-col gap-3">
        {question.options.map((opt, optionIndex) => {
          const isSelected = answer === optionIndex;
          const isCorrect = optionIndex === question.correctIndex;
          const answered = answer !== null;
          return (
            <motion.li
              key={opt}
              whileTap={answered ? undefined : { scale: 0.98 }}
            >
              <button
                type="button"
                disabled={answered}
                className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left font-body text-sm transition ${
                  answered && isCorrect
                    ? "border-emerald-200/50 bg-emerald-900/30 text-emerald-50"
                    : isSelected
                      ? "border-rose-accent/60 bg-burgundy/70 text-ivory"
                      : "border-glass-border bg-midnight-soft text-ivory hover:border-champagne/40"
                }`}
                onClick={() => setAnswer(optionIndex)}
              >
                {opt}
              </button>
            </motion.li>
          );
        })}
      </ul>
      {answer !== null ? (
        <div className="mt-5 flex flex-col items-center gap-4 text-center">
          <p className="font-body text-sm text-ivory/80" aria-live="polite">
            {answer === question.correctIndex
              ? "That’s right — you remember."
              : "Not quite, but the memory is still a good one."}
          </p>
          <button
            type="button"
            className="min-h-11 rounded-full border border-champagne/50 px-6 font-body text-sm text-champagne transition hover:bg-champagne/10"
            onClick={() => {
              if (index >= quizQuestions.length - 1) setDone(true);
              else {
                setIndex((current) => current + 1);
                setAnswer(null);
              }
            }}
          >
            {index >= quizQuestions.length - 1 ? "Finish quiz" : "Next memory"}
          </button>
        </div>
      ) : (
        <p className="mt-4 text-center font-body text-xs text-ivory/45">
          No pressure — this is just for fun.
        </p>
      )}
    </section>
  );
}
