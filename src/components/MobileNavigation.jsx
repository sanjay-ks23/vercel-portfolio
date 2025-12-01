import React, { useState, useEffect } from 'react';

const MobileNavigation = ({ activePage, onNavigate }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < 50) {
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    const navItems = ['Front Page', 'Projects', 'Blogs', 'Contact'];

    return (
        <div
            className={`
        fixed top-0 left-0 w-full z-50 md:hidden pointer-events-none
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
        >
            {/* Background Container (White/Paper color to block content behind) */}
            {/* Actually, user wants it to look natural, maybe transparent background but with lines? 
          Let's keep it minimal. The user said "remove teh three lines from the bottom".
          I'll use a slight background for the header area if needed, but let's try transparent first 
          so it looks like tabs floating on the page. 
          Wait, if it scrolls away, it needs a background or it will look weird over text.
          I'll use the dark background color #1a1a1a to match the theme.
      */}
            <div className="relative w-full bg-[#1a1a1a] pointer-events-auto pb-4 shadow-xl">

                {/* The Spine (Absolute Left) */}
                <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#e5e5e5] z-20"></div>

                {/* The Curve (Connecting Spine to Top Line) */}
                {/* We can simulate this with a rounded div */}
                <div className="absolute top-4 left-[4px] w-[20px] h-[20px] border-l-2 border-t-2 border-[#e5e5e5] rounded-tl-xl z-10"></div>

                {/* The Lines & Tabs Container */}
                <div className="relative pt-4 pl-[24px]"> {/* pl to clear spine + curve */}

                    {/* We need to render lines and tabs together to ensure alignment */}
                    {/* But tabs need to be clickable and lines are decorative */}

                    {/* Line 1 (Top) */}
                    <div className="absolute top-4 left-[24px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>

                    {/* Line 2 */}
                    <div className="absolute top-[50px] left-[24px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>

                    {/* Line 3 */}
                    <div className="absolute top-[86px] left-[24px] right-0 h-[2px] bg-[#e5e5e5] shadow-sm z-0"></div>

                    {/* Render Tabs */}
                    <div className="relative h-[100px] w-full">
                        {navItems.map((item, index) => {
                            const id = item.toLowerCase().replace(' ', '');
                            const targetPage = id === 'frontpage' ? 'front' : id;
                            const isActive = activePage === targetPage;

                            if (isActive) return null;

                            // Determine visual index (0, 1, 2)
                            const renderedIndex = navItems.filter(i => {
                                const iId = i.toLowerCase().replace(' ', '');
                                const iTarget = iId === 'frontpage' ? 'front' : iId;
                                return iTarget !== activePage;
                            }).indexOf(item);

                            // Stagger Logic
                            // Line 1: Top 0 (relative to container) -> sits on Line 1 (top-4 absolute)
                            // Line 2: Top 36 -> sits on Line 2 (top-50 absolute)
                            // Line 3: Top 72 -> sits on Line 3 (top-86 absolute)

                            const topPos = renderedIndex * 36;
                            // Horizontal stagger to show "intersection" but distinctness
                            const leftPos = renderedIndex * 15;

                            return (
                                <button
                                    key={item}
                                    onClick={() => onNavigate(targetPage)}
                                    className={`
                                absolute
                                px-4 py-1.5
                                font-mono text-[10px] font-black uppercase tracking-widest
                                bg-red-700 text-white hover:bg-red-800
                                border border-red-900/50 rounded-t-md rounded-br-md
                                shadow-[2px_2px_4px_rgba(0,0,0,0.4)]
                                transform transition-transform active:scale-95
                                z-10
                            `}
                                    style={{
                                        top: `${topPos - 10}px`, // Adjust to sit ON the line
                                        left: `${leftPos}px`,
                                    }}
                                >
                                    {item === 'Front Page' ? 'Home' : item}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileNavigation;
