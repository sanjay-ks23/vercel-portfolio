import React from 'react';
import { Header } from '../Header';
import { Github, Linkedin, Mail } from 'lucide-react';

export const ProfilePage: React.FC = () => (
    <div className="p-4 md:p-12 h-full overflow-y-auto custom-scroll relative">
        
        <div className="relative z-10">
            <Header title="Life & Style" sub="The professional journey and contact information." />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                    <h3 className="font-display text-2xl font-bold uppercase border-b-2 border-ink pb-2 mb-6">Experience</h3>

                    <div className="space-y-8">
                        <div className="relative pl-6 border-l-2 border-ink">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-ink rounded-full"></div>
                            <div className="font-mono text-xs text-stone-500 mb-1">Nov 2024 - Present</div>
                            <h4 className="font-serif text-xl font-bold">Excelerate</h4>
                            <div className="font-mono text-xs uppercase tracking-wide mb-2 text-accent">Data Engineer Intern</div>
                            <p className="font-serif text-stone-700">Optimizing data pipelines and ensuring seamless data accessibility for analytics teams.</p>
                        </div>

                        <div className="relative pl-6 border-l-2 border-ink">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white border-2 border-ink rounded-full"></div>
                            <div className="font-mono text-xs text-stone-500 mb-1">Aug 2024 - Sep 2024</div>
                            <h4 className="font-serif text-xl font-bold">Headstarter AI</h4>
                            <div className="font-mono text-xs uppercase tracking-wide mb-2 text-accent">Software Engineer Intern</div>
                            <p className="font-serif text-stone-700">Built responsive Next.js components and integrated AI APIs for a scalable platform.</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <h3 className="font-display text-2xl font-bold uppercase border-b-2 border-ink pb-2 mb-6">Education</h3>
                        <div className="mb-8">
                            <h4 className="font-serif text-xl font-bold">JECRC University</h4>
                            <p className="font-mono text-sm text-stone-600">B.Tech in Computer Science (2024 - 2028)</p>
                            <p className="italic text-stone-500 mt-1">Specialization in AI/ML</p>
                        </div>
                    </div>

                    <div className="bg-ink text-paper p-8 text-center">
                        <h3 className="font-display text-2xl font-bold uppercase mb-4">Contact Me</h3>
                        <p className="font-serif italic mb-6">"Available for freelance commissions and full-time roles."</p>
                        <div className="flex justify-center gap-6">
                            <a href="#" className="hover:text-accent transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Linkedin className="w-5 h-5" /></a>
                            <a href="#" className="hover:text-accent transition-colors"><Mail className="w-5 h-5" /></a>
                        </div>
                        <div className="mt-6 pt-6 border-t border-stone-700 font-mono text-xs uppercase tracking-widest opacity-60">
                            © 2025 Shorya Bansal<br />Printed in Chennai
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
