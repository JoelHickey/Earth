# Windows 95 Portfolio

An interactive portfolio with an authentic Windows 95 desktop aesthetic. Explore case studies, view the CV, and launch demos in draggable, windowed interfaces.

## Features

- **Desktop UI** with classic Windows 95 styling, icons, and window management
- **Case Studies** for Flight Centre Amendments and Insurance flows
- **Curriculum Vitae** window with structured experience and skills
- **Interactive Demos** (old flow + new flow) for amendments
- **Accessibility-first** UI patterns and automated checks

## What’s Inside

- **CV window** — profile, experience, education, tools
- **Flight Centre Amendments** — case study with discovery, findings, and demos
- **Flight Centre Insurance** — case study and demo flow
- **Interactive windows** — draggable, layered, and closable components

## Tech Stack

- **React 19** + **Vite**
- **Material UI** (MUI) + Emotion
- **Playwright** for E2E
- **Vitest** for unit tests
- **Supabase client** (optional)

## Getting Started

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## Build & Preview

```bash
npm run build
npm run preview
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests (Playwright)
npm run test:e2e
```

## Deployment

- **Vercel**: Build `npm run build`, output `dist`

## Project Structure

```
fresh-project/
├── App.jsx                 # Main desktop + windows
├── src/
│   ├── components/         # Case studies + UI
│   ├── hooks/              # UI and data hooks
│   ├── services/           # API wrappers
│   ├── theme/              # MUI theme
│   └── styles/             # Tokens
├── public/                 # Icons, images
└── tests/                  # Playwright specs
```

## License

MIT
