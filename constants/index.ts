import React from "react";
import { CgWorkAlt } from "react-icons/cg";
import { FaReact } from "react-icons/fa";
import { LuGraduationCap } from "react-icons/lu";
import { SiNextdotjs } from "react-icons/si";
import { FaChartLine } from "react-icons/fa";
import { MdGraphicEq, MdHealthAndSafety } from "react-icons/md";

// Navigation links
export const LINKS = [
  {
    name: "Home",
    hash: "/#home",
  },
  {
    name: "About",
    hash: "/#about",
  },
  {
    name: "Skills",
    hash: "/#skills",
  },
  {
    name: "Experience",
    hash: "/#experience",
  },
  {
    name: "Projects",
    hash: "/#projects",
  },
  {
    name: "Amicia",
    hash: "/chat",
  },
] as const;

// External links
export const EXTRA_LINKS = {
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
  resume: process.env.NEXT_PUBLIC_RESUME_PATH,
  email: process.env.NEXT_PUBLIC_EMAIL_ADDRESS,
  whatsApp: process.env.NEXT_PUBLIC_WHATSAPP_URL,
} as const;

export const PROJECTS_DATA = [
  {
    title: "AI Voice-Based Agent with SQL-RAG Integration",
    description: [
      "Built a voice-enabled agent that presents PDF content and engages users in contextual, knowledge-based conversations.",
      "Developed an AI-powered RAG application for wealth management, utilizing SQL to manage complex databases and create dynamic charts for real-time data visualization.",
    ],
    icon: React.createElement(MdGraphicEq),
  },
  {
    title: "Financial & Wealth Management System",
    description: [
      "Scraped and processed 150K+ records from website UI using Cheerio to support customer acquisition and accelerate business growth.",
      "Improved Neo4j query performance by 90%, reducing the time to export a person along with their entire family from 20 seconds to 2 seconds.",
    ],
    icon: React.createElement(FaChartLine),
  },
  {
    title: "Multi-Lingual Healthcare Management System",
    description: [
      "Developed a secure, multi-lingual healthcare application with role-based access control (RBAC).",
      "Integrated a large patient assessment question set into the database in 5+ languages.",
    ],
    icon: React.createElement(MdHealthAndSafety),
  },
];

// Data for work experience
export const EXPERIENCES_DATA = [
  {
    title: " Jr. Backend Developer at ILM UX Pvt. Ltd.",
    description:
      "Contributed to building secure and scalable backend systems, focusing on REST APIs and WebSockets to support real-time data processing. Gained valuable hands-on experience working in finance and healthcare domains, while continuously expanding expertise in containerization and algorithmic problem-solving.",
    icon: React.createElement(CgWorkAlt),
    location: "Mumbai, India.",
    date: "2022 - 2025",
  },
  {
    title: "Career Start Here",
    description:
      "Like the calm before a storm, this phase was quiet but charged with potential. It was the moment where curiosity sparked action, setting the foundation for everything that came next.",
    icon: React.createElement(LuGraduationCap),
    location: "Mumbai, India.",
    date: "2022",
  },
] as const;

// Data for skills
export const SKILLS_DATA = [
  "Node.js",
  "Express.js",
  "Nest.js",
  "JavaScript",
  "TypeScript",
  "Python",
  "MySQL",
  "MongoDB",
  "Neo4j",
  "Burp Suite",
  "Postman",
  "Jest",
  "GIT",
  "TypeORM",
  "sequelizeORM",
  "JWT",
  "RBCA",
  "LLM",
  "ChatBot",
  "Penetest",
  "Domain-Specific ChatBot",
  "RAG With SQL",
  "MCP",
  "Web Scraping",
  "WebSockets",
] as const;

// Owner name
export const OWNER_NAME = "Syed Ahamed";
