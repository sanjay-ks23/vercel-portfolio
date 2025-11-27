'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { NavStrip, MobileNav } from '@/components/Navigation';
import { CoverPage } from '@/components/pages/Cover';
import { ProjectsPage } from '@/components/pages/Projects';
import { BlogPage } from '@/components/pages/Blog';
import { ProfilePage } from '@/components/pages/Profile';
import { SECTIONS } from '@/lib/data';

const variants: import('framer-motion').Variants = {
    enter: (direction: number) => ({
        rotateY: direction > 0 ? 90 : -90,
        opacity: 0,
        transformOrigin: direction > 0 ? 'left center' : 'right center',
    }),
    center: {
        zIndex: 1,
        rotateY: 0,
        opacity: 1,
        transition: {
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 20
        }
    },
    exit: (direction: number) => ({
        zIndex: 0,
        rotateY: direction < 0 ? 90 : -90,
        opacity: 0,
        transformOrigin: direction < 0 ? 'left center' : 'right center',
        transition: {
            duration: 0.8,
            type: 'spring',
            stiffness: 100,
            damping: 20
        }
    })
};

export default function Home() {
    const [activePage, setActivePage] = useState(0);
    const [direction, setDirection] = useState(0);

    const setPage = (index: number) => {
        if (index < 0 || index >= SECTIONS.length) return;
        setDirection(index > activePage ? 1 : -1);
        setActivePage(index);
    };

    const pages = [
        <CoverPage key="cover" goToProjects={() => setPage(1)} />,
        <ProjectsPage key="projects" />,
        <BlogPage key="blog" />,
        <ProfilePage key="profile" />
    ];

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-[#f5f5f0] flex items-center justify-center">
            {/* Matte Grain Effect */}
            <div className="grain z-0 opacity-20 pointer-events-none fixed inset-0"></div>

            {/* The Newspaper Object */}
            <div className="newspaper-container w-full h-full relative shadow-depth bg-transparent z-10">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={activePage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute top-0 left-0 w-full h-full bg-paper backface-hidden"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {pages[activePage]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Controls */}
            <NavStrip activeIndex={activePage} setIndex={setPage} />
            <MobileNav activeIndex={activePage} setIndex={setPage} />

            {/* Desktop Pagination Arrows */}
            <div className="hidden md:flex absolute bottom-8 gap-4 z-50 left-1/2 -translate-x-1/2">
                <button
                    onClick={() => setPage(activePage - 1)}
                    disabled={activePage === 0}
                    className="bg-paper text-ink px-4 py-2 font-mono text-xs uppercase disabled:opacity-30 border border-ink hover:bg-ink hover:text-white transition-colors cursor-pointer shadow-lg"
                >
                    &larr; Prev Page
                </button>
                <span className="font-mono text-xs text-ink py-2 bg-paper/80 px-4 border border-ink">
                    Page {activePage + 1} of {SECTIONS.length}
                </span>
                <button
                    onClick={() => setPage(activePage + 1)}
                    disabled={activePage === SECTIONS.length - 1}
                    className="bg-paper text-ink px-4 py-2 font-mono text-xs uppercase disabled:opacity-30 border border-ink hover:bg-ink hover:text-white transition-colors cursor-pointer shadow-lg"
                >
                    Next Page &rarr;
                </button>
            </div>

        </div>
    );
}
