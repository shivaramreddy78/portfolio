export const PROFILE = {
  name: "Shivaram Reddy",
  role: "Computer Science Student & Full-Stack Developer",
  email: "eshivaramreddy@gmail.com",
  phone: "9346897709",
  phoneHref: "tel:+9193468997709",
  github: "https://github.com/shivaramreddy78",
  linkedin: "https://linkedin.com/in/shivaram-reddy-enukonda-a11a14332",
  resumePath: "/resume.pdf",
  bio: "Computer Science student specializing in full-stack web applications and AI-driven systems. Focused on building responsive frontends, high-throughput backend APIs, and computer vision workflows.",
  location: "Hyderabad, India"
};

export const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Achievements", href: "#achievements" },
  { label: "Contact", href: "#contact" }
];

export const SKILL_CATEGORIES = [
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript", "SQL", "C"]
  },
  {
    category: "Frontend",
    skills: ["React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3"]
  },
  {
    category: "Backend & APIs",
    skills: ["FastAPI", "Node.js", "REST APIs", "SQLAlchemy"]
  },
  {
    category: "AI, ML & Vision",
    skills: ["Generative AI", "RAG Systems", "LangChain", "OpenCV", "MediaPipe", "Whisper", "Llama"]
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "SQLite", "Supabase"]
  },
  {
    category: "Developer Tools",
    skills: ["Git", "GitHub", "Streamlit", "FFmpeg", "yt-dlp"]
  },
  {
    category: "Core Computer Science",
    skills: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks", "Computer Architecture"]
  }
];

