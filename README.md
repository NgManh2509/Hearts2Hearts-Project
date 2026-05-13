<div align="center">
  <img src="./h2hPrj/public/favicon.ico" alt="Logo" width="80" height="80">

  <h1 align="center">Hearts2Hearts (S2U 2025) Project</h1>

  <p align="center">
    An interactive, visually stunning fan tribute web application built for the group Hearts2Hearts.
    <br />
    <a href="#-getting-started"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="#">Report Bug</a>
    ·
    <a href="#">Request Feature</a>
  </p>
</div>

<!-- Badges -->
<div align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/Vite-8-purple?style=for-the-badge&logo=vite" alt="Vite" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-black?style=for-the-badge&logo=framer" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Three.js-0.184-black?style=for-the-badge&logo=threedotjs" alt="Three.js" />
</div>

## 📖 About The Project

**Hearts2Hearts (S2U 2025)** is a highly polished, interactive web application designed to be a digital home and fan tribute for the Hearts2Hearts group. This project features an immersive user interface enriched with smooth page transitions, custom 3D animations, and a seamless persistent music player that operates across different pages without interrupting the user's experience.

### 🌟 Key Features

*   **Fluid Interactive UI:** Utilizes `framer-motion` to orchestrate smooth page transitions, engaging scroll animations, and dynamic interactive elements that react to user input.
*   **Persistent Music Player:** Features a custom-built music player (`MusicApp` & `MiniPlayer`) that seamlessly plays audio in the background while users navigate across different sections of the website.
*   **Adaptive Responsive Layout:** The application intelligently toggles between `DesktopLayout` and `MobileLayout` to guarantee an optimal, pixel-perfect experience across all devices.
*   **Performance First:** Integrates custom performance components such as `LazyVideo` for viewport-aware media loading, and an `ImagePreloader` utility to ensure assets are cached before rendering.
*   **Immersive Visuals:** Includes dynamic background wave animations powered by `three.js` to create a living, breathing application environment.
*   **Rich Content Sections:**
    *   **Home:** Visually striking landing page setting the tone of the app.
    *   **Members:** Dedicated profile pages for the 8 members: Jiwoo, Carmen, Yuha, Stella, Juun, A-na, Ian, and Ye-on.
    *   **Albums & Stages:** An interactive showcase of music releases and stage performances.
    *   **Gallery:** A dynamically populated photo gallery powered by an automated support script (`galleryCnt.js`).
    *   **Credits:** A dedicated section acknowledging project contributors and resources.

## 🛠️ Built With

This project is built utilizing a modern, high-performance web development stack:

*   **[React 19](https://react.dev/)**: The core library for building the user interface.
*   **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for ultra-fast builds.
*   **[Tailwind CSS v4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI styling.
*   **[Framer Motion](https://www.framer.com/motion/)**: Production-ready animation library for React.
*   **[Three.js](https://threejs.org/)**: 3D graphics library for background effects.
*   **[Radix UI](https://www.radix-ui.com/) & [Shadcn UI](https://ui.shadcn.com/)**: Unstyled, accessible components for building the design system.

## 📁 Repository Structure

```text
Hearts2Hearts-Project/
├── h2hPrj/
│   ├── src/
│   │   ├── assets/       # Static assets (images, logos, vectors)
│   │   ├── components/   # Reusable UI components & sections
│   │   ├── data/         # Mock data and configuration (e.g., musicData.js)
│   │   ├── Layout/       # Layout wrappers (Desktop & Mobile architectures)
│   │   ├── lib/          # Utility functions and library wrappers
│   │   └── support/      # Node scripts (ImagePreloader, galleryCnt.js)
│   ├── package.json      # Dependencies and npm scripts
│   ├── vite.config.js    # Vite bundler configuration
│   └── eslint.config.js  # Linter configuration
└── README.md             # This documentation file
```

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher recommended) and npm installed on your system.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/NgManh2509/Hearts2Hearts-Project.git
    ```
2.  Navigate to the application directory:
    ```bash
    cd Hearts2Hearts-Project/h2hPrj
    ```
3.  Install NPM packages:
    ```bash
    npm install
    ```

### Running the Application Local Server

To start the local development server, run:

```bash
npm run dev
```

> **Note:** This command automatically executes the `galleryCnt.js` script to generate necessary gallery data structures before spinning up the Vite server.

The application will be accessible at `http://localhost:5173` (or another port if 5173 is occupied).

### Building for Production

To create a highly optimized production build, run:

```bash
npm run build
```

This will generate a `dist` folder containing the minified and optimized assets ready for deployment.

## 📜 Available Scripts

Within the `h2hPrj` directory, you can run several built-in commands:

*   `npm run dev`: Starts the Vite development server with Hot Module Replacement (HMR).
*   `npm run build`: Bundles the application for production deployment.
*   `npm run preview`: Bootstraps a local web server to serve the production build (`dist` folder) for final testing.
*   `npm run lint`: Executes ESLint to statically analyze the codebase for potential errors and enforce code style.

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 💝 Acknowledgements

*   Group Hearts2Hearts for the inspiration.
*   All open-source libraries that made this project possible.

---
*Created with ❤️ by the Hearts2Hearts Dev Team.*
