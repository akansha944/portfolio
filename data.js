/**
 * Portfolio content — Akansha Aggarwal
 * PDF: resume.pdf (CV_AkanshaAggarwal.pdf)
 */
const PROFILE = {
  name: "Akansha Aggarwal",
  initials: "AA",
  roleShort: "CSE",
  tagline: "robotics, embedded systems & intelligent workflows.",
  headline:
    "Computer Systems Engineering graduate (Honours) with hands-on experience in robotics, embedded systems, AI/ML, and real-world technical deployments across research and industry.",
  availability: "Open to robotics, embedded systems & software roles",
  email: "aggarwalakansha944@gmail.com",
  phone: "021 243 7430",
  location: "Auckland, New Zealand",
  year: new Date().getFullYear(),
  about1:
    "I am a University of Auckland Computer Systems Engineering graduate (Second Class Honours, First Division) with experience supporting job-tracking systems, power monitoring, robotics research, and full-stack web development.",
  about2:
    "I enjoy robotics operations, AI-driven workflows, dashboards, and field technology — and I bring strong skills in data validation, technical documentation, and cross-functional collaboration.",
};

const RESUME = {
  pdf: "resume.pdf",
  downloadName: "Akansha-Aggarwal-CV.pdf",
  lastUpdated: "2026",
  summary:
    "Engineering graduate focused on robotics, embedded systems, AI/ML, and reliable operational systems — from FPGA pacemakers to companion robots.",
};

const FACTS = [
  { label: "Location", value: "Auckland, New Zealand" },
  { label: "Education", value: "BE (Hons) Computer Systems — UoA" },
  { label: "Grade", value: "2:1 (Second Class Honours First Division)" },
  { label: "Phone", value: "021 243 7430" },
];

const STATS = [
  { value: "4+", label: "Major projects" },
  { value: "5+", label: "Roles & research" },
  { value: "2025", label: "Robotics award winner" },
];

