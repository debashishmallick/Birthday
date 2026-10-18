type ChapterHeaderProps = {
  chapter: string
  title: string
  subtitle?: string
}

export function ChapterHeader({ chapter, title, subtitle }: ChapterHeaderProps) {
  return (
    <header className="mx-auto max-w-3xl px-6 text-center">
      <p className="font-body text-xs font-medium uppercase tracking-[0.35em] text-champagne/80">
        Chapter {chapter}
      </p>
      <h2 className="font-display mt-4 text-4xl font-medium leading-tight text-ivory sm:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 font-body text-sm text-ivory/70">{subtitle}</p>
      ) : null}
    </header>
  )
}
