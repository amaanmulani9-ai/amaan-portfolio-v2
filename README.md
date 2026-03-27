# Amaan Portfolio V2

A modern, animated personal portfolio website built with **React** and **Vite**, showcasing full-stack development skills, projects, and experience.

🌐 **Live site:** [portfoliobyamaan.vercel.app](https://portfoliobyamaan.vercel.app/)

---

## ✨ Features

- Smooth scroll powered by **Lenis**
- Page animations with **GSAP** and **Framer Motion**
- Custom animated cursor, ribbon cursor, and splash cursor
- Text scramble, split-line, and marquee animations
- Fully responsive layout for desktop and mobile
- Sections: Hero, About, Projects, Services, Experience, Contact
- Preloader on first visit
- Contact form via **Formspree**
- Deployed on **Vercel**

---

## 🛠️ Tech Stack

| Category      | Technology                                      |
|---------------|-------------------------------------------------|
| Framework     | React 18, Vite 5                                |
| Styling       | Tailwind CSS 3, PostCSS                         |
| Animation     | GSAP, Framer Motion, Lenis                      |
| Icons         | Iconify                                         |
| 3D / WebGL    | OGL                                             |
| Forms         | Formspree React                                 |
| Scroll        | React Scroll                                    |
| Utilities     | clsx, tailwind-merge                            |
| Deployment    | Vercel                                          |

---

## 📁 Project Structure

```
amaan-portfolio-v2/
├── public/              # Static assets (images, og-image, etc.)
├── src/
│   ├── components/      # Reusable UI components (cursor, marquee, preloader…)
│   ├── constants/       # Site-wide data (profile, projects, skills, socials…)
│   ├── lib/             # Utility helpers
│   ├── sections/        # Page sections (Hero, About, Projects, Experience…)
│   ├── utils/           # Shared utility functions
│   ├── app.jsx          # Root application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML entry point with SEO meta tags
├── tailwind.config.js   # Tailwind theme (colors, fonts)
├── vite.config.js       # Vite build configuration
├── postcss.config.js    # PostCSS configuration
└── vercel.json          # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** v9 or later

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/amaanmulani9-ai/amaan-portfolio-v2.git
cd amaan-portfolio-v2

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The compiled output is placed in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📦 Deployment

The project is deployed on **Vercel**. Push to the main branch to trigger an automatic deployment. The `vercel.json` file handles route rewrites for single-page app navigation.

---

## 📬 Contact

**Amaan Asif Mulani**

- 📧 [Amaanmulani9@gmail.com](mailto:Amaanmulani9@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/amaan-m-b51773312)
- 🐙 [GitHub](https://github.com/amaan0920)
- 📸 [Instagram](https://www.instagram.com/amaan.mulani_)

---

## 📄 License

This project is open for viewing and learning purposes. Please do not reuse the design or personal content without permission.
