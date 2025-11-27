import React from 'react';
import { Header } from '../Header';
import { Sun, User } from 'lucide-react';

interface CoverPageProps {
    goToProjects: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ goToProjects }) => (
    <div className="p-4 md:p-12 h-full overflow-y-auto custom-scroll relative">
        
        <div className="relative z-10">
            <Header title="The Dev Chronicles" />

            <div className="border-b-2 border-ink py-2 px-4 mb-8 flex justify-between items-center font-mono text-xs md:text-sm uppercase bg-stone-200/50">
                <span className="flex items-center gap-2"><Sun className="w-4 h-4" /> Sunny, 28°C</span>
                <span className="font-bold hidden md:inline">Special Edition: Portfolio Launch</span>
                <span>Read Time: ∞</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-8 flex flex-col justify-between">
                    <div>
                        <span className="inline-block bg-accent text-white px-2 py-0.5 font-mono text-xs uppercase mb-4">Breaking News</span>
                        <h2 className="font-serif text-5xl md:text-7xl font-bold leading-[0.9] mb-6">
                            Developer Builds <br />
                            <span className="italic font-light">Digital</span> Newspaper.
                        </h2>
                        <div className="columns-responsive font-serif text-justify text-base leading-relaxed gap-8 border-t-2 border-b-2 border-ink py-6">
                            <p className="mb-4 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-8px]">
                                In a world dominated by minimalist generic portfolios, Shorya Bansal has decided to take a step back into the golden age of print. This "website" functions as a fully interactive newspaper.
                            </p>
                            <p className="mb-4">
                                Specializing in React, Next.js, and TypeScript, Shorya brings a unique blend of engineering precision and artistic design to the table. "I wanted to create something that felt tangible," says the developer.
                            </p>
                            <p>
                                The project highlights a mastery of frontend architecture, using complex state management to simulate 3D page turns without heavy external libraries.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex gap-4">
                        <button onClick={goToProjects} className="bg-ink text-white px-8 py-3 font-mono uppercase tracking-widest hover:bg-accent transition-colors cursor-pointer">
                            Read Full Story
                        </button>
                    </div>
                </div>

                <div className="md:col-span-4 flex flex-col gap-6">
                    <div className="border-4 border-ink p-2 bg-white shadow-lg rotate-1 hover:rotate-0 transition-transform duration-500">
                        <div className="aspect-[3/4] bg-stone-200 flex items-center justify-center border border-stone-300">
                            <User className="w-12 h-12 text-stone-400" />
                        </div>
                        <div className="mt-2 text-center font-mono text-xs uppercase border-t border-dotted border-ink pt-2">
                            Fig A. The Architect
                        </div>
                    </div>

                    <div className="border-2 border-ink p-4 bg-stone-100">
                        <h3 className="font-display font-bold uppercase mb-2 border-b border-ink">In This Issue</h3>
                        <ul className="font-mono text-xs space-y-2">
                            <li className="flex justify-between"><span>• Top Projects</span> <span>Pg. 2</span></li>
                            <li className="flex justify-between"><span>• Technical Blog</span> <span>Pg. 3</span></li>
                            <li className="flex justify-between"><span>• Experience</span> <span>Pg. 4</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
