const baseAsset = import.meta.env.BASE_URL;

export const profile = {
  brand: "Amaan.dev",
  firstName: "Amaan",
  lastName: "Mulani",
  fullName: "Amaan Asif Mulani",
  title: "Full-Stack Developer",
  availability: "Open to internships, entry-level roles, and freelance builds",
  badge: "React, Next.js, Python, FastAPI",
  summary:
    "Full-stack developer focused on React, Next.js, Python automation, and API-backed products. I build responsive interfaces, developer tools, and production-style web apps with a strong bias for shipping practical work.",
  shortSummary:
    "Building responsive interfaces, Python-backed systems, and polished product experiences with React, Next.js, FastAPI, and modern frontend tooling.",
  email: "Amaanmulani9@gmail.com",
  phone: "+91 93248 32187",
  location: "Malad (E), Mumbai 97, India",
  languages: "English, Hindi, Marathi",
  githubUser: "amaanmulani9-ai",
  portrait: `${baseAsset}images/6d716bb9-8ebd-4609-a01f-048fb89038ee.png`,
  resumeHref: `${baseAsset}Amaan-Mulani-Resume.pdf`,
  resumeLabel: "Download Resume",
  resumeFileName: "Amaan-Mulani-Resume.pdf",
  resumeRequestHref:
    "mailto:Amaanmulani9@gmail.com?subject=Hiring%20Discussion%20from%20Portfolio",
  footerTagline:
    "Portfolio focused on production-style frontend work, Python systems, and practical shipping.",
};

export const heroRoles = [
  "FULL-STACK PRODUCT BUILDER",
  "REACT + NEXT.JS DEVELOPER",
  "PYTHON AUTOMATION ENGINEER",
  "API-BACKED APP BUILDER",
];

export const heroPoints = [
  "Curated work across React, Next.js, FastAPI, Vite, and Python automation instead of template-style mock projects.",
  "Comfortable owning product UI, backend integration, developer experience, and the details needed to ship responsive web apps.",
  "Recent builds include multilingual ML tooling, hackathon systems, desktop automation, and high-polish frontend experiences.",
];

export const proofMetrics = [
  { value: "05", label: "Featured builds" },
  { value: "15+", label: "Public repos" },
  { value: "08", label: "Bootcamps" },
  { value: "03", label: "Spoken languages" },
];

export const professionalFacts = [
  {
    label: "Role",
    value: "Full-stack developer with a frontend-first product mindset",
  },
  {
    label: "Location",
    value: profile.location,
  },
  {
    label: "Focus",
    value: "React, Next.js, Python automation, APIs, and polished shipping work",
  },
];

export const aboutPanels = [
  {
    title: "Frontend that feels finished",
    description:
      "I like interfaces that feel deliberate: clear hierarchy, smooth motion, responsive behavior, and content that explains the product fast.",
  },
  {
    title: "Backend and automation support",
    description:
      "Alongside UI work, I build Python-backed services, desktop workflows, and integration layers that make the frontend useful in real-world use cases.",
  },
];

export const aboutStats = [
  { n: 5, suffix: "", label: "Featured Projects" },
  { n: 15, suffix: "+", label: "Public Repos" },
  { n: 8, suffix: "", label: "Bootcamps" },
  { n: 3, suffix: "", label: "Languages" },
];