export const PROJECTS = [
  {
    id: "supportai",
    index: "01",
    title: "SupportAI",
    tagline: "AI Customer Support Platform",
    summary: "A modern AI customer-support solution featuring retrieval-augmented generation (RAG), authentication, contextual chat workflows, knowledge-base indexing, and operational analytics.",
    architecture: "Client-side React SaaS frontend paired with a modular retrieval pipeline. Incoming queries trigger contextual embeddings against an indexed knowledge base, synthesizing verified support responses while preserving conversation history.",
    impact: "Built a responsive SaaS interface and integrated intelligent retrieval pipelines to streamline automated customer support inquiries.",
    features: [
      "Retrieval-Augmented Generation (RAG) for accurate knowledge retrieval",
      "Interactive chat interface with authentication & session tracking",
      "Knowledge-base document ingestion and operational analytics"
    ],
    tech: ["React", "TypeScript", "Tailwind CSS", "Python", "RAG"],
    github: "https://github.com/shivaramreddy78",
    status: "Active Project",
    deliverables: "Interactive chat UI, ingestion pipeline, contextual query routing"
  },
  {
    id: "patternoptima",
    index: "02",
    title: "Pattern Optima",
    tagline: "AI-Assisted Fabric Nesting",
    summary: "An intelligent computer vision platform engineered for 2D garment pattern nesting to minimize fabric scrap and optimize layout efficiency in apparel manufacturing.",
    architecture: "Ingests scanned or vector pattern contours, extracts boundary coordinates via computational vision geometry, and calculates minimal-bounding spatial layouts across standard textile yardage.",
    impact: "Designed an interactive pattern upload, inspection, and nesting-visualization workflow integrating computational geometry with computer vision principles.",
    features: [
      "Automated 2D garment pattern contour extraction",
      "Interactive nesting canvas with waste-reduction estimation",
      "Exportable layout blueprints for manufacturing runs"
    ],
    tech: ["React", "Python", "Computer Vision", "OpenCV"],
    github: "https://github.com/shivaramreddy78",
    status: "Research & Prototype",
    deliverables: "Contour detector, interactive layout visualizer, scrap calculation engine"
  },
  {
    id: "smartposture",
    index: "03",
    title: "Smart Posture",
    tagline: "Local-First Computer Vision Monitor",
    summary: "A privacy-focused ergonomic posture monitoring desktop application that tracks spinal and head alignment in real time via live webcam streams.",
    architecture: "Uses MediaPipe Pose landmark estimation executing directly on local CPU/GPU threads without streaming video to external servers. Calculates angular deviations in neck pitch and torso tilt, triggering non-intrusive ergonomic prompts.",
    impact: "Engineered strict on-device landmark inference with MediaPipe and OpenCV—ensuring zero video frames are cached or transmitted over networks.",
    features: [
      "Real-time skeletal landmark triangulation with MediaPipe",
      "Zero network telemetry & 100% on-device local frame processing",
      "Gentle visual and auditory correction notifications"
    ],
    tech: ["Python", "OpenCV", "MediaPipe"],
    github: "https://github.com/shivaramreddy78",
    status: "Published",
    deliverables: "Real-time webcam inference loop, privacy boundary guarantee, desktop notifications"
  },
  {
    id: "smartsummarizer",
    index: "04",
    title: "Smart Summarizer",
    tagline: "Multilingual AI Video & Audio Summarization",
    summary: "An automated multimodal media summarizer that transcribes long-form audio/video content into structured, concise analytical summaries.",
    architecture: "Streamlit-based ingestion layer utilizes yt-dlp and FFmpeg for multi-format audio stream extraction. Audio tracks pass into OpenAI Whisper for speech-to-text transcription, followed by LangChain-orchestrated prompt chaining through Llama models.",
    impact: "Combined Whisper speech-to-text models with Llama LLMs via LangChain orchestration and FFmpeg audio stream extraction in a clean Streamlit interface.",
    features: [
      "High-accuracy speech-to-text transcription powered by Whisper",
      "Structured multi-section executive summaries powered by Llama & LangChain",
      "Direct URL ingestion via yt-dlp with multilingual translation"
    ],
    tech: ["Whisper", "Llama", "LangChain", "Streamlit", "FFmpeg", "yt-dlp"],
    github: "https://github.com/shivaramreddy78",
    status: "Published",
    deliverables: "Audio extraction pipeline, chunked Whisper transcription, structured prompt chain"
  },
  {
    id: "fibo",
    index: "05",
    title: "FIBO",
    tagline: "Alternative Credit Assessment Platform",
    summary: "An algorithmic credit evaluation engine providing alternative credit scoring models for underserved entrepreneurs and early-stage small businesses.",
    architecture: "High-throughput asynchronous FastAPI backend running on relational data schemas managed by SQLAlchemy ORM. Ingests normalized financial inflow/outflow metrics and generates structured creditworthiness profiles via algorithmic scoring heuristics.",
    impact: "Built a robust, typed backend architecture in FastAPI and SQLAlchemy evaluating transactional velocity, operating margins, and dynamic cash flow health.",
    features: [
      "Alternative credit score synthesis using transactional behavior",
      "High-speed asynchronous REST endpoints with automated OpenAPI schemas",
      "Relational data model built on SQLAlchemy ORM"
    ],
    tech: ["FastAPI", "Python", "SQLAlchemy", "REST APIs"],
    github: "https://github.com/shivaramreddy78",
    status: "Prototype",
    deliverables: "FastAPI REST API, financial metric scoring service, relational schema migrations"
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Nalla Narasimha Reddy Education Society's Group of Institutions (NNRG)",
    period: "Expected 2029",
    status: "Undergraduate Student",
    highlights: [
      "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems, Computer Networks, Computer Architecture",
      "Hands-on technical focus: Full-Stack Engineering, Computer Vision, and Generative AI applications"
    ]
  }
];

export const ACHIEVEMENTS = [
  {
    id: "hackathon",
    title: "2nd Prize Winner",
    event: "Generative AI Hackathon",
    badge: "Hackathon",
    description: "Awarded 2nd prize for prototyping an innovative Generative AI application under competitive time constraints."
  },
  {
    id: "paper",
    title: "1st Prize Winner",
    event: "Technical Paper Presentation",
    badge: "Research & Presentation",
    description: "Secured 1st prize for presenting on emerging computational methodologies and technological architectures."
  },
  {
    id: "active",
    title: "Best Active Programmer",
    event: "Competitive Coding & Academic Recognition",
    badge: "Coding Excellence",
    description: "Recognized as Best Active Programmer for consistent problem-solving, algorithm implementation, and coding dedication."
  }
];
