import React, { useState, useEffect, useRef } from 'react';
import {
  Sun, Moon, ArrowUpRight, Github, Twitter, Linkedin,
  Mail, MapPin, Calendar, Layers, Cpu, Code, ExternalLink,
  Brain, Database, Network, Terminal, BookOpen, PenTool, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight
} from 'lucide-react';
import EmailComposer from './components/EmailComposer';
import gsap from 'gsap';
import { BLOGS } from './data/blogs';

// --- Styled Components & Icons Helpers ---

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 group hover:text-red-600 transition-colors duration-200"
  >
    <Icon size={16} />
    <span className="font-mono text-xs uppercase tracking-wider group-hover:underline decoration-red-600 underline-offset-4">
      {label}
    </span>
  </a>
);

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



const STACK = [
  "Python / PyTorch", "TensorFlow / Keras", "Scikit-learn", "OpenCV",
  "Docker / Kubernetes", "AWS SageMaker", "FastAPI / Flask", "React / Next.js"
];

const EXPERIENCE = [
  {
    role: "Machine Learning Engineer",
    company: "DataMinds AI",
    period: "2023 - Present",
    desc: "Architecting scalable LLM inference engines and optimizing model latency by 60%."
  },
  {
    role: "AI Researcher",
    company: "Neural Labs",
    period: "2021 - 2023",
    desc: "Published research on transformer interpretability and deployed CV models to production."
  }
];

// --- Main Application ---