export const featuredProjects = [
  {
    id: "01",
    slug: "truthlens",
    title: "TruthLens",
    tagline: "Multilingual fake-news detection tool with readable model output.",
    problem:
      "Build a fake-news detection experience that feels usable to non-technical users instead of exposing a raw classifier response.",
    role:
      "Designed the web product layer around the model workflow, including frontend structure, prediction UX, and API-backed interaction.",
    outcomes: [
      "Wrapped the trained classifier in a Flask API with health checks and prediction endpoints.",
      "Added language detection, translation support, and localized UI paths for broader input handling.",
      "Exposed confidence, warnings, and input-quality states so the prediction result feels interpretable.",
    ],
    stack: [
      "Python",
      "Flask",
      "React",
      "Vite",
      "scikit-learn",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/amaanmulani9-ai/truthlens-fake-news-detector",
    imageSrc: `${baseAsset}images/projects/truthlens.png`,
    imageAlt: "TruthLens repository preview",
  },
  {
    id: "02",
    slug: "friday",
    title: "FRIDAY",
    tagline: "Hackathon build for real-time person intelligence and agent-assisted research.",
    problem:
      "Create a system that can move from camera input to researched dossier output with live progress, while degrading gracefully when services are missing.",
    role:
      "Contributed to the full-stack product direction across frontend experience, research flow, and system-level orchestration for the hackathon build.",
    outcomes: [
      "Connected FastAPI, Next.js 16, Convex, and browser-agent workflows into a single product pipeline.",
      "Structured the app so optional services fail gracefully instead of breaking the whole experience.",
      "Streamed research updates into a live corkboard-style dossier UI to make the system feel active and explainable.",
    ],
    stack: [
      "FastAPI",
      "Next.js",
      "Tailwind CSS",
      "Convex",
      "Browser Use",
      "Framer Motion",
    ],
    githubUrl: "https://github.com/amaanmulani9-ai/FRIDAY",
    imageSrc: `${baseAsset}images/projects/friday.png`,
    imageAlt: "FRIDAY repository preview",
  },
  {
    id: "03",
    slug: "jarvis",
    title: "JARVIS",
    tagline: "Windows desktop automation assistant with voice flow and sci-fi PyQt UI.",
    problem:
      "Turn desktop automation into a guided assistant experience instead of a collection of disconnected scripts and commands.",
    role:
      "Built the product surface around voice input, command execution, and visual feedback while clarifying the active runtime path for the project.",
    outcomes: [
      "Combined PyQt, speech input, desktop automation, and text-to-speech into a single assistant workflow.",
      "Added wake-trigger fallbacks and command-normalization support so the assistant remains usable in more environments.",
      "Documented the startup path, module responsibilities, and known limitations to make the project easier to understand and extend.",
    ],
    stack: [
      "Python",
      "PyQt",
      "SpeechRecognition",
      "Ollama",
      "Desktop Automation",
    ],
    githubUrl: "https://github.com/amaanmulani9-ai/JARVIS-main",
    demoUrl: "https://go.screenpal.com/watch/cOni25n3P82",
    imageSrc: `${baseAsset}images/projects/jarvis.png`,
    imageAlt: "JARVIS repository preview",
  },
  {
    id: "04",
    slug: "ipl-rcb",
    title: "IPL-RCB",
    tagline: "Fan-experience frontend built around fixtures, visuals, and bold team identity.",
    problem:
      "Create a single-page sports experience that feels energetic and branded while staying structured and responsive.",
    role:
      "Owned the frontend presentation, motion, and section composition for a themed RCB web experience.",
    outcomes: [
      "Built a trophy-led hero and section system around fixtures, squad visuals, updates, and merchandise.",
      "Used reveal effects, strong typography, and locally served imagery to create a memorable single-page flow.",
      "Shipped a responsive experience with structured content and clear source-link sections.",
    ],
    stack: ["React", "Vite", "CSS", "Responsive UI"],
    githubUrl: "https://github.com/amaanmulani9-ai/IPL-RCB-clone",
    demoUrl: "https://ipl-rcb-shadowfox.vercel.app",
    imageSrc: `${baseAsset}images/projects/ipl-rcb.png`,
    imageAlt: "IPL-RCB repository preview",
  },
  {
    id: "05",
    slug: "momos",
    title: "Momos",
    tagline: "Next.js food-ordering concept with editorial styling and product-led interaction.",
    problem:
      "Move beyond a plain food menu layout by designing an ordering experience with stronger hierarchy, art direction, and interactive browsing.",
    role:
      "Shaped the homepage experience, product presentation, and visual storytelling for a modern food-ordering concept.",
    outcomes: [
      "Built a Next.js storefront flow around featured products, browsing, and ordering-oriented UI patterns.",
      "Used bold imagery, motion, and editorial copy treatment to give the product a stronger visual identity.",
      "Structured the page around reusable product and restaurant data instead of hardcoded one-off sections.",
    ],
    stack: ["Next.js", "TypeScript", "React", "Motion", "Product UI"],
    githubUrl: "https://github.com/amaanmulani9-ai/momos",
    imageSrc: `${baseAsset}images/projects/momos.png`,
    imageAlt: "Momos repository preview",
  },
];

export const experience = [
  {
    id: "01",
    role: "Master of Science in Information Technology",
    company:
      "Chikitsak Samuha's Sir Sitaram and Lady Shantabai Patkar-Varde College, Mumbai University",
    period: "Pursuing",
    status: "CURRENT",
    desc:
      "Pursuing postgraduate study while continuing to build frontend products, API-backed tools, and production-style portfolio work.",
  },
  {
    id: "02",
    role: "Bachelor of Science in Information Technology",
    company:
      "Nirmala Memorial Foundation College of Commerce and Science, Mumbai University",
    period: "Aug 2021 - Jun 2024",
    status: "COMPLETED",
    desc:
      "Completed undergraduate study with a CGPA of 7.06 / 10 and a solid base in programming, databases, and application development.",
  },
  {
    id: "03",
    role: "Higher Secondary Certificate",
    company:
      "Nirmala Memorial Foundation College of Commerce and Science, Maharashtra Board",
    period: "Aug 2019 - Apr 2021",
    status: "COMPLETED",
    desc:
      "Completed higher secondary education with 75.5 percent, building the foundation for later specialization in information technology.",
  },
];

export const achievements = [
  {
    icon: "01",
    title: "Frontend execution",
    sub: "Responsive React, Next.js, Vite, Tailwind CSS, and polished interaction work",
  },
  {
    icon: "02",
    title: "Python systems",
    sub: "Automation flows, APIs, utility scripting, and practical desktop tooling",
  },
  {
    icon: "03",
    title: "Product shaping",
    sub: "Turning rough ideas into clearer UX, stronger positioning, and shipping-focused interfaces",
  },
  {
    icon: "04",
    title: "API-backed apps",
    sub: "FastAPI, auth flows, structured backend logic, and integration-heavy projects",
  },
  {
    icon: "05",
    title: "Public proof",
    sub: "Live GitHub repositories, demo links, and work that can be explored directly",
  },
];

export const certifications = [
  { name: "React JS Node Mastery Boot Camp", issuer: "Bootcamp" },
  { name: "C Programming Essential Bootcamp", issuer: "Bootcamp" },
  { name: "SQL Essential Bootcamp", issuer: "Bootcamp" },
  { name: "Java Programming Essential Bootcamp", issuer: "Bootcamp" },
  { name: "Python Programming Essential Bootcamp", issuer: "Bootcamp" },
  { name: "JavaScript Programming Essential Bootcamp", issuer: "Bootcamp" },
  { name: "Node.js Bootcamp", issuer: "Bootcamp" },
  { name: "YouTube Clone API Bootcamp", issuer: "Bootcamp" },
];

export const skills = [
  "Python",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Vite",
  "FastAPI",
  "PyQt",
  "Tailwind CSS",
  "REST APIs",
  "Framer Motion",
  "Responsive UI",
  "Frontend Architecture",
  "MongoDB",
  "Authentication Flows",
  "API Integration",
  "Vercel",
  "Git",
  "GitHub",
  "Linux",
  "Desktop Automation",
];

export const socials = [
  {
    name: "GitHub",
    href: "https://github.com/amaanmulani9-ai",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amaan-m-b51773312",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/amaan.mulani_?igsh=b3E2bWdyNjZldndn",
  },
];

export const marqueeTech = [
  "React",
  "Next.js",
  "Python",
  "FastAPI",
  "TypeScript",
  "Tailwind CSS",
  "REST APIs",
  "MongoDB",
  "GitHub",
  "Vercel",
  "Linux",
  "PyQt",
  "Automation",
  "Product UI",
];

export const contactMethods = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: "tel:+919324832187",
  },
  {
    label: "Location",
    value: profile.location,
    href: "https://www.google.com/maps/search/?api=1&query=Malad+East+Mumbai+97+India",
  },
];

export const resumeHighlights = [
  "Downloadable PDF resume with education, projects, skills, and contact details",
  "Work across React, Next.js, Python automation, FastAPI, and product-style interfaces",
  "Open to internships, entry-level roles, freelance builds, and project collaborations",
];
