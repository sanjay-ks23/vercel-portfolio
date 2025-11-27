import React from 'react';
import { Header } from '../Header';
import { PROJECTS } from '@/lib/data';

export const ProjectsPage: React.FC = () => (
    <div className="p-4 md:p-12 h-full overflow-y-auto custom-scroll relative">
        
        <div className="relative z-10">
            <Header title="Feature Stories" sub="A deep dive into recent technical endeavors and products." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink border-2 border-ink">
                {PROJECTS.map((p, i) => (
                    <div key={i} className="bg-paper p-6 hover:bg-white transition-colors group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <span className="font-mono text-xs border border-ink px-2 py-0.5 rounded-full uppercase">{p.tag}</span>
                            <span className="font-mono text-xs text-stone-500">{p.tech}</span>
                        </div>
                        <h3 className="font-display text-2xl font-bold mb-2 group-hover:underline decoration-accent decoration-2 underline-offset-4">
                            {p.title}
                        </h3>
                        <p className="font-serif text-lg leading-snug text-stone-700">
                            {p.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t-2 border-ink pt-8">
                <h3 className="font-display text-xl font-bold uppercase mb-4">Tech Stack Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono text-xs text-center">
                    {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind', 'PostgreSQL', 'Figma', 'Git'].map(tool => (
                        <div key={tool} className="border border-ink p-2 hover:bg-ink hover:text-white transition-colors cursor-default">
                            {tool}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);
