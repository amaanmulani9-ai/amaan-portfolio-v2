export const profile = {
  brand: "Amaan.dev",
  firstName: "Amaan",
  lastName: "Mulani",
  fullName: "Amaan Asif Mulani",
  title: "Entry-level Web Developer and Full-Stack Developer",
  availability: "Open to internships and entry-level roles",
  badge: "M.Sc. IT - Pursuing",
  summary:
    "Entry-level Web Developer and Full-Stack Developer with hands-on experience in Python, Django, React, and AWS cloud services. Skilled in building responsive web applications, developing RESTful APIs, and deploying scalable solutions on AWS. Experienced in database management, backend logic, and cloud infrastructure. Currently pursuing an M.Sc. in Information Technology.",
  shortSummary:
    "Building responsive web apps, REST APIs, and AWS-backed solutions with Python, Django, React, and strong database fundamentals.",
  email: "Amaanmulani9@gmail.com",
  phone: "+91 93248 32187",
  location: "Malad (E), Mumbai 97, India",
  languages: "English, Hindi, Marathi",
  githubUser: "amaan0920",
  portrait: `${import.meta.env.BASE_URL}images/6d716bb9-8ebd-4609-a01f-048fb89038ee.png`,
  resumeHref: "mailto:Amaanmulani9@gmail.com?subject=Resume%20Request",
  resumeLabel: "Request Resume",
  footerTagline:
    "Portfolio focused on full-stack development, cloud services, and practical project work.",
};

export const heroRoles = [
  "ENTRY-LEVEL WEB DEVELOPER",
  "FULL-STACK DEVELOPER",
  "PYTHON + DJANGO BUILDER",
  "AWS-CURIOUS ENGINEER",
];

export const heroPoints = [
  "Hands-on experience in Python, Django, React, and AWS cloud services.",
  "Builds responsive web applications, RESTful APIs, and database-backed systems.",
  "Project work spans AI diagnosis, finance tracking, e-commerce, and robotics.",
];

export const professionalFacts = [
  {
    label: "Role",
    value: "Entry-level Web Developer / Full-Stack Developer",
  },
  {
    label: "Location",
    value: profile.location,
  },
  {
    label: "Languages",
    value: profile.languages,
  },
];

export const aboutPanels = [
  {
    title: "Development profile",
    description:
      "Comfortable working across backend logic, responsive interfaces, API integration, and deployment-oriented thinking. The profile highlights practical work in Python, Django, Flask, PHP, React, MySQL, and AWS-backed development.",
  },
  {
    title: "Hands-on project range",
    description:
      "Project experience includes AI-based diagnosis systems, finance tracking, shopping and jewellery management systems, and Arduino-based robotics with fire detection and SMS alerts.",
  },
];

export const aboutStats = [
  { n: 5, suffix: "+", label: "Projects Built" },
  { n: 8, suffix: "", label: "Bootcamps" },
  { n: 3, suffix: "", label: "Languages" },
  { n: 4, suffix: "+", label: "Core Domains" },
];

export const projects = [
  {
    id: "01",
    name: "MEDISCANAI",
    full: "MediScanAI - Intelligent Diagnosis System",
    description:
      "Developed an AI-based diagnostic system that processed 200+ medical images, supported 20+ test uploads per session, and improved diagnostic reliability with neural-network-based classification and anomaly detection.",
    href: "",
    tags: ["AI/ML", "Medical imaging", "Flask app"],
    type: "Python | TensorFlow | OpenCV | Flask",
  },
  {
    id: "02",
    name: "FINANCE TRACKER",
    full: "Finance Tracking App",
    description:
      "Built a full-stack Django application to manage 500+ financial transactions, including loans, repayments, balances, dashboards, filters, and responsive views for desktop and mobile.",
    href: "",
    tags: ["Django", "Dashboards", "Transaction tracking"],
    type: "Python | Django | HTML | CSS",
  },
  {
    id: "03",
    name: "JEWELLERY CMS",
    full: "Jewellery Shop Management System",
    description:
      "Created a real-world management system for inventory, billing, customer records, role-based admin access, and 300+ product records with optimized MySQL queries.",
    href: "",
    tags: ["Inventory", "Admin auth", "CRUD"],
    type: "PHP | MySQL | HTML | CSS | JavaScript",
  },
  {
    id: "04",
    name: "SHOPPING SITE",
    full: "Shopping Website Development",
    description:
      "Developed a shopping website with product CRUD, secure user registration and login, account management, and responsive storefront interfaces across devices.",
    href: "",
    tags: ["E-commerce", "Authentication", "Responsive UI"],
    type: "PHP | MySQL | Bootstrap",
  },
  {
    id: "05",
    name: "FIRE ALERT BOT",
    full: "Arduino Fire Detecting and SMS Alert Robot Car",
    description:
      "Designed a robot car that detects fire with flame and temperature sensors, navigates toward the source, triggers suppression logic, and sends real-time SMS alerts through a GSM module.",
    href: "",
    tags: ["Robotics", "IoT", "Automation"],
    type: "Arduino | Embedded C/C++ | GSM",
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
      "Currently pursuing postgraduate study while continuing to build web, cloud, and application projects with a practical full-stack focus.",
  },
  {
    id: "02",
    role: "Bachelor of Science in Information Technology",
    company:
      "Nirmala Memorial Foundation College of Commerce and Science, Mumbai University",
    period: "Aug 2021 - Jun 2024",
    status: "COMPLETED",
    desc:
      "Completed undergraduate study with a CGPA of 7.06 / 10 and a strong foundation in programming, databases, application development, and problem solving.",
  },
  {
    id: "03",
    role: "Higher Secondary Certificate",
    company:
      "Nirmala Memorial Foundation College of Commerce and Science, Maharashtra Board",
    period: "Aug 2019 - Apr 2021",
    status: "COMPLETED",
    desc:
      "Completed higher secondary education with 75.5 percent, building the academic base for later specialization in information technology.",
  },
];

export const achievements = [
  {
    icon: "01",
    title: "Full-stack profile",
    sub: "Python, Django, Flask, React, PHP, and AWS",
  },
  {
    icon: "02",
    title: "Project range",
    sub: "AI diagnosis, finance tools, shop systems, and robotics",
  },
  {
    icon: "03",
    title: "Cloud mindset",
    sub: "REST APIs, databases, deployment, and scalable thinking",
  },
  {
    icon: "04",
    title: "Hardware builds",
    sub: "Arduino, GSM modules, sensors, and automation logic",
  },
  {
    icon: "05",
    title: "Practical delivery",
    sub: "Responsive interfaces backed by working business logic",
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
  "PHP",
  "Java",
  "ReactJS",
  "Django",
  "Flask",
  "REST APIs",
  "HTML5",
  "CSS3",
  "JavaScript (ES6)",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "MS SQL",
  "AWS",
  "Git",
  "GitHub",
  "Linux",
  "Arduino",
  "Raspberry Pi",
];

export const socials = [
  { name: "GitHub", href: "https://github.com/amaan0920" },
  {
    name: "Instagram",
    href: "https://www.instagram.com/amaan.mulani_?igsh=b3E2bWdyNjZldndn",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/amaan-m-b51773312",
  },
];

export const marqueeTech = [
  "Python",
  "Django",
  "ReactJS",
  "Flask",
  "REST APIs",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "AWS",
  "GitHub",
  "Linux",
  "Arduino",
  "Raspberry Pi",
  "JavaScript",
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
  "Entry-level Web Developer / Full-Stack Developer profile",
  "Projects across Django, Flask, PHP, React, AWS, and Arduino",
  "Includes education, skills, certificates, and contact details",
];
