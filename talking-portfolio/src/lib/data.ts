export const PROFILE = {
  name: "Shivaram Reddy",
  role: "Full Stack Developer.",
  email: "eshivaramreddy@gmail.com",
  phone: "93468997709",
  phoneHref: "tel:+9193468997709",
  github: "https://github.com/shivaramreddy78",
  linkedin: "https://linkedin.com/in/shivaram-reddy-enukonda-a11a14332",
  resumePath: "/resume.pdf",
  resumeSummary: "Full Stack Developer | AI/ML Enthusiast | Computer Science Engineering Student",
  location: "Hyderabad, India" // Left blank/default as missing
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export const SKILL_GROUPS = [
  {
    family: "Languages",
    skills: [
      { name: "C Language", symbol: "C" },
      { name: "Java", symbol: "Ja" },
      { name: "Python", symbol: "Py" }
    ]
  },
  {
    family: "Databases",
    skills: [
      { name: "SQL", symbol: "Sq" },
      { name: "MySQL", symbol: "My" }
    ]
  }
];

export const PROJECTS = [
  {
    id: "supportai",
    index: "01",
    title: "SupportAI",
    kicker: "AI Customer Support Platform",
    description: "Developed a modern AI-powered customer-support platform using RAG, authentication, chat functionality, knowledge-base retrieval and analytics.",
    features: [
      "Responsive SaaS interface",
      "Integrated backend/API workflows"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: null
  },
  {
    id: "patternoptima",
    index: "02",
    title: "Pattern Optima",
    kicker: "AI-Assisted Fabric Nesting",
    description: "Designed an AI-assisted platform for 2D garment pattern nesting to help reduce fabric waste in the apparel industry.",
    features: [
      "Interactive pattern-upload",
      "Preview and nesting-visualization"
    ],
    tech: ["React", "Python", "Computer Vision"],
    github: null
  },
  {
    id: "smartposture",
    index: "03",
    title: "Smart Posture",
    kicker: "Computer Vision",
    description: "Developed a privacy-focused posture monitoring application using Python, OpenCV and MediaPipe.",
    features: [
      "Webcam-based body landmarks",
      "Processes locally without storing frames"
    ],
    tech: ["Python", "OpenCV", "MediaPipe"],
    github: null
  },
  {
    id: "smartsummarizer",
    index: "04",
    title: "Smart Summarizer",
    kicker: "AI Video Summarization",
    description: "Built an AI-powered summarization application using Whisper, Llama, LangChain, Streamlit, yt-dlp and FFmpeg.",
    features: [
      "Converts video/audio to text",
      "Supports multilingual processing"
    ],
    tech: ["Whisper", "Llama", "LangChain", "Streamlit"],
    github: null
  },
  {
    id: "fibo",
    index: "05",
    title: "FIBO",
    kicker: "Alternative Credit Assessment",
    description: "Designed an AI-based alternative credit assessment solution for underserved individuals and small businesses.",
    features: [
      "Uses financial and business signals",
      "Backend architecture"
    ],
    tech: ["FastAPI", "Python", "SQLAlchemy"],
    github: null
  }
];

export const EDUCATION = [
  {
    year: "Expected 2029",
    title: "B.Tech — Computer Science Engineering",
    place: "Nalla Narasimha Reddy Education Society's Group of Institutions",
    detail: "1st Year SGPA: 7.95"
  }
];

export const EXPERIENCE = [
  {
    year: "Jun 2024 – Jul 2024",
    title: "Generative AI Intern",
    place: "Sangam Solutions",
    detail: "Worked on Generative AI applications and automation workflows. Contributed to a Salesforce chatbot and Workato automation solutions."
  },
  {
    year: "Apr 2024 – Jul 2024",
    title: "Full Stack Development Intern",
    place: "Pantech Solutions",
    detail: "Worked on full-stack web development and API integration. Contributed to API aggregation and application deployment workflows."
  }
];

export const ACHIEVEMENTS = [
  {
    id: "hackathon",
    title: "2nd Prize",
    subtitle: "Generative AI Hackathon",
    logo: "hackathon"
  },
  {
    id: "paper",
    title: "1st Prize",
    subtitle: "Paper Presentation",
    logo: "paper"
  },
  {
    id: "active",
    title: "Best Active",
    subtitle: "Programmer",
    logo: "code"
  }
];
