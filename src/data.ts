// ─────────────────────────────────────────────────────────────
//  EDIT YOUR CONTENT HERE. Everything on the site comes from this file.
//  Fields marked TODO are placeholders for you to fill in.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Kevin Varghees",
  title: "Computer Science Engineering Student | AI & Data Science",
  university: "Marwadi University, Rajkot, Gujarat",
  location: "Karnataka, India",
  github: "https://github.com/kevin-varghees",
  linkedin: "https://linkedin.com/in/kevin-varghees-72a413373",
  twitter: "https://x.com/KevinVarghees",
  email: "kevinvarghees043@gmail.com",
  // Put your photo at public/kevin.jpg (or change the path below)
  photo: "/kevin.jpg",
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const techStrip = [
  "Python", "C", "C++", "React", "JavaScript", "Flask", "SQLite", "Git", "GitHub",
] as const;

export const services = [
  {
    title: "Software Development",
    text: "Writing clean programs in Python, C and C++ and learning to structure them well.",
    icon: "code",
  },
  {
    title: "AI & Machine Learning",
    text: "Exploring ML fundamentals, data analysis and AI API integration through projects.",
    icon: "brain",
  },
  {
    title: "Web Development",
    text: "Building responsive interfaces with React and connecting them to Flask back ends.",
    icon: "globe",
  },
] as const;

export type Level = "Fundamentals" | "Learning" | "Project Experience";

export type SkillItem = {
  name: string;
  level: Level;
  icon?: string; // brand icon key from TechIcon.tsx
  glyph?: "sparkles" | "message" | "bot" | "plug" | "rocket" | "brain" | "terminal" | "chart" | "api";
  note?: string;
};

export type SkillGroup = {
  id: string;
  title: string;
  blurb?: string;
  featured?: boolean;
  items: SkillItem[];
};

// Levels are self-assessed. Change them here whenever your skills grow.
export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI-Assisted Development",
    featured: true,
    blurb:
      "I use AI tools to turn ideas into working applications quickly, and I keep learning the fundamentals so I can understand, check and improve what they produce.",
    items: [
      {
        name: "Vibe Coding",
        level: "Project Experience",
        glyph: "sparkles",
        note: "First prize, TechArena 2026 vibe coding hackathon",
      },
      { name: "Prompt Engineering", level: "Learning", glyph: "message" },
      { name: "AI-Assisted Coding", level: "Project Experience", glyph: "bot" },
      { name: "AI API Integration", level: "Project Experience", glyph: "plug" },
      { name: "AI-Powered Application Development", level: "Project Experience", glyph: "rocket" },
    ],
  },
  {
    id: "fundamentals",
    title: "Programming Fundamentals",
    items: [
      { name: "Python", level: "Project Experience", icon: "Python" },
      { name: "C", level: "Fundamentals", icon: "C" },
      { name: "C++", level: "Fundamentals", icon: "C++" },
      { name: "HTML", level: "Fundamentals", icon: "HTML" },
      { name: "CSS", level: "Fundamentals", icon: "CSS" },
      { name: "JavaScript", level: "Learning", icon: "JavaScript" },
    ],
  },
  {
    id: "tools",
    title: "Development Tools",
    items: [
      { name: "VS Code", level: "Project Experience", glyph: "terminal" },
      { name: "Git", level: "Learning", icon: "Git" },
      { name: "GitHub", level: "Learning", icon: "GitHub" },
      { name: "React", level: "Learning", icon: "React" },
      { name: "Flask", level: "Project Experience", icon: "Flask" },
    ],
  },
  {
    id: "data",
    title: "Data Science & AI",
    items: [
      { name: "NumPy", level: "Learning", icon: "NumPy" },
      { name: "Pandas", level: "Learning", icon: "Pandas" },
      { name: "Machine Learning Fundamentals", level: "Fundamentals", glyph: "chart" },
      { name: "LLM Exploration", level: "Learning", glyph: "brain" },
    ],
  },
];

export const levelInfo: { level: Level; text: string }[] = [
  { level: "Fundamentals", text: "Core concepts I know and keep practising" },
  { level: "Learning", text: "Actively learning and still building confidence" },
  { level: "Project Experience", text: "Used in a real project or hackathon" },
];

