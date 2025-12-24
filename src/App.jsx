import React, { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, ArrowUpRight, Github, Twitter, Linkedin,
  Mail, MapPin, Calendar, Layers, Cpu, Code, ExternalLink,
  Brain, Database, Network, X, Terminal, BookOpen, PenTool, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight,
  TrendingUp, MessageSquare, Workflow, Bot, Box, Cloud, Server, Globe, Zap, Sigma, FunctionSquare, Binary, Scale
} from 'lucide-react';
import MobileNavigation from './components/MobileNavigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import frontMatter from 'front-matter';
import 'katex/dist/katex.min.css';
import gsap from 'gsap';

// --- Styled Components & Icons Helpers ---

const SocialLink = ({ href, icon: Icon, label, size = 16, textSize = "text-xs" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 group hover:text-red-600 transition-colors duration-200"
  >
    <Icon size={size} />
    <span className={`font-mono ${textSize} uppercase tracking-wider group-hover:underline decoration-red-600 underline-offset-4`}>
      {label}
    </span>
  </a>
);

const ExperienceModal = ({ experience, onClose }) => {
  if (!experience) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="bg-[#f4f1ea] text-black w-full max-w-2xl border-4 border-double border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b-2 border-black">
          <h3 className="font-serif text-2xl font-bold uppercase tracking-tight">Experience Detail</h3>
          <button onClick={onClose} className="text-black hover:text-red-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="flex gap-4 mb-6 border-b border-dashed border-black/30 pb-6">
            <div className="w-16 h-16 bg-black text-white rounded-none flex items-center justify-center flex-shrink-0 border-2 border-black">
              <span className="font-serif text-3xl font-bold">{experience.company[0]}</span>
            </div>
            <div>
              <h2 className="font-serif text-2xl font-bold leading-none mb-1">{experience.role}</h2>
              <div className="font-mono text-sm font-bold uppercase tracking-wider text-red-600 mb-1">{experience.company}</div>
              <div className="font-mono text-xs opacity-70">
                {experience.period} • {experience.location}
              </div>
            </div>
          </div>

          <div className="font-serif text-lg leading-relaxed space-y-4 text-justify">
            {experience.fullDescription}
          </div>


        </div>
      </div>
    </div>
  );
};