const EXPERIENCE = [
  {
    id: "exp-research-uoa",
    role: "Research Assistant",
    company: "University of Auckland",
    period: "Jun 2025 – Feb 2026",
    location: "Auckland",
    bullets: [
      "Installed, configured, and supported technical systems for job tracking and power monitoring.",
      "Handled system data and tracking records with accuracy, validation, and traceability.",
      "Troubleshot hardware and software issues across multiple deployments.",
      "Maintained operational documentation and worked with real-world datasets for reliability.",
    ],
  },
  {
    id: "exp-companion-robot",
    role: "Companion Robot Design (Research Project)",
    company: "University of Auckland — Prof. Bruce MacDonald",
    period: "2025",
    location: "Auckland",
    bullets: [
      "Designed an AI-assisted socially interactive companion robot for human-robot interaction.",
      "Prototyped and tested user-centric behaviours: emotional interaction, usability, responsiveness.",
      "Winner — Robotics Category, UoA Part IV Project Display Day (2025).",
    ],
  },
  {
    id: "exp-beyond",
    role: "Junior Web Developer",
    company: "Beyond Studio",
    period: "Jun 2023 – Dec 2024",
    location: "India (remote/hybrid)",
    bullets: [
      "Developed responsive websites using WordPress and Wix.",
      "Built and integrated REST APIs for data-driven applications.",
      "Tested, troubleshooted, and optimised site performance with cross-functional teams.",
    ],
  },
  {
    id: "exp-noel",
    role: "Customer Service Representative",
    company: "Noel Leeming",
    period: "Oct 2024 – Mar 2025",
    location: "Auckland",
    bullets: [
      "Processed transactions and customer requests with high accuracy.",
      "Managed product handling and stock in a fast-paced retail environment.",
    ],
  },
  {
    id: "exp-unicrew",
    role: "UniCrew",
    company: "University of Auckland",
    period: "Dec 2024 – Dec 2025",
    location: "Auckland",
    bullets: [
      "Supported university events, logistics, and student engagement.",
      "Guided new students through campus services in an inclusive environment.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Engineering (Honours), Computer Systems",
    school: "University of Auckland",
    period: "Feb 2022 – Dec 2025",
    details:
      "Second Class Honours (First Division). Coursework: Embedded Systems, Software Engineering, AI, ML, Computer Architecture.",
  },
];

const LEADERSHIP = [
  {
    role: "Treasurer & Event Coordinator",
    org: "IEEE Student Branch, UoA",
    period: "Jun 2023 – Nov 2025",
    detail: "Organised technical events; managed budgets and financial planning.",
  },
  {
    role: "Marketing Officer",
    org: "NZHSF",
    period: "Feb 2024 – Nov 2024",
    detail: "Created marketing content and supported student campaign initiatives.",
  },
];

const SKILLS = [
  {
    id: "robotics",
    name: "Robotics & Embedded",
    level: 90,
    proof: "Companion robot research (award winner), FPGA pacemaker, ABS conveyor SystemJ project, energy monitor telemetry.",
  },
  {
    id: "python",
    name: "Python / ML",
    level: 88,
    proof: "Face recognition (VGG, ResNet), Pandas data processing, AI/ML coursework and research workflows.",
  },
  {
    id: "java",
    name: "Java / C / C++",
    level: 85,
    proof: "Industrial automation step detection, embedded and real-time systems across degree projects.",
  },
  {
    id: "js",
    name: "JavaScript & APIs",
    level: 82,
    proof: "Beyond Studio web development; REST API integration for data-driven apps.",
  },
  {
    id: "fpga",
    name: "FPGA & Hardware",
    level: 80,
    proof: "Pacemaker on FPGA (SCCharts, C, UART); Quartus II, Altium Designer, sensor systems.",
  },
  {
    id: "ops",
    name: "Ops & Documentation",
    level: 88,
    proof: "Research Assistant role: logging, validation, troubleshooting, operational records at UoA.",
  },
];

const PROJECTS = [
  {
    id: "project-companion-robot",
    title: "AI Companion Robot",
    tag: "Award winner",
    size: "medium",
    problem:
      "Need for socially interactive robots with responsive, user-centred behaviour in real environments.",
    role: "Research · Design & prototyping",
    stack: ["Robotics", "AI", "HRI", "Python"],
    impact:
      "Winner — Robotics Category, UoA Part IV Project Display Day (2025).",
    links: {
      live: null,
      code: "https://github.com/akansha944",
    },
    accent: "coral",
  },
  {
    id: "project-energy-monitor",
    title: "Smart Energy Monitor for Racing Cars",
    tag: "Embedded",
    size: "medium",
    problem: "Racing teams need reliable real-time energy and telemetry monitoring.",
    role: "Systems integration",
    stack: ["Embedded", "Telemetry", "C", "Data logging"],
    impact:
      "Integrated hardware/software for reliable capture; logged outputs for monitoring and troubleshooting.",
    links: { live: null, code: "https://github.com/akansha944" },
    accent: "mint",
  },
  {
    id: "project-face-recognition",
    title: "Face Recognition System",
    tag: "AI / CV",
    size: "medium",
    problem: "Accurate face recognition requires robust deep learning pipelines and validation.",
    role: "ML engineer",
    stack: ["Python", "VGG", "ResNet", "Deep learning"],
    impact:
      "Trained and evaluated models on benchmarks; applied optimisation and lifecycle test cases.",
    links: { live: null, code: "https://github.com/akansha944" },
    accent: "violet",
  },
  {
    id: "project-industrial-automation",
    title: "Industrial Automation & Step Detection",
    tag: "Real-time",
    size: "medium",
    problem: "Conveyor systems need synchronous control and reliable motion step detection.",
    role: "Developer",
    stack: ["Java", "SystemJ", "Sensors"],
    impact:
      "ABS conveyor control with sensor orientation analysis; tested for reliability and performance.",
    links: { live: null, code: "https://github.com/akansha944" },
    accent: "amber",
  },
  {
    id: "project-pacemaker",
    title: "Pacemaker System (FPGA)",
    tag: "Safety-critical",
    size: "small",
    problem: "Safety-critical cardiac pacing requires verified FPGA implementation and test harness.",
    role: "Embedded developer",
    stack: ["SCCharts", "C", "FPGA", "UART"],
    impact:
      "DDD-mode pacemaker with virtual heart simulation via UART; focused on reliability and safety.",
    links: { live: null, code: "https://github.com/akansha944" },
    accent: "mint",
  },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/akansha-aggarwal-akag0430",
  },
  { label: "GitHub", url: "https://github.com/akansha944" },
  {
    label: "Email",
    url: "mailto:aggarwalakansha944@gmail.com",
  },
];

// Expose data to main.js (separate script file)
if (typeof window !== "undefined") {
  window.PROFILE = PROFILE;
  window.RESUME = RESUME;
  window.FACTS = FACTS;
  window.STATS = STATS;
  window.EXPERIENCE = EXPERIENCE;
  window.EDUCATION = EDUCATION;
  window.LEADERSHIP = LEADERSHIP;
  window.SKILLS = SKILLS;
  window.PROJECTS = PROJECTS;
  window.SOCIAL = SOCIAL;
}
