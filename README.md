# 🪟 Windows 95 Portfolio
"A Windows 95‑style desktop for interactive case studies."

![License: MIT](https://img.shields.io/badge/license-MIT-00b894?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?style=flat-square&logo=vite&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-E2E-2e7d32?style=flat-square&logo=playwright&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-Unit-6e9f18?style=flat-square&logo=vitest&logoColor=white)

An interactive portfolio with draggable windows, retro UI, and embedded demos for the Amendments and Insurance case studies.

Status: ✅ Active demo | 🎯 Portfolio-ready  
Version: 0.0.1 (Portfolio Build)

## 🎯 What is this?
This project recreates a Windows 95 desktop experience to showcase:

- Case studies with research, findings, and interactive flows
- A CV window with structured experience and skills
- Draggable, layered windows with classic icons and controls
- Automated UI baselines and accessibility checks

## ✨ Quick Start (2 Minutes)
```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

## 📸 What You'll See
- 🗂 Desktop UI with icons, windows, and classic controls
- ✈️ Flight Centre Amendments case study + demos (old/new/dream flows)
- 🧾 Flight Centre Insurance case study
- 📄 CV window (profile, experience, education, tools)

## 📚 Documentation
For Developers
- `DEV_WORKFLOW.md` — development workflow and conventions
- `UI_TESTING_BASELINE_GUIDELINES.md` — UI testing baselines
- `ERROR_ANALYSIS.md` — known errors and analysis

Design System
- `DESIGN_GUIDE.md` — UI patterns and visual system

Deployment
- `DEPLOYMENT_GUIDE.md` — deployment notes

## 🏗️ Architecture
```
fresh-project/
├── App.jsx                 # Main desktop + windows
├── src/
│   ├── components/         # Case studies + UI
│   ├── hooks/              # UI and data hooks
│   ├── services/           # API wrappers
│   ├── theme/              # Theme tokens
│   └── styles/             # Styling helpers
├── public/                 # Icons, images
└── tests/                  # Playwright specs
```

## 🧪 Development
Available Scripts
```bash
# Development
npm run dev

# Build & preview
npm run build
npm run preview

# Testing
npm run test
npm run test:run
npm run test:e2e
npm run test:e2e:ui
```

## 🎨 Visual Style
Windows 95 palette (from `DESIGN_GUIDE.md`):

| Token | Color | Usage |
| --- | --- | --- |
| `--win95-grey` | `#d4d0c8` | Main background |
| `--win95-light-grey` | `#c0c0c0` | Light borders |
| `--win95-dark-grey` | `#808080` | Dark borders |
| `--win95-white` | `#ffffff` | Highlights |
| `--win95-blue` | `#000080` | Title bar |

## 🛠️ Tech Stack
Frontend: React 18 + Vite  
UI: Primer React + MUI + Emotion  
Testing: Playwright + Vitest  
Optional: Supabase client

## 🚀 Deployment
Vercel: Build `npm run build`, output `dist`

## 📄 License
MIT