export type Hackathon = {
  id: string;
  num: string;
  name: string;
  category: string;
  duration?: string; // highlighted pill, e.g. "36 Hours"
  organizer?: string;
  team?: string;
  project?: string;
  projectSummary?: string; // one-line explanation shown under the project name
  achievement?: string; // achievement badge text
  description: string;
  contribution?: string;
  tags?: string[];
  highlight?: boolean; // first-prize style card
  editable?: boolean; // shows "To be added" for empty fields
};

export const hackathons: Hackathon[] = [
  {
    id: "techarena",
    num: "01",
    name: "TECHARENA 2026 – 7th National IT Fest",
    category: "Vibe Coding Hackathon",
    organizer: "Christ College, Rajkot, in collaboration with GDG Rajkot",
    project: "AuraCraft AI",
    achievement: "FIRST PRIZE – Vibe Coding Hackathon",
    description:
      "Participated in a competitive vibe coding hackathon, collaborating to design and develop an AI-powered solution within a limited timeframe.",
    highlight: true,
  },
  {
    id: "carnival",
    num: "02",
    name: "CODE CARNIVAL SEASON 3 – 36-HOUR HACKATHON",
    category: "National-Level Offline Hackathon",
    duration: "36 Hours",
    team: "NOIR",
    organizer: "Atmiya University",
    project: "EventEase – AI-Powered College Event Management Platform",
    description:
      "Participated in a 36-hour national-level offline hackathon, collaborating with a team to develop an AI-powered college event management platform.",
    tags: ["React", "JavaScript", "AI APIs"],
  },
  {
    id: "innovatex",
    num: "03",
    name: "SIMPLY UPDIFY – INNOVATEX 2.0",
    category: "National-Level Hackathon",
    team: "NOIR",
    project: "RESQ – Emergency Healthcare Coordination Platform",
    achievement: "Shortlisted among 25 teams",
    description:
      "Participated in a national-level hackathon where our initial presentation was shortlisted among 25 teams. We continued with prototype development, focusing on emergency healthcare coordination.",
    contribution: "Backend development using Python, Flask, REST APIs, and SQLite.",
    tags: ["Python", "Flask", "REST APIs", "SQLite"],
  },
  {
    id: "manthan",
    num: "04",
    name: "MANTHAN 2K26 – 24-HOUR HACKATHON",
    category: "24-Hour Hackathon",
    duration: "24 Hours",
    description:
      "Participated in Manthan 2K26, a 24-hour hackathon focused on innovation, teamwork, problem-solving, and developing solutions within a competitive environment.",
    project: "TradePilot AI – Autonomous Algorithmic Trading Platform",
    projectSummary:
      "An autonomous quantitative trading platform featuring real-time market data streaming, dynamic strategy execution, risk management, and portfolio tracking.",
    team: "Red Alpha",
    organizer: "JNNCE (Jawaharlal Nehru National College of Engineering), Shivamogga",
    // TODO: add your achievement here, or leave empty (it shows as "to be added").
    achievement: "",
    editable: true,
  },
];

export type Session = { id: string; name: string; organizer?: string; description: string; tag: string };

export const sessions: Session[] = [
  {
    id: "c4c",
    name: "CODE FOR COMMUNITIES 2.0 – BUILD WITH AI",
    organizer: "GDG Cloud Rajkot / GDG Rajkot",
    description:
      "Technical workshops and preparation sessions exploring AI development, Gemini, Google AI Studio, Firebase Genkit, and agentic AI workflows.",
    tag: "Workshop",
  },
  {
    id: "ieee",
    name: "IEEE DAY 2026 – BUILD WITH GOOGLE: RAG & GEMINI",
    description:
      "Technical learning session exploring Retrieval-Augmented Generation, Gemini, and context-aware AI applications.",
    tag: "Technical Session",
  },
  {
    id: "aisparks",
    name: "AISPARKS 2026",
    description:
      "Technical learning experience covering Artificial Intelligence, Agentic AI, LLMs, and emerging technologies.",
    tag: "Technical Session",
  },
];

export const education = {
  degree: "B.Tech – Computer Science and Engineering (AI & Data Science)",
  school: "Marwadi University, Rajkot, Gujarat",
  status: "Second Year",
};

// Set this to your form service URL (e.g. Formspree) via VITE_FORM_ENDPOINT in .env
// Formspree form endpoint. Public by design (it only accepts submissions), so it is safe in the bundle.
// VITE_FORM_ENDPOINT can override it, e.g. to point at a different form.
export const formEndpoint: string =
  import.meta.env.VITE_FORM_ENDPOINT || "https://formspree.io/f/xwllwkvl";
