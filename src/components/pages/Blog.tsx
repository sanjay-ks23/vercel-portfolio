import React from 'react';
import { Header } from '../Header';
import { BLOGS } from '@/lib/data';

export const BlogPage: React.FC = () => (
    <div className="p-4 md:p-12 h-full overflow-y-auto custom-scroll relative">
        
        <div className="relative z-10">
            <Header title="Opinion & Editorial" sub="Thoughts on software engineering, design, and the digital age." />

            <div className="flex flex-col gap-8 max-w-3xl mx-auto">
                {BLOGS.map((blog, i) => (
                    <article key={i} className="border-b border-stone-400 pb-8 last:border-0">
                        <div className="flex items-baseline gap-4 mb-2">
                            <span className="font-mono text-sm font-bold text-accent">{blog.date}</span>
                            <h2 className="font-serif text-3xl font-bold hover:text-accent cursor-pointer transition-colors">
                                {blog.title}
                            </h2>
                        </div>
                        <p className="font-serif text-lg leading-relaxed text-stone-700 mb-4">
                            {blog.snippet}
                        </p>
                        <button className="font-mono text-xs uppercase border-b border-ink pb-0.5 hover:text-accent hover:border-accent transition-colors">
                            Continue Reading
                        </button>
                    </article>
                ))}
            </div>

            <div className="mt-12 p-6 bg-stone-200 border border-ink text-center">
                <h4 className="font-display font-bold uppercase mb-2">Subscribe to the Newsletter</h4>
                <p className="font-serif italic mb-4">Get the latest edition delivered to your inbox every Sunday.</p>
                <div className="flex max-w-md mx-auto gap-2">
                    <input type="email" placeholder="Email Address" className="flex-1 p-2 border border-ink font-mono text-sm bg-paper focus:outline-none focus:ring-1 focus:ring-ink" />
                    <button className="bg-ink text-white px-4 py-2 font-mono text-xs uppercase hover:bg-accent transition-colors">Subscribe</button>
                </div>
            </div>
        </div>
    </div>
);
