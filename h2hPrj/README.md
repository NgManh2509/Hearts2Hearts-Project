# Hearts2Hearts Project (H2H)

An interactive, visually stunning web application and fan tribute page built for the group **Hearts2Hearts (S2U 2025)**. This project features a highly polished user interface with smooth page transitions, custom animations, and a fully integrated music player.

## 🌟 Features

- **Interactive UI & Animations:** Built with `framer-motion` for fluid page transitions, scroll animations, and interactive elements.
- **Integrated Music Player:** A persistent music player (`MusicApp` & `MiniPlayer`) that continues playing audio seamlessly while navigating across different pages.
- **Responsive Layout:** Dynamically switches between `DesktopLayout` and `MobileLayout` to provide an optimized experience for all devices.
- **Performance Optimized:** Includes custom components like `LazyVideo` for viewport-based media loading and an `ImagePreloader` utility to cache assets.
- **Rich Sections:**
  - **Home:** Visually striking landing page with background wave animations (`three.js`).
  - **Members:** Profiles for the 8 members: Jiwoo, Carmen, Yuha, Stella, Juun, A-na, Ian, and Ye-on.
  - **Albums & Stages:** Showcases music releases and performances.
  - **Gallery:** Dynamically populated gallery using the `galleryCnt.js` support script.
  - **Credits:** A dedicated credits section acknowledging contributions.

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** TailwindCSS v4
- **Animations:** Framer Motion, tw-animate-css
- **UI Components:** Radix UI, Shadcn, Lucide React, React Icons
- **Visuals:** Three.js, Liquid-Glass-React

## 📁 Project Structure

```text
src/
├── assets/       # Static assets (images, logos, SVGs)
├── components/   # Page components (HomePage, AlbumPage, etc.) and UI elements
├── data/         # Application data (e.g., musicData.js)
├── Layout/       # Layout wrappers (DesktopLayout.jsx, MobileLayout.jsx)
├── lib/          # Utilities and configuration (e.g., utils for Shadcn)
└── support/      # Helper scripts (ImagePreloader, galleryCnt.js)
```

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory (`h2hPrj`).
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running Locally

To start the development server, run:

```bash
npm run dev
```
*Note: This command automatically executes `galleryCnt.js` to build the gallery data before starting the Vite server.*

### Building for Production

To create a production build, run:

```bash
npm run build
```

## 📜 Scripts

- `npm run dev`: Starts the local dev server.
- `npm run build`: Builds the app for production.
- `npm run lint`: Runs ESLint to check for code issues.
- `npm run preview`: Previews the production build locally.
