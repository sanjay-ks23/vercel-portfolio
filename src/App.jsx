import React, { useState, useEffect } from 'react';
import {
  Sun, Moon, ArrowUpRight, Github, Twitter, Linkedin,
  Mail, MapPin, Calendar, Layers, Cpu, Code, ExternalLink
} from 'lucide-react';

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
    title: "Vantage UI Kit",
    category: "Design System",
    description: "A comprehensive React component library focusing on accessibility and brutalist aesthetics.",
    stack: ["React", "TypeScript", "Tailwind", "Storybook"],
    link: "#",
    year: "2024"
  },
  {
    id: 2,
    title: "Neural Notes",
    category: "AI Productivity",
    description: "Voice-to-text semantic analysis tool that categorizes thoughts into actionable items.",
    stack: ["OpenAI API", "Next.js", "PostgreSQL", "Python"],
    link: "#",
    year: "2023"
  },
  {
    id: 3,
    title: "Ether Markets",
    category: "Web3 Finance",
    description: "Decentralized prediction market aggregator with real-time settlement.",
    stack: ["Solidity", "Ethers.js", "React", "Graph Protocol"],
    link: "#",
    year: "2023"
  }
];

const STACK = [
  "React / Next.js", "TypeScript", "Tailwind CSS", "Node.js",
  "PostgreSQL", "GraphQL", "AWS / Docker", "Figma"
];

const EXPERIENCE = [
  {
    role: "Senior Frontend Engineer",
    company: "TechDaily Inc.",
    period: "2022 - Present",
    desc: "Leading the core product team, improving TTI by 40%."
  },
  {
    role: "Full Stack Developer",
    company: "Creative Studio",
    period: "2020 - 2022",
    desc: "Shipped 15+ client projects including award-winning e-commerce sites."
  }
];

// --- Main Application ---