const PublicationModal = ({ publication, onClose }) => {
  if (!publication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="bg-[#f4f1ea] text-black w-full max-w-2xl border-4 border-double border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b-2 border-black">
          <h3 className="font-serif text-2xl font-bold uppercase tracking-tight">Publication Detail</h3>
          <button onClick={onClose} className="text-black hover:text-red-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto">
          <div className="mb-6 border-b border-dashed border-black/30 pb-6">
            <h2 className="font-serif text-2xl font-bold leading-tight mb-2">{publication.title}</h2>
            <div className="font-mono text-sm font-bold uppercase tracking-wider text-red-600 mb-1">{publication.publisher}</div>
            <div className="font-mono text-xs opacity-70 mb-4">
              {publication.date} • <a href={publication.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-red-600">IEEE Xplore</a>
            </div>
          </div>

          <div className="font-serif text-lg leading-relaxed space-y-4 text-justify">
            <p className="font-bold">Abstract:</p>
            {publication.abstract}
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ children, className = "" }) => (
  <h3 className={`font-serif text-2xl font-bold uppercase border-b-2 border-current mb-4 pb-1 tracking-tight ${className}`}>
    {children}
  </h3>
);

const Badge = ({ children }) => (
  <span className="px-2 py-0.5 border border-current font-mono text-[10px] uppercase tracking-widest hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors cursor-default">
    {children}
  </span>
);

// --- Data ---

const PROJECTS = [
  {
    id: 1,
    title: "Neuro-Vision Pipeline",
    category: "Computer Vision",
    description: "End-to-end object detection pipeline optimized for edge devices using quantized YOLOv8 models.",
    stack: ["PyTorch", "OpenCV", "ONNX", "FastAPI"],
    link: "#",
    year: "2024"
  },
  {
    id: 2,
    title: "Cognitive RAG Agent",
    category: "NLP & LLMs",
    description: "Autonomous research agent capable of synthesizing technical papers using Retrieval Augmented Generation.",
    stack: ["LangChain", "Pinecone", "OpenAI API", "React"],
    link: "#",
    year: "2023"
  },
  {
    id: 3,
    title: "Alpha-Trade Bot",
    category: "Reinforcement Learning",
    description: "Deep Q-Learning agent trained on high-frequency crypto market data for automated trading execution.",
    stack: ["TensorFlow", "Gym", "Python", "Docker"],
    link: "#",
    year: "2023"
  }
];



const TECH_STACK_DATA = {
  "Mathematical Foundations": {
    type: "ticker",
    items: [
      { name: "Linear Algebra", icon: Binary },
      { name: "Multivariable Calculus", icon: FunctionSquare },
      { name: "Probability & Statistics", icon: Sigma },
      { name: "Convex Optimization", icon: TrendingUp },
      { name: "Statistical Modeling", icon: Scale },
      { name: "Machine Learning Theory", icon: BookOpen }
    ]
  },
  "Core Technologies": {
    type: "ticker",
    items: [
      { name: "Python", slug: "python" },
      { name: "Git", slug: "git" },
      { name: "GitHub", slug: "github" },
      { name: "PyTorch", slug: "pytorch" },
      { name: "scikit-learn", slug: "scikitlearn" }
    ]
  },
  "Machine Learning & Deep Learning": {
    type: "ticker",
    items: [
      { name: "Neural Networks", icon: Brain },
      { name: "OpenCV", slug: "opencv" },
      { name: "NLP", icon: MessageSquare },
      { name: "Predictive Modeling", icon: TrendingUp }
    ]
  },
  "LLMs & Open-Source": {
    type: "ticker",
    items: [
      { name: "Llama", icon: Brain },
      { name: "Hugging Face", slug: "huggingface" },
      { name: "Quantization", icon: Cpu },
      { name: "Mistral", icon: Cloud },
      { name: "DeepSeek", icon: Brain }
    ]
  },
  "RAG & Agentic AI": {
    type: "ticker",
    items: [
      { name: "Weaviate", slug: "weaviate" },
      { name: "LangChain", slug: "langchain" },
      { name: "Faiss", icon: Database },
      { name: "Graph-RAG", icon: Network },
      { name: "MCP", icon: Workflow },
      { name: "Agents", icon: Bot },
      { name: "Workflows", icon: Zap }
    ]
  },
  "Backend & Cloud": {
    type: "ticker",
    items: [
      { name: "FastAPI", slug: "fastapi" },
      { name: "Flask", slug: "flask" },
      { name: "Docker", slug: "docker" },
      { name: "AWS", slug: "amazonaws" },
      { name: "GCP", slug: "googlecloud" }
    ]
  },
  "Graph & Prototyping": {
    type: "ticker",
    items: [
      { name: "Neo4j", slug: "neo4j" },
      { name: "Streamlit", slug: "streamlit" },
      { name: "Gradio", icon: Box }
    ]
  }
};

const TechTicker = ({ items, direction = "left" }) => {
  // Calculate duration based on item count to ensure consistent speed (e.g., 6 seconds per item)
  const duration = items.length * 6;

  return (
    <div className="relative flex overflow-hidden w-full mask-linear-fade">
      <div
        className={`flex gap-6 py-2 animate-scroll whitespace-nowrap ${direction === "right" ? "direction-reverse" : ""}`}
        style={{ animationDuration: `${duration}s`, animationTimingFunction: 'linear' }}
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-2 group">
            {item.slug ? (
              <div
                className="w-5 h-5 bg-current text-white group-hover:bg-red-600 transition-all"
                style={{
                  maskImage: `url(https://cdn.simpleicons.org/${item.slug})`,
                  WebkitMaskImage: `url(https://cdn.simpleicons.org/${item.slug})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center'
                }}
              />
            ) : item.icon ? (
              <item.icon size={20} className="text-white group-hover:text-red-600 transition-colors" />
            ) : null}
            <span className="font-mono text-sm font-bold uppercase tracking-wider text-white group-hover:text-red-600 transition-colors">
              {item.name}
            </span>
            <span className="opacity-30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const EXPERIENCE = [
  {
    period: "Oct 2025 - Present",
    role: "Machine Learning Engineer",
    company: "HyER Power B.V.",
    type: "Freelance",
    duration: "3 mos",
    location: "Remote",
    desc: "Freelance ML Engineer.",
    fullDescription: "Freelance Machine Learning Engineer contributing to advanced power systems optimization.",
    skills: "PyTorch · Deep Learning · TensorFlow"
  },
  {
    period: "Jun 2025 - Present",
    role: "AI/ML Engineer - Founding Member",
    company: "SlateMate",
    type: "Part-time",
    duration: "7 mos",
    location: "Chennai, Tamil Nadu, India · Hybrid",
    desc: "Founding AI Engineer. Architecting agentic systems & content moderation frameworks.",
    fullDescription: "Founding member driving the R&D and architecture of AI agentic systems. Focused on building scalable, intelligent frameworks for content moderation and digital well-being designed to protect the next generation.",
    skills: "AI Architecture · Agentic Systems · R&D"
  },
  {
    period: "Oct 2024 - Mar 2025",
    role: "Machine Learning Researcher",
    company: "National Institute of Wind Energy",
    type: "Full-time",
    duration: "6 mos",
    location: "Chennai, Tamil Nadu, India",
    desc: "ML Researcher. Built TFT models for energy forecasting & uncertainty quantification.",
    fullDescription: "Engineered a Temporal Fusion Transformer (TFT) from scratch for Annual Energy Production (AEP) forecasting, achieving a 0.040 MSE on real-time operational datasets.\n\nArchitected a custom loss function and zero-shot learning pipeline, enabling robust model generalization across diverse Indian substations without site-specific retraining.\n\nQuantified long-term estimation uncertainty via Monte Carlo simulations, collaborating with researchers from DTU Wind Energy Systems (TOPFARM) to enhance grid resource planning.",
    skills: "PyTorch · Time Series Forecasting · Predictive Modeling · Deep Learning · Data Analytics"
  }
];

const PUBLICATIONS = [
  {
    title: "Automated Safety Compliance Monitoring in Industrial Environments with Autonomous Rover",
    publisher: "IEEE",
    date: "2024",
    link: "https://ieeexplore.ieee.org/document/10739308",
    abstract: "In today's industrial sector, the efficient monitoring of safety compliance is essential. The number of industrial accidents has been on the rise and this study proposes an alternate approach to traditional monitoring systems, designed to enhance safety by integrating NVIDIA’s Jetson Nano for data processing and computer vision supported by NVIDIA's DeepStream SDK pipeline for real-time video analytics. Equipped with IR and ultrasonic sensors, the rover autonomously navigates and detects obstacles while seamlessly sending over data from the edge device to the cloud through the integration of Azure IoT resources, it achieves efficient data communication, enabling real-time safety management and analysis."
  },
  {
    title: "Securing Patient Health Records Using Blockchain",
    publisher: "IEEE",
    date: "2024",
    link: "https://ieeexplore.ieee.org/document/10739100",
    abstract: "Traditional Electronic Health Records (EHRs) raise red flags about data privacy, security, and patient control. This research tackles these issues by proposing a new system where patients call the shots on their medical information. Our blockchain and InterPlanetary File System (IPFS) system puts patients in the driver's seat, granting them complete ownership and oversight of their health data. Patients securely submit their formatted medical history through a dedicated website, where it's stored on IPFS using a decentralized platform like Pinata. A unique code (Content Identifier or CID) acts like a key, linking the data to the patient's blockchain address via a smart contract (coded rules) for guaranteed accuracy and tracking. Our design prioritizes patient-controlled access. Healthcare providers can't access the data without the patient's explicit go-ahead. Access requests are sent directly to the patient, who has the final say on approval, ensuring their data privacy is always protected. Approved requests include the CID, allowing authorized physicians to retrieve the patient's data directly from IPFS storage. But patient control goes beyond just reacting to access requests. Our system empowers patients to be proactive. Using their unique login credentials, they can grab their CID directly from the blockchain. This retrieval process can be integrated into a secure patient portal or mobile app. With their CID in hand, patients can directly share it with chosen physicians, fostering collaboration in care without relying on intermediary platforms. This streamlined data exchange empowers patients and fosters a more collaborative healthcare environment where they actively manage their health information."
  },
  {
    title: "Block-Chain Enhanced Patient Triage System",
    publisher: "IEEE",
    date: "2024",
    link: "https://ieeexplore.ieee.org/document/10739156",
    abstract: "In today's fast-paced healthcare environment, efficient management of patient records and seamless patient-provider communication is crucial. This study proposes a comprehensive solution integrating blockchain technology (Ethereum), frontend web interfaces, natural language processing (NLP), and adverse drug event detecting functions. Through a user-friendly React.js interface, patients input health data securely, while NLP automates medical information extraction from conversations. ADE detectors identify drug interactions and adverse events, enhancing care and safety. Ethereum integration via Metamask ensures secure record storage, with IPFS storage and CIDs enabling encrypted data sharing. A smart contract on Ethereum automates data management for transparency and accountability."
  }
];

const CREDENTIALS = [
  {
    title: "OCI Generative AI Certified Professional",
    issuer: "Oracle",
    date: "Jul 2024",
    link: "https://www.linkedin.com/in/sanjayks2317/details/certifications/"
  },
  {
    title: "Artificial Intelligence Analyst",
    issuer: "IBM",
    date: "Jul 2023",
    link: "https://courses.ibmcep.cognitiveclass.ai/certificates/74b10dec5a3b4c1aa566c5e6c5d73fe7"
  },
  {
    title: "ML Summer School",
    issuer: "Cohere Labs",
    date: "Jul 2025",
    link: "https://credsverse.com/credentials/afec0a3f-c934-41c0-9a07-7c50a2ebf012"
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    date: "Sep 2025",
    link: "https://verify.skilljar.com/c/syicahbwgjj3"
  },
  {
    title: "Model Context Protocol: Advanced Topics",
    issuer: "Anthropic",
    date: "Sep 2025",
    link: "https://verify.skilljar.com/c/vyytsw2vx4ha"
  },
  {
    title: "AWS Summit India Online 2025",
    issuer: "Amazon Web Services",
    date: "Jun 2025",
    link: "https://www.linkedin.com/in/sanjayks2317/details/certifications/"
  },
  {
    title: "Connect Conference 2025",
    issuer: "Cohere Labs",
    date: "Nov 2025",
    link: "https://credsverse.com/credentials/d97048b7-82f9-4c34-be88-48269b25c09e"
  }
];

// --- Constants & Helpers ---

const FEATURED_PROJECTS = [
  'Gemma-3n-Finetuning',
  'StratifyAI',
  'Graph-RAG',
  'Cross-Platform-Social-Media-Content-Scraper',
  'vercel-portfolio'
];

const PROJECT_OVERRIDES = {
  'Gemma-3n-Finetuning': {
    title: 'Gemma Alignment Paradigms',
    description: 'A comparative study on aligning Google’s open source Gemma models using two paradigms: (1) RL-only fine-tuning using GRPO/PPO/DPO with a custom reward model, (2) A SFT+PEFT using LoRA/QLoRA based finetuning and (3) a staged SFT+PEFT (LoRA/QLoRA) pipeline followed by reinforcement Learning.',
    html_url: 'https://github.com/sanjay-ks23/Gemma-3n-Finetuning',
    topics: ['Deep Learning', 'RLHF', 'LLMs', 'PyTorch']
  },
  'StratifyAI': {
    title: 'Probabilistic Match Inference Engine',
    description: 'An autonomous predictive modeling system that forecasts match outcomes via live game-state analysis. Leverages deep reinforcement learning to identify momentum shifts and quantify tactical volatility in real-time.',
    html_url: 'https://github.com/sanjay-ks23/StratifyAI',
    topics: ['Reinforcement Learning', 'Predictive Modeling', 'Python']
  },
  'Graph-RAG': {
    title: 'GraphRAG Psychotherapist Agent',
    description: 'A production-grade Hybrid GraphRAG architecture for mental wellness support, engineered with real-time safety guardrails. Orchestrates a stateful LangGraph pipeline combining semantic search (Milvus) with knowledge graph reasoning (Neo4j) for grounded, hallucination-resistant clinical alignment. Built on an async FastAPI backend with pluggable LLM support (AWS Bedrock/OpenAI) and comprehensive observability, fully containerized via Docker for scalable AWS deployment.',
    html_url: 'https://github.com/sanjay-ks23/Graph-RAG',
    topics: ['RAG', 'LangChain', 'Neo4j', 'FastAPI']
  },
  'Cross-Platform-Social-Media-Content-Scraper': {
    title: 'Social Media ETL Pipeline',
    description: 'A robust data ingestion engine designed to harvest unstructured content from dynamic Single Page Applications (Instagram, YouTube, Twitter, Reddit). Leverages Playwright for headless browser automation and APIs to handle client-side rendering and infinite scrolling. Implements a modular ETL workflow that scrapes, sanitizes, and serializes raw data into structured CSV datasets for downstream analytics.',
    html_url: 'https://github.com/sanjay-ks23/Cross-Platform-Social-Media-Content-Scraper',
    topics: ['Web Scraping', 'ETL', 'Playwright', 'Python']
  },
  'vercel-portfolio': {
    title: 'Portfolio',
    description: 'The recursive interface you are currently navigating. Built with React and Vite, featuring a custom "Newspaper" design system, dynamic GitHub integration, and immersive GSAP animations. Engineered for performance and accessibility, serving as a live demonstration of modern frontend architecture.',
    html_url: 'https://github.com/sanjay-ks23/vercel-portfolio',
    topics: ['React', 'Vite', 'TailwindCSS', 'GSAP']
  }
};

const getInitialProjects = () => {
  return FEATURED_PROJECTS.map(repoName => {
    const override = PROJECT_OVERRIDES[repoName] || {};
    return {
      name: override.title || repoName.replace(/-/g, ' '),
      description: override.description || 'Loading description...',
      html_url: override.html_url || `https://github.com/sanjay-ks23/${repoName}`,
      topics: override.topics || [],
      stargazers_count: null,
      forks_count: null,
      watchers_count: null,
      language: 'Python'
    };
  });
};

// --- Main Application ---

export default function App() {
  const [activePage, setActivePage] = useState('front'); // 'front', 'projects', 'blogs', 'contact'
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [githubProjects, setGithubProjects] = useState(getInitialProjects());
  const [githubProfile, setGithubProfile] = useState(null);

  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    // Fetch GitHub Repos (Progressive Enhancement)
    fetch('https://api.github.com/users/sanjay-ks23/repos?sort=pushed&per_page=100')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const processedProjects = data
            .filter(repo => FEATURED_PROJECTS.includes(repo.name))
            .sort((a, b) => {
              return FEATURED_PROJECTS.indexOf(a.name) - FEATURED_PROJECTS.indexOf(b.name);
            })
            .map(repo => ({
              ...repo,
              name: PROJECT_OVERRIDES[repo.name]?.title || repo.name.replace(/-/g, ' '),
              description: PROJECT_OVERRIDES[repo.name]?.description || repo.description,
              topics: PROJECT_OVERRIDES[repo.name]?.topics || repo.topics
            }));

          if (processedProjects.length > 0) {
            setGithubProjects(processedProjects);
          } else {
            console.warn('Fetched repos but none matched FEATURED_PROJECTS. Keeping fallback data.');
          }
        }
      })
      .catch(err => {
        console.warn('GitHub API failed, using fallback data:', err);
      });

    // Fetch GitHub Profile
    fetch('https://api.github.com/users/sanjay-ks23')
      .then(res => res.json())
      .then(data => setGithubProfile(data))
      .catch(err => console.error('Error fetching profile:', err));
  }, []);

  const [blogs, setBlogs] = useState([]);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Enforce Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Load Blogs Dynamically
  useEffect(() => {
    const loadBlogs = async () => {
      const modules = import.meta.glob('./content/blogs/*.md', { as: 'raw' });
      const loadedBlogs = [];

      for (const path in modules) {
        const rawContent = await modules[path]();
        const { attributes, body } = frontMatter(rawContent);
        loadedBlogs.push({
          ...attributes,
          content: body,
          readTime: calculateReadTime(body)
        });
      }
      // Sort by ID or Date if needed
      loadedBlogs.sort((a, b) => a.id - b.id);
      setBlogs(loadedBlogs);
    };

    loadBlogs();
  }, []);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/[#*`]/g, ''); // Basic Markdown strip
    const wordCount = text.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  const handleBlogClick = (id) => {
    setSelectedBlogId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlogs = () => {
    setSelectedBlogId(null);
  };

  const handleNextBlog = () => {
    if (!selectedBlogId) return;
    const currentIndex = blogs.findIndex(b => b.id === selectedBlogId);
    const nextIndex = (currentIndex + 1) % blogs.length;
    setSelectedBlogId(blogs[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevBlog = () => {
    if (!selectedBlogId) return;
    const currentIndex = blogs.findIndex(b => b.id === selectedBlogId);
    const prevIndex = (currentIndex - 1 + blogs.length) % blogs.length;
    setSelectedBlogId(blogs[prevIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChange = (newPage) => {
    if (newPage === activePage) return;

    const timeline = gsap.timeline();
    const content = contentRef.current;

    // Book Flip Animation
    timeline.to(content, {
      duration: 0.6,
      rotationY: -90,
      transformOrigin: "left center",
      ease: "power2.in",
      onComplete: () => {
        setActivePage(newPage);
        setSelectedBlogId(null); // Reset blog selection on page change
        gsap.set(content, { rotationY: 90 });
      }
    })
      .to(content, {
        duration: 0.8,
        rotationY: 0,
        transformOrigin: "left center",
        ease: "power2.out"
      });
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] overflow-x-hidden flex justify-center md:pr-16 md:pl-16">

      {/* Styles Injection */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;0,700;1,300&display=swap');
        
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'DM Mono', monospace; }

        .page-perspective {
          perspective: 2500px;
        }
        .page-content {
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background-color: #1a1a1a;
          /* Removed box-shadow for flat look */
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll linear infinite;
        }
        
        .direction-reverse {
          animation-direction: reverse;
        }

        .mask-linear-fade {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>

      <MobileNavigation activePage={activePage} onNavigate={handlePageChange} />

      {/* --- Main Content Container --- */}
      <div ref={containerRef} className="relative w-full max-w-[1600px] min-h-screen border-x border-current page-perspective px-4 md:px-12 flex flex-col pt-12 md:pt-0 md:pb-0 md:border-l md:border-current">

        {/* --- Desktop Bookmark Navigation (Side) --- */}
        <div className="absolute top-[150px] -right-[1px] z-50 hidden md:flex flex-col items-end pointer-events-none translate-x-full">
          {['Front Page', 'Projects', 'Blogs', 'Contact'].map((item) => {
            const id = item.toLowerCase().replace(' ', '');
            const targetPage = id === 'frontpage' ? 'front' : id;
            if (activePage === targetPage) return null;

            return (
              <button
                key={item}
                onClick={() => handlePageChange(targetPage)}
                className={`
                  pointer-events-auto relative pl-6 pr-3 py-4
                  font-mono text-xs font-black uppercase tracking-widest 
                  transition-all duration-300 transform origin-left
                  bg-red-700 text-white hover:bg-red-800 hover:translate-x-1 z-10
                  border-y border-r border-red-900/30 rounded-r-sm shadow-xl
                `}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  marginTop: '-10px',
                  boxShadow: '-4px 0 10px rgba(0,0,0,0.5)'
                }}
              >
                {item}
              </button>
            )
          })}
        </div>



        {/* --- DYNAMIC PAGE CONTENT --- */}
        {/* Removed border-x from here since it's on the parent now */}
        {/* Added flex-grow to ensure it fills height */}
        <main ref={contentRef} className="flex-grow bg-[#1a1a1a] page-content origin-left p-6 md:p-12 relative flex flex-col">

          {/* FRONT PAGE VIEW */}
          {activePage === 'front' && (
            <div className="flex flex-col h-full">
              {/* Front Page Header */}
              <header className="mb-8 border-b-4 border-current pb-2 flex-shrink-0">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col w-full">
                    <div className="py-4 mb-2">
                      <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-1 opacity-100">
                        Hi, I'm
                      </span>
                      <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter leading-none uppercase">
                        <span className="text-red-600">Sanjay</span> Kuppusamy Saravanan
                      </h1>
                    </div>
                    <span className="font-mono text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-1 opacity-100">
                      Machine Learning Engineer & AI Researcher
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between border-t-2 border-current pt-2 font-mono text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-6">
                    <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()} • CHENNAI, IN</span>
                  </div>
                  <div className="flex items-center gap-6 hidden md:flex">
                    <span className="flex items-center gap-2">
                      GPU Cluster: Online
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    </span>
                    <span>•</span>
                    <span>Running on Local compute</span>
                  </div>
                </div>
              </header>

              {/* Grid with full height columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-current flex-grow items-stretch">
                {/* LEFT COLUMN */}
                <aside className="col-span-1 md:col-span-3 border-b md:border-b-0 md:border-r border-current p-6 flex flex-col min-h-full justify-between">
                  <div className="space-y-4">
                    <div className={`aspect-[4/5] w-full bg-zinc-800 relative overflow-hidden group`}>
                      <img
                        src="/profile.png"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-2 font-mono text-xs text-center translate-y-full group-hover:translate-y-0 transition-transform">
                        OPEN FOR COLLABORATION
                      </div>
                    </div>
                    <div className="font-serif italic text-lg leading-snug">
                      Hi there, this is what I look like.
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-8">
                    <h4 className="font-mono text-xs font-bold uppercase mb-6 text-red-600">Current Research</h4>
                    <div className={`p-4 bg-zinc-800/50`}>
                      <h5 className="font-bold mb-1">Probabilistic Match Inference Engine</h5>
                      <div className="w-full bg-zinc-700 h-1 mt-3 relative">
                        <div className="h-full bg-red-600 w-1/4 relative shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
                        </div>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] mt-1 opacity-60">
                        <span>Training</span>
                        <span>Epoch 25/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-8">
                    <h4 className="font-mono text-sm font-bold uppercase mb-6">Connect</h4>
                    <div className="flex flex-col gap-4">
                      <SocialLink href="https://github.com/sanjay-ks23" icon={Github} label="Github" size={20} textSize="text-sm" />
                      <SocialLink href="https://x.com/Sanj_AI_space" icon={Twitter} label="Twitter" size={20} textSize="text-sm" />
                      <SocialLink href="https://www.linkedin.com/in/sanjayks2317/" icon={Linkedin} label="LinkedIn" size={20} textSize="text-sm" />
                      <SocialLink href="mailto:sanjaysaravanan2317@gmail.com" icon={Mail} label="Email" size={20} textSize="text-sm" />
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-8">
                    <h4 className="font-mono text-sm font-bold uppercase mb-6">Hobbies</h4>
                    <div className="flex flex-col gap-3 font-mono text-base">
                      {["Swimming", "Sketching/Drawing", "Singing", "Blogging", "Football", "Keeping up with ML landscape"].map((hobby) => (
                        <div key={hobby} className="flex items-center gap-3 opacity-100 hover:text-red-600 transition-colors cursor-default">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                          {hobby}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-8">
                    <h4 className="font-mono text-sm font-bold uppercase mb-6">Languages</h4>
                    <div className="space-y-4 font-mono text-base">
                      <div className="flex items-center justify-between">
                        <span>English</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-red-600 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Tamil</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-red-600 rounded-full"></div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between opacity-60">
                        <span>German</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                          {[...Array(4)].map((_, i) => (
                            <div key={i} className="w-2 h-2 border border-current rounded-full"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </aside>

                {/* CENTER COLUMN */}
                <section className="col-span-1 md:col-span-6 p-6 md:px-8 border-b md:border-b-0 md:border-r border-current relative min-h-full flex flex-col">
                  <Badge>Lead Story</Badge>

                  <h2 className="font-serif text-5xl md:text-7xl font-bold mt-4 mb-2 leading-[0.9] tracking-tight w-full">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Professional</span> Journey
                  </h2>

                  <div className="font-mono text-sm md:text-base leading-relaxed text-justify opacity-90 columns-1 md:columns-2 gap-6 space-y-4">
                    <p className="font-serif text-base md:text-lg leading-relaxed text-justify font-medium text-gray-300 break-inside-avoid">
                      I am an <span className="font-bold text-red-500">AI/ML Engineer</span> focused on building systems that operate in the real world—where data is messy, constraints are real, and decisions have tangible consequences. My work sits at the intersection of machine learning, energy systems, and software engineering, with a strong emphasis on turning theoretical ideas into tools that meaningfully reduce friction in complex domains.
                    </p>
                    <p className="font-serif text-base md:text-lg leading-relaxed text-justify font-medium text-gray-300 mt-4 break-inside-avoid">
                      Over time, I’ve gravitated toward problems where correctness, uncertainty, and scale matter more than demos or benchmarks. This has led me to work on energy forecasting, industrial data pipelines, and decision-support systems, including applied research in wind energy forecasting and ongoing work on Energy Management Systems within early-stage climate and energy startups. These experiences shaped how I think about ML: not as isolated models, but as components within larger systems that must be reliable, interpretable, and deployable.
                    </p>
                    <p className="font-serif text-base md:text-lg leading-relaxed text-justify font-medium text-gray-300 mt-4 break-inside-avoid">
                      Alongside this, I explore modern AI system design—<span className="font-bold text-white">agentic architectures</span>, <span className="font-bold text-white">retrieval-augmented generation</span>, and structured knowledge systems—not as trends, but as tools for reasoning over complex information. I’m particularly interested in how these approaches can be used responsibly to support high-stakes decision-making rather than replace it.
                    </p>
                    <p className="font-serif text-base md:text-lg leading-relaxed text-justify font-medium text-gray-300 mt-4 break-inside-avoid">
                      What drives me is the opportunity to work on problems that compound in impact: decarbonization, infrastructure, and systems that enable better decisions at scale. I thrive in environments with ambiguity, where ownership matters and progress depends on thoughtful engineering rather than perfect specifications. My goal is simple: to build technology that is rigorous, grounded, and genuinely useful—technology that helps move difficult problems forward rather than adding complexity for its own sake.
                    </p>
                  </div>

                  <div className="mt-6 pt-6 border-t border-current">
                    {/* Education Section */}
                    <div className="mb-8">
                      <SectionTitle>Education</SectionTitle>
                      <div className="space-y-6 relative border-l border-current ml-1 pl-6 py-2">
                        {[
                          { degree: "B.Tech Computer Science Engineering with specialization in Artificial Intelligence and Machine Learning", institution: "Vellore Institute of Technology", year: "2020 - 2024", grade: "8.88" },
                          { degree: "Senior Secondary (Computer Science)", institution: "Maharishi Vidya Mandir", year: "2019 - 2020", grade: "90.6%" }
                        ].map((edu, i) => (
                          <div key={i} className="relative">
                            <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-[#1a1a1a]" />
                            <h3 className="font-serif text-xl font-bold leading-none mb-1">{edu.degree}</h3>
                            <div className="font-mono text-sm font-medium mb-2 text-gray-400">
                              {edu.institution} • {edu.year}
                            </div>
                            <div className="font-mono text-base font-bold text-red-500">
                              {edu.degree.includes("Senior Secondary") ? "Percentage" : "CGPA"}: {edu.grade}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Career Timeline (Moved from Right) */}
                    <div className="mb-8">
                      <SectionTitle>
                        Career Timeline
                        <span className="font-mono text-[10px] font-normal opacity-75 ml-3 normal-case tracking-normal">(click for details)</span>
                      </SectionTitle>
                      <div className="relative border-l border-current ml-1 space-y-8 pl-6 py-2">
                        {EXPERIENCE.map((exp, i) => (
                          <div key={i} className="relative group cursor-pointer" onClick={() => setSelectedExperience(exp)}>
                            <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-[#1a1a1a]" />
                            <h3 className="font-serif text-xl font-bold leading-none mb-1 group-hover:text-red-600 transition-colors">{exp.role}</h3>
                            <div className="font-mono text-sm font-bold uppercase tracking-wider text-red-600 mb-2">{exp.company}</div>
                            <div className="font-mono text-sm font-medium mb-4 text-gray-400">
                              {exp.period} • {exp.location}
                            </div>
                            <p className="font-serif text-base leading-relaxed font-medium text-gray-300">
                              {exp.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Publications (Moved from Right) */}
                    <div>
                      <SectionTitle>
                        Publications
                        <span className="font-mono text-[10px] font-normal opacity-75 ml-3 normal-case tracking-normal">(click for details)</span>
                      </SectionTitle>
                      <div className="relative border-l border-current ml-1 space-y-6 pl-6 py-2">
                        {PUBLICATIONS.map((pub, i) => (
                          <div key={i} className="relative group cursor-pointer" onClick={() => setSelectedPublication(pub)}>
                            <div className="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-600 border-2 border-[#1a1a1a]" />
                            <h3 className="font-serif text-xl font-bold leading-tight mb-1 group-hover:text-red-600 transition-colors">
                              {pub.title}
                            </h3>
                            <div className="font-mono text-sm font-medium text-gray-400">
                              {pub.publisher} • {pub.date}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* RIGHT COLUMN */}
                <aside className="col-span-1 md:col-span-3 p-6 flex flex-col min-h-full justify-between">
                  {/* Open Science Community (Moved from Center) */}
                  <div>
                    <SectionTitle>Open Science Community</SectionTitle>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold text-lg leading-none mb-1">Cohere Labs Open Science Community</h4>
                        <div className="font-serif italic text-sm opacity-80 mb-1">Community Member</div>
                        <div className="font-mono text-xs opacity-70 mb-2">Jun 2025 - Present</div>
                        <p className="font-mono text-xs opacity-70 leading-relaxed text-justify">
                          Selected as a member of the Cohere Labs Open Science Community, a global collective of researchers advancing LLM interpretability. Completed the intensive ML Summer School and participated in the 2025 Cohere Connect Conference, exchanging insights on agentic workflows with industry pioneers.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12">
                    <SectionTitle>Verified Credentials</SectionTitle>
                    <div className="flex flex-col">
                      {CREDENTIALS.map((cred, i) => (
                        <div key={i} className="border-b border-gray-800 py-3 last:border-0">
                          <a
                            href={cred.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                          >
                            <h3 className="font-serif text-base font-bold leading-tight mb-1 group-hover:text-red-600 transition-colors">
                              {cred.title}
                            </h3>
                            <div className="font-mono text-xs font-medium text-gray-300">
                              {cred.issuer} • {cred.date}
                            </div>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>



                  {/* Tech Stack (Moved from Center) */}
                  <div className="mt-6">
                    <SectionTitle>Tech Stack</SectionTitle>
                    <div className="space-y-3">
                      {Object.entries(TECH_STACK_DATA).map(([category, data], index) => (
                        <div key={category} className="border-b border-dashed border-current/30 pb-4 last:border-0">
                          <h4 className="font-bold text-xs uppercase text-red-600 mb-2 tracking-wider">{category}</h4>

                          {data.type === "text" ? (
                            <div className="flex flex-wrap gap-x-4 gap-y-1">
                              {data.items.map(item => (
                                <span key={item} className="font-mono text-xs opacity-70 relative pl-3 before:content-['•'] before:absolute before:left-0 before:opacity-50">
                                  {item}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <TechTicker
                              items={data.items}
                              direction={index % 2 === 0 ? "left" : "right"}
                              speed={25 + (index * 2)}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

          <ExperienceModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
          <PublicationModal publication={selectedPublication} onClose={() => setSelectedPublication(null)} />

          {/* PROJECTS PAGE VIEW */}
          {activePage === 'projects' && (
            <div className="max-w-5xl mx-auto w-full flex-grow">
              <header className="mb-12 border-b border-current pb-6 flex justify-between items-end">
                <div>
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">Section B</span>
                  <h2 className="font-serif text-6xl md:text-8xl font-bold uppercase tracking-tighter">
                    The Archives
                  </h2>
                </div>
                <span className="font-mono text-sm hidden md:block">Selected Works 2021-2025</span>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="col-span-1 md:col-span-8 grid grid-cols-1 gap-16">
                  {githubProjects.length > 0 ? (
                    githubProjects.map((project) => (
                      <article key={project.id} className="group relative">
                        <div className="mb-4 overflow-hidden border border-current relative aspect-video">
                          <div className="absolute inset-0 bg-current opacity-5 group-hover:opacity-10 transition-opacity" />
                          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 font-mono text-[10px] uppercase">
                            {project.language || 'Code'}
                          </div>
                          <div className="absolute bottom-2 left-2 font-mono text-xs bg-[#1a1a1a] px-1 border border-current">
                            {new Date(project.updated_at).getFullYear()}
                          </div>
                        </div>

                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-3xl font-bold mb-2 group-hover:underline decoration-red-600 decoration-2 underline-offset-4">
                            {project.name}
                          </h3>
                          <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-red-600" />
                          </a>
                        </div>

                        <p className="font-mono text-xs md:text-sm opacity-70 mb-4 leading-relaxed border-l-2 border-red-600 pl-3">
                          {project.description || 'No description available.'}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.topics && project.topics.map(topic => (
                            <span key={topic} className="text-[10px] font-mono border border-current/30 px-1.5 py-0.5 opacity-60">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </article>
                    ))
                  ) : (
                    <div className="font-mono text-sm opacity-60">Loading Archives...</div>
                  )}
                </div>

                {/* Github Contributions Sidebar */}
                <aside className="col-span-1 md:col-span-4 space-y-8">
                  <div className="border border-current p-6">
                    {githubProfile ? (
                      <a
                        href={githubProfile.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between mb-4 group cursor-pointer"
                      >
                        <span className="font-mono text-xs font-bold uppercase group-hover:text-red-600 transition-colors">Contributor Profile</span>
                        <Github size={16} className="group-hover:text-red-600 transition-colors" />
                      </a>
                    ) : (
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold uppercase">Contributor Profile</span>
                        <Github size={16} />
                      </div>
                    )}

                    {githubProfile ? (
                      <>
                        <div className="flex items-center gap-4 mb-6">
                          <div className="relative w-16 h-16 rounded-full border-2 border-current overflow-hidden group/image">
                            <img
                              src={githubProfile.avatar_url}
                              alt="Profile"
                              className="w-full h-full object-cover grayscale group-hover/image:grayscale-0 transition-all duration-300"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-lg leading-none">{githubProfile.name || githubProfile.login}</h4>
                            <a
                              href={githubProfile.html_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-xs opacity-60 hover:text-red-600"
                            >
                              @{githubProfile.login}
                            </a>
                          </div>
                        </div>

                        <p className="font-mono text-xs opacity-70 mb-4 leading-relaxed">
                          {githubProfile.bio || 'Building things on the internet.'}
                        </p>

                        <div className="grid grid-cols-2 gap-4 border-t border-dashed border-current pt-4">
                          <div>
                            <span className="block font-mono text-[10px] opacity-60 uppercase">Repositories</span>
                            <span className="font-serif text-2xl font-bold">{githubProfile.public_repos}</span>
                          </div>
                          <div>
                            <span className="block font-mono text-[10px] opacity-60 uppercase">Followers</span>
                            <span className="font-serif text-2xl font-bold">{githubProfile.followers}</span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-dashed border-current flex justify-between font-mono text-[10px] opacity-60">
                          <span>Active Status</span>
                          <span className="text-green-300 flex items-center gap-2 font-bold tracking-wide text-xs">
                            <span className="relative flex h-2.5 w-2.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-100" style={{ animationDuration: '1.2s' }}></span>
                              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></span>
                            </span>
                            ONLINE
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="font-mono text-xs opacity-60">Loading Profile...</div>
                    )}
                  </div>


                </aside>
              </div>
            </div>
          )}

          {/* BLOGS PAGE VIEW */}
          {/* BLOGS PAGE VIEW */}
          {activePage === 'blogs' && (
            <div className="max-w-4xl mx-auto w-full flex-grow">
              {!selectedBlogId ? (
                // LIST VIEW
                <>
                  <header className="mb-12 border-b border-current pb-6 flex justify-between items-end">
                    <div>
                      <span className="font-mono text-xs uppercase tracking-widest opacity-60">Section C</span>
                      <h2 className="font-serif text-6xl md:text-8xl font-bold uppercase tracking-tighter">
                        The Editorial
                      </h2>
                    </div>
                    <span className="font-mono text-sm hidden md:block">Thoughts & Theory</span>
                  </header>

                  <div className="space-y-12">
                    {blogs.map((blog) => (
                      <article
                        key={blog.id}
                        onClick={() => handleBlogClick(blog.id)}
                        className="border-b border-dashed border-current pb-8 group cursor-pointer"
                      >
                        <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                          <h3 className="font-serif text-4xl font-bold group-hover:text-red-600 transition-colors">
                            {blog.title}
                          </h3>
                          <div className="flex items-center gap-4 font-mono text-xs opacity-60 whitespace-nowrap">
                            <span>{blog.date}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                          </div>
                        </div>
                        <p className="font-mono text-sm opacity-80 leading-relaxed max-w-2xl">
                          {blog.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-red-600 font-mono text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                          <span>Read Article</span>
                          <ArrowUpRight size={12} />
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              ) : (
                // ARTICLE VIEW
                (() => {
                  const blog = blogs.find(b => b.id === selectedBlogId);
                  return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                      {/* Navigation Bar */}
                      <div className="flex justify-between items-center mb-12 border-b border-current pb-4">
                        <button
                          onClick={handleBackToBlogs}
                          className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest hover:text-red-600 transition-colors group"
                        >
                          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                          Back to Editorial
                        </button>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={handlePrevBlog}
                            className="p-2 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                            title="Previous Article"
                          >
                            <ChevronLeft size={32} strokeWidth={3} />
                          </button>
                          <button
                            onClick={handleNextBlog}
                            className="p-2 hover:text-red-600 transition-all duration-300 transform hover:scale-110"
                            title="Next Article"
                          >
                            <ChevronRight size={32} strokeWidth={3} />
                          </button>
                        </div>
                      </div>

                      {/* Article Header */}
                      <header className="mb-12">
                        <div className="flex items-center gap-4 font-mono text-xs text-red-600 uppercase tracking-widest mb-4">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8">
                          {blog.title}
                        </h1>
                      </header>

                      {/* Article Content */}
                      <div className="prose prose-invert prose-lg max-w-none font-mono text-sm md:text-base leading-loose opacity-90 space-y-6 text-justify">
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            p: ({ node, ...props }) => <p className="mb-6" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="font-serif text-3xl font-bold mt-8 mb-4" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="font-serif text-2xl font-bold mt-8 mb-4" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="font-serif text-xl font-bold mt-6 mb-3" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-6 space-y-2" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-6 space-y-2" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-red-600 pl-4 italic my-6 opacity-80" {...props} />,
                            code: ({ node, inline, className, children, ...props }) => {
                              return inline ? (
                                <code className="bg-zinc-800 px-1 py-0.5 rounded text-red-400 font-mono text-xs" {...props}>
                                  {children}
                                </code>
                              ) : (
                                <code className="block bg-zinc-900 p-4 rounded-lg overflow-x-auto text-xs font-mono my-6 border border-zinc-800" {...props}>
                                  {children}
                                </code>
                              );
                            },
                            img: ({ node, ...props }) => (
                              <div className="my-8 border border-zinc-800 p-2 bg-zinc-900/50">
                                <img {...props} className="w-full h-auto" alt={props.alt || 'Blog Image'} />
                                {props.alt && <p className="text-center text-xs text-zinc-500 mt-2 font-mono">{props.alt}</p>}
                              </div>
                            )
                          }}
                        >
                          {blog.content}
                        </ReactMarkdown>
                      </div>

                      {/* Article Footer */}
                      <div className="mt-16 pt-8 border-t border-dashed border-current flex justify-between items-center opacity-60 font-mono text-xs">
                        <span>End of Article</span>
                        <div className="flex gap-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                          <span>Live from the Neural Realm</span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}
            </div>
          )}

          {/* CONTACT VIEW */}
          {activePage === 'contact' && (
            <div className="flex flex-col h-full justify-center items-center text-center scale-90 origin-top md:scale-100">
              <div className="border-4 border-double border-current p-8 md:p-12 max-w-2xl w-full relative">
                {/* Corner Decorations */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current -mt-1 -ml-1"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current -mt-1 -mr-1"></div>
                <header className="mb-8">
                  <span className="font-mono text-xs uppercase tracking-widest opacity-60">Section D</span>
                  <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">The Signal</h2>
                </header>

                <p className="font-serif text-xl md:text-2xl italic leading-relaxed mb-12 max-w-2xl mx-auto">
                  "Available for Machine Learning engineering roles and specialized freelance consulting. Open to research collaborations and contributing to the open-source ecosystem."
                </p>

                <a
                  href="mailto:sanjaysaravanan2317@gmail.com"
                  className="inline-block bg-red-600 text-white font-mono text-lg px-8 py-4 uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_currentColor]"
                >
                  Send Email
                </a>

                <div className="mt-12 pt-8 border-t border-dashed border-current flex justify-center gap-8 flex-wrap">
                  <a href="https://x.com/Sanj_AI_space" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:text-red-600 transition-colors duration-200">
                    <Twitter size={30} />
                    <span className="font-mono text-sm uppercase tracking-wider group-hover:underline decoration-red-600 underline-offset-4">Twitter / X</span>
                  </a>
                  <a href="https://www.linkedin.com/in/sanjayks2317/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:text-red-600 transition-colors duration-200">
                    <Linkedin size={30} />
                    <span className="font-mono text-sm uppercase tracking-wider group-hover:underline decoration-red-600 underline-offset-4">LinkedIn</span>
                  </a>
                  <a href="https://github.com/sanjay-ks23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group hover:text-red-600 transition-colors duration-200">
                    <Github size={30} />
                    <span className="font-mono text-sm uppercase tracking-wider group-hover:underline decoration-red-600 underline-offset-4">Github</span>
                  </a>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer className="mt-auto pt-4 flex justify-between items-center font-mono text-[10px] uppercase tracking-wider opacity-60 px-2 pb-2">
          <div>
            &copy; 2025 Sanjay Codes.
          </div>
          <div className="flex items-center gap-2">
            <span>End of Stream</span>
            <span>•</span>
            <span>Vol. 02</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
