# Jyoshna — Birthday Surprise

A private, cinematic birthday experience built with React, Vite, Tailwind CSS, GSAP, Framer Motion, and React Three Fiber.

## Quick start

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

## Personalize everything

Edit **`src/config/siteConfig.ts`** for names, dates, PIN, letter, messages, and audio paths.

Edit **`src/data/photos.ts`** only if you rename image files or need different `objectPosition` values (to keep faces visible).

The site uses a deep rose-pink background palette. Adjust the theme colors in **`src/index.css`** under `@theme`.

Other copy/data:

- `src/data/memories.ts` — timeline
- `src/data/appreciation.ts` — appreciation cards
- `src/data/quizData.ts` — memory quiz

The PIN lives in `siteConfig.pinCode` and is never shown in the UI.

## Your photos

Replace JPGs in **`public/images/`** using the same filenames (sharp photos — do not blur in editing).

If placeholders are missing, run:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\generate-placeholders.ps1
```

## Audio (optional)

- `public/audio/music.mp3` — music player
- `public/audio/voice.mp3` — voice section (hidden automatically if missing)

Audio never autoplays; playback starts only after user interaction.

## Deploy on Vercel

1. Push this folder to a Git repository.
2. Import the project in Vercel.
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

No environment variables required.

## Privacy

`robots` meta is set to `noindex,nofollow`. Photos and audio stay in your repo / hosting — nothing is sent to third-party image hosts by default.

---

Made with ❤️ by debashish