export default function App() {
  const [activePage, setActivePage] = useState('front'); // 'front', 'projects', 'blogs', 'contact'
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  // Enforce Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, ''); // Strip HTML tags
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
    const currentIndex = BLOGS.findIndex(b => b.id === selectedBlogId);
    const nextIndex = (currentIndex + 1) % BLOGS.length;
    setSelectedBlogId(BLOGS[nextIndex].id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevBlog = () => {
    if (!selectedBlogId) return;
    const currentIndex = BLOGS.findIndex(b => b.id === selectedBlogId);
    const prevIndex = (currentIndex - 1 + BLOGS.length) % BLOGS.length;
    setSelectedBlogId(BLOGS[prevIndex].id);
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
    <div className="min-h-screen bg-[#1a1a1a] text-[#e5e5e5] overflow-x-hidden flex justify-center">

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
      `}</style>

      {/* --- Main Content Container --- */}
      {/* Added border-x here to span full height of the page */}
      <div ref={containerRef} className="relative w-full max-w-[1600px] min-h-screen border-x border-current page-perspective px-4 md:px-12 flex flex-col">

        {/* --- Bookmark Navigation (Attached to Content, Outwards) --- */}
        <div className="absolute top-[150px] -right-[1px] z-50 flex flex-col items-end pointer-events-none translate-x-full">
          {['Front Page', 'Projects', 'Blogs', 'Contact'].map((item, idx) => {
            const id = item.toLowerCase().replace(' ', '');
            const targetPage = id === 'frontpage' ? 'front' : id;
            const isActive = activePage === targetPage;

            // Hide active bookmark
            if (isActive) return null;

            return (
              <button
                key={item}
                onClick={() => handlePageChange(targetPage)}
                className={`
                  pointer-events-auto
                  relative pl-6 pr-3 py-4
                  font-mono text-xs font-black uppercase tracking-widest 
                  transition-all duration-300 transform origin-left
                  bg-red-700 text-white hover:bg-red-800 hover:translate-x-1 z-10
                  border-y border-r border-red-900/30
                  rounded-r-sm shadow-xl
                `}
                style={{
                  writingMode: 'vertical-rl',
                  textOrientation: 'mixed',
                  marginTop: '-10px', // Overlap effect
                  marginRight: '0px', // Touch the line (handled by parent positioning)
                  boxShadow: '-4px 0 10px rgba(0,0,0,0.5)' // Shadow at intersection
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
                  <div className="flex flex-col">
                    <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-1 opacity-70">
                      Machine Learning Engineer & AI Researcher
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                      The Sanjay <br className="md:hidden" /> Chronicle
                    </h1>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between border-t-2 border-current pt-2 font-mono text-xs uppercase tracking-wider">
                  <div className="flex items-center gap-6">
                    <span>Vol. 02</span>
                    <span>•</span>
                    <span>Issue 2025</span>
                    <span>•</span>
                    <span className="flex items-center gap-2">
                      <MapPin size={12} /> Chennai, IN
                    </span>
                  </div>
                  <div className="flex items-center gap-6 hidden md:flex">
                    <span>GPU Cluster: Online</span>
                    <span>•</span>
                    <span>Printed in the Neural Realm</span>
                  </div>
                </div>
              </header>

              {/* Grid with full height columns */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-0 border-t border-current flex-grow items-stretch">
                {/* LEFT COLUMN */}
                <aside className="col-span-1 md:col-span-3 border-b md:border-b-0 md:border-r border-current p-6 flex flex-col gap-8 min-h-full">
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
                      "Training models to understand the world, one epoch at a time."
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-6">
                    <h4 className="font-mono text-xs font-bold uppercase mb-4 text-red-600">Current Research</h4>
                    <div className={`p-4 bg-zinc-800/50`}>
                      <h5 className="font-bold mb-1">Project: Neural-Sync</h5>
                      <p className="font-mono text-xs opacity-80 leading-relaxed">
                        Investigating multi-modal alignment in large-scale foundation models.
                      </p>
                      <div className="w-full bg-current h-1 mt-3 opacity-20 overflow-hidden">
                        <div className="h-full bg-red-600 w-3/4" />
                      </div>
                      <div className="flex justify-between font-mono text-[10px] mt-1 opacity-60">
                        <span>Training</span>
                        <span>Epoch 45/100</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-dashed border-current pt-6 mt-auto">
                    <h4 className="font-mono text-xs font-bold uppercase mb-4">Connect</h4>
                    <div className="flex flex-col gap-2">
                      <SocialLink href="#" icon={Github} label="Github" />
                      <SocialLink href="#" icon={Twitter} label="Twitter" />
                      <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                      <SocialLink href="#" icon={Mail} label="Email" />
                    </div>
                  </div>
                </aside>

                {/* CENTER COLUMN */}
                <section className="col-span-1 md:col-span-6 p-6 md:px-8 border-b md:border-b-0 md:border-r border-current relative min-h-full flex flex-col">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Network size={120} />
                  </div>

                  <Badge>Lead Story</Badge>

                  <h2 className="font-serif text-5xl md:text-7xl font-bold mt-6 mb-6 leading-[0.9] tracking-tight">
                    Architecting <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Intelligence</span> <br />
                    From Noise.
                  </h2>

                  <div className="font-mono text-xs md:text-sm leading-relaxed text-justify opacity-90 columns-1 md:columns-2 gap-6 space-y-4">
                    <p>
                      <span className="text-4xl float-left mr-2 font-serif font-bold leading-none mt-[-4px]">W</span>
                      e live in an age of data abundance but insight scarcity. My mission is to bridge that gap using state-of-the-art machine learning. I don't just build models; I engineer systems that can reason, perceive, and adapt.
                    </p>
                    <p>
                      With deep expertise in Computer Vision and NLP, I specialize in deploying robust AI solutions that solve real-world problems. From optimizing inference latency on edge devices to fine-tuning massive LLMs, I navigate the full stack of modern AI.
                    </p>
                    <p>
                      Currently obsessed with the intersection of neuro-symbolic AI and efficient transformer architectures.
                    </p>
                  </div>

                  <div className="mt-auto pt-8 border-t border-current">
                    <SectionTitle>Latest Deployment</SectionTitle>
                    <div className="group cursor-pointer">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-2xl font-bold group-hover:text-red-600 transition-colors">Neuro-Vision Pipeline</h4>
                        <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                      <p className="font-mono text-sm opacity-70 mb-4 max-w-md">
                        End-to-end object detection pipeline optimized for edge devices using quantized YOLOv8 models.
                      </p>
                      <div className="w-full h-48 bg-current opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center border border-dashed border-current">
                        <span className="font-mono text-xs">System Architecture Diagram</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* RIGHT COLUMN */}
                <aside className="col-span-1 md:col-span-3 p-6 flex flex-col gap-8 min-h-full">
                  <div>
                    <SectionTitle>Tech Stack</SectionTitle>
                    <ul className="grid grid-cols-1 gap-2">
                      {STACK.map(tech => (
                        <li key={tech} className="flex items-center gap-2 font-mono text-xs border-b border-dashed border-current/30 pb-2">
                          <div className="w-1.5 h-1.5 bg-red-600" />
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <SectionTitle>Career Timeline</SectionTitle>
                    <div className="relative border-l border-current ml-1 space-y-8 pl-6 py-2">
                      {EXPERIENCE.map((exp, i) => (
                        <div key={i} className="relative">
                          <div className="absolute -left-[29px] top-1.5 w-3 h-3 bg-red-600 rounded-full border-2 border-[var(--bg-paper)]" />
                          <span className="font-mono text-[10px] opacity-60 block mb-1">{exp.period}</span>
                          <h5 className="font-bold leading-tight">{exp.role}</h5>
                          <div className="font-serif italic text-sm opacity-80 mb-1">{exp.company}</div>
                          <p className="font-mono text-[10px] opacity-70 leading-relaxed">{exp.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}

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
                  {PROJECTS.map((project, i) => (
                    <article key={project.id} className="group relative">
                      <div className="mb-4 overflow-hidden border border-current relative aspect-video">
                        <div className="absolute inset-0 bg-current opacity-5 group-hover:opacity-10 transition-opacity" />
                        <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 font-mono text-[10px] uppercase">
                          {project.category}
                        </div>
                        <div className="absolute bottom-2 left-2 font-mono text-xs bg-[#1a1a1a] px-1 border border-current">
                          {project.year}
                        </div>
                      </div>

                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-3xl font-bold mb-2 group-hover:underline decoration-red-600 decoration-2 underline-offset-4">
                          {project.title}
                        </h3>
                        <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      <p className="font-mono text-xs md:text-sm opacity-70 mb-4 leading-relaxed border-l-2 border-red-600 pl-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.stack.map(tech => (
                          <span key={tech} className="text-[10px] font-mono border border-current/30 px-1.5 py-0.5 opacity-60">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>

                {/* Github Contributions Moved Here */}
                <aside className="col-span-1 md:col-span-4 space-y-8">
                  <div className="border border-current p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold uppercase">Open Source</span>
                      <Github size={16} />
                    </div>
                    <p className="font-mono text-xs opacity-70 mb-4">
                      Active contributor to PyTorch ecosystem and various LLM inference libraries.
                    </p>
                    <div className="flex gap-1 flex-wrap">
                      {[...Array(60)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 ${Math.random() > 0.3 ? 'bg-red-600' : 'bg-current opacity-20'}`}
                        />
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-dashed border-current flex justify-between font-mono text-[10px] opacity-60">
                      <span>1,243 Contributions</span>
                      <span>2024</span>
                    </div>
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
                    {BLOGS.map((blog) => (
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
                            <span>{calculateReadTime(blog.content)}</span>
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
                  const blog = BLOGS.find(b => b.id === selectedBlogId);
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
                          <span>{calculateReadTime(blog.content)}</span>
                        </div>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-8">
                          {blog.title}
                        </h1>
                      </header>

                      {/* Article Content */}
                      <div
                        className="prose prose-invert prose-lg max-w-none font-mono text-sm md:text-base leading-loose opacity-90 space-y-6 text-justify"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                      />

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

          {/* CONTACT PAGE VIEW */}
          {activePage === 'contact' && (
            <div className="flex items-center justify-center h-full flex-grow">
              <div className="max-w-2xl w-full border-4 border-double border-current p-8 md:p-12 text-center bg-current/5">
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