export default function App() {
  // Enforce Dark Mode
  const darkMode = true;
  const [activePage, setActivePage] = useState('front'); // 'front', 'projects', 'contact'
  const [isFlipping, setIsFlipping] = useState(false);

  // Toggle Dark Mode - REMOVED TOGGLE LOGIC, ALWAYS DARK
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handlePageChange = (page) => {
    if (page === activePage) return;
    setIsFlipping(true);
    setTimeout(() => {
      setActivePage(page);
      setIsFlipping(false);
    }, 600); // Match CSS transition duration
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 overflow-x-hidden
      bg-[#1a1a1a] text-[#e5e5e5]`}>

      {/* Styles Injection for Fonts & Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        
        .font-serif { font-family: 'Instrument Serif', serif; }
        .font-mono { font-family: 'DM Mono', monospace; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #404040; }
        ::-webkit-scrollbar-thumb:hover { background: #ef4444; }

        /* Page Flip Animation Classes */
        .page-perspective {
          perspective: 2000px;
        }
        .page-content {
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-origin: left center;
        }
        .flipping-out {
          transform: rotateY(-100deg);
          opacity: 0;
        }
        .flipping-in {
          animation: flipIn 0.8s cubic-bezier(0.645, 0.045, 0.355, 1) forwards;
        }

        @keyframes flipIn {
          from { transform: rotateY(90deg); opacity: 0; }
          to { transform: rotateY(0deg); opacity: 1; }
        }

        /* Newspaper Grid Lines */
        .grid-line-x { background-image: linear-gradient(to right, currentColor 50%, transparent 50%); background-size: 8px 1px; background-repeat: repeat-x; }
        .grid-line-y { background-image: linear-gradient(to bottom, currentColor 50%, transparent 50%); background-size: 1px 8px; background-repeat: repeat-y; }
      `}</style>

      {/* --- Bookmark Navigation (Fixed Right) --- */}
      <div className="fixed right-0 top-1/4 z-50 flex flex-col items-end gap-4 pointer-events-none">
        {['Front Page', 'Projects', 'Contact'].map((item, idx) => {
          const id = item.toLowerCase().replace(' ', '');
          const isActive = activePage === (id === 'frontpage' ? 'front' : id);

          return (
            <button
              key={item}
              onClick={() => handlePageChange(id === 'frontpage' ? 'front' : id)}
              className={`
                pointer-events-auto
                relative pl-8 pr-4 py-3 
                font-mono text-xs font-bold uppercase tracking-widest 
                transition-all duration-300 transform origin-right hover:-translate-x-2
                ${isActive
                  ? 'bg-red-600 text-white translate-x-0 shadow-lg'
                  : 'bg-[#2a2a2a] text-zinc-400 hover:bg-[#333]'}
                rounded-l-sm border-y border-l border-current/20
              `}
              style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
              {item}
            </button>
          )
        })}
      </div>

      {/* --- Main Content Container (Perspective Wrapper) --- */}
      <div className="max-w-[1600px] mx-auto min-h-screen flex flex-col p-2 md:p-6 lg:p-8 page-perspective">

        {/* MASTHEAD (Sticky / Always Visible) */}
        <header className="mb-8 border-b-4 border-current pb-2 relative z-10">
          <div className="flex justify-between items-end mb-2">
            <div className="flex flex-col">
              <span className="font-mono text-xs md:text-sm uppercase tracking-[0.2em] mb-1 opacity-70">
                Full Stack Developer & UI Engineer
              </span>
              <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase">
                The Sanjay <br className="md:hidden" /> Chronicle
              </h1>
            </div>

            {/* Theme Toggle Stamp - REMOVED or kept as static icon */}
            <div
              className="group relative w-16 h-16 md:w-24 md:h-24 flex items-center justify-center border-2 border-current rounded-full hover:bg-current hover:text-red-500 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-full border border-dashed border-current opacity-50 animate-[spin_10s_linear_infinite]" />
              <Moon className="w-6 h-6 md:w-8 md:h-8 group-hover:text-white" />
            </div>
          </div>

          {/* Meta Bar */}
          <div className="flex flex-wrap items-center justify-between border-t-2 border-current pt-2 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-6">
              <span>Vol. 01</span>
              <span>•</span>
              <span>Issue 2025</span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <MapPin size={12} /> Chennai, IN
              </span>
            </div>
            <div className="flex items-center gap-6 hidden md:flex">
              <span>28°C Clear Sky</span>
              <span>•</span>
              <span>Printed in the Digital Realm</span>
            </div>
          </div>
        </header>

        {/* --- DYNAMIC PAGE CONTENT --- */}
        <main className={`flex-grow relative ${isFlipping ? 'flipping-out' : 'flipping-in'}`}>

          {/* FRONT PAGE VIEW */}
          {activePage === 'front' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-0 min-h-[800px] border-x border-current">

              {/* LEFT COLUMN: Bio & Sidebar info */}
              <aside className="col-span-1 md:col-span-3 border-b md:border-b-0 md:border-r border-current p-6 flex flex-col gap-8">

                {/* Photo / Intro */}
                <div className="space-y-4">
                  <div className={`aspect-[4/5] w-full bg-zinc-800 grayscale contrast-125 relative overflow-hidden group`}>
                    {/* Placeholder for Image - Using a geometric pattern if no image */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-30">
                      <div className="w-24 h-24 border-4 border-current rounded-full" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white p-2 font-mono text-xs text-center translate-y-full group-hover:translate-y-0 transition-transform">
                      AVAILABLE FOR HIRE
                    </div>
                  </div>
                  <div className="font-serif italic text-lg leading-snug">
                    "Crafting digital interfaces with the precision of print and the interactivity of the web."
                  </div>
                </div>

                {/* Now Building */}
                <div className="border-t border-dashed border-current pt-6">
                  <h4 className="font-mono text-xs font-bold uppercase mb-4 text-red-600">Now Building</h4>
                  <div className={`p-4 bg-zinc-800/50`}>
                    <h5 className="font-bold mb-1">Project: Omni-Grid</h5>
                    <p className="font-mono text-xs opacity-80 leading-relaxed">
                      Building a high-performance data grid for financial applications using Rust and WebAssembly.
                    </p>
                    <div className="w-full bg-current h-1 mt-3 opacity-20 overflow-hidden">
                      <div className="h-full bg-red-600 w-3/4" />
                    </div>
                    <div className="flex justify-between font-mono text-[10px] mt-1 opacity-60">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                  </div>
                </div>

                {/* Connect */}
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

              {/* CENTER COLUMN: Main Feature */}
              <section className="col-span-1 md:col-span-6 p-6 md:px-8 border-b md:border-b-0 md:border-r border-current relative">
                <div className="absolute top-0 right-0 p-2 opacity-10">
                  <Code size={120} />
                </div>

                <Badge>Featured Story</Badge>

                <h2 className="font-serif text-5xl md:text-7xl font-bold mt-6 mb-6 leading-[0.9] tracking-tight">
                  Redefining The Web, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">One Pixel</span> at a Time.
                </h2>

                <div className="font-mono text-xs md:text-sm leading-relaxed text-justify opacity-90 columns-1 md:columns-2 gap-6 space-y-4">
                  <p>
                    <span className="text-4xl float-left mr-2 font-serif font-bold leading-none mt-[-4px]">I</span>
                    n an era of digital homogeneity, I strive to break the mold. My work lies at the intersection of brutalist aesthetics and refined user experience. I don't just write code; I compose interactive narratives that guide users through complex data with intuitive ease.
                  </p>
                  <p>
                    With over 5 years of experience in the React ecosystem, I specialize in building scalable design systems and high-performance web applications. My philosophy is simple: content is king, but interaction is the crown.
                  </p>
                  <p>
                    Currently exploring the possibilities of WebGL and shaders to bring a new depth to flat interfaces.
                  </p>
                </div>

                {/* Featured Project Inline */}
                <div className="mt-12 pt-8 border-t border-current">
                  <SectionTitle>Latest Work</SectionTitle>
                  <div className="group cursor-pointer">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="text-2xl font-bold group-hover:text-red-600 transition-colors">Vantage UI Kit</h4>
                      <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    <p className="font-mono text-sm opacity-70 mb-4 max-w-md">
                      A comprehensive React component library focusing on accessibility and brutalist aesthetics.
                    </p>
                    <div className="w-full h-48 bg-current opacity-10 group-hover:opacity-20 transition-opacity flex items-center justify-center border border-dashed border-current">
                      <span className="font-mono text-xs">Project Preview Image</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* RIGHT COLUMN: Stack & Experience */}
              <aside className="col-span-1 md:col-span-3 p-6 flex flex-col gap-8">

                {/* Tech Stack */}
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

                {/* Experience */}
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

                {/* Github Activity Mock */}
                <div className="mt-auto pt-6 border-t-4 border-double border-current">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold uppercase">Commit History</span>
                    <Github size={14} />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {[...Array(35)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 ${Math.random() > 0.5 ? 'bg-current opacity-20' : (Math.random() > 0.5 ? 'bg-red-600' : 'bg-transparent border border-current opacity-30')}`}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}

          {/* PROJECTS PAGE VIEW */}
          {activePage === 'projects' && (
            <div className="border-x border-current min-h-[800px] p-6 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-dashed border-l border-current opacity-20 hidden md:block" />

              <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-current pb-6">
                  <h2 className="font-serif text-6xl md:text-8xl font-bold uppercase tracking-tighter">
                    The Archives
                  </h2>
                  <span className="font-mono text-sm hidden md:block">Selected Works 2021-2024</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
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

                  {/* Placeholder for more */}
                  <article className="flex items-center justify-center aspect-video border border-dashed border-current opacity-40">
                    <span className="font-mono text-xs uppercase">More Coming Soon...</span>
                  </article>
                </div>
              </div>
            </div>
          )}

          {/* CONTACT PAGE VIEW */}
          {activePage === 'contact' && (
            <div className="border-x border-current min-h-[800px] flex items-center justify-center p-6 relative">
              <div className="max-w-2xl w-full border-4 border-double border-current p-8 md:p-12 text-center bg-current/5">
                <h2 className="font-serif text-5xl md:text-7xl font-bold mb-6">Get In Touch</h2>
                <p className="font-mono text-sm md:text-base opacity-80 mb-8 max-w-lg mx-auto">
                  Have a project in mind or just want to discuss the latest in tech?
                  Send a telegram to my digital office.
                </p>

                <a
                  href="mailto:hello@example.com"
                  className="inline-block bg-red-600 text-white font-mono text-lg px-8 py-4 uppercase tracking-widest hover:bg-red-700 transition-colors shadow-[4px_4px_0px_0px_currentColor]"
                >
                  Send Email
                </a>

                <div className="mt-12 pt-8 border-t border-dashed border-current flex justify-center gap-8">
                  <SocialLink href="#" icon={Twitter} label="Twitter" />
                  <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                </div>
              </div>
            </div>
          )}

        </main>

        {/* FOOTER */}
        <footer className="mt-8 pt-4 border-t-2 border-current flex flex-col md:flex-row justify-between items-center font-mono text-[10px] uppercase tracking-wider opacity-60">
          <div>
            &copy; 2025 Sanjay Codes. All rights reserved.
          </div>
          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <span>The End</span>
            <span>•</span>
            <span>Vol. 01</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
