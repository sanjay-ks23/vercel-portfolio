import React, { useState, useEffect } from 'react';

const MobileNavigation = ({ activePage, onNavigate }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show on scroll up, hide on scroll down
            // Always show if near top (e.g., < 50px)
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

    return (
        <div
            className={`
        fixed top-0 left-0 w-full z-50 md:hidden
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      `}
        >
            <div className="flex justify-center items-start pt-2 overflow-x-auto no-scrollbar">
                {['Front Page', 'Projects', 'Blogs', 'Contact'].map((item, index) => {
                    const id = item.toLowerCase().replace(' ', '');
                    const targetPage = id === 'frontpage' ? 'front' : id;
                    const isActive = activePage === targetPage;

                    // Don't render active page tab (similar to desktop behavior)
                    if (isActive) return null;

                    return (
                        <button
                            key={item}
                            onClick={() => onNavigate(targetPage)}
                            className={`
                relative px-4 py-3 mx-[-4px]
                font-mono text-[10px] font-black uppercase tracking-widest
                bg-red-700 text-white hover:bg-red-800
                border-x border-b border-red-900/30
                shadow-lg
                transform transition-transform active:scale-95
                rounded-b-sm
              `}
                            style={{
                                zIndex: 10 - index, // Stack order
                                boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
                            }}
                        >
                            {item === 'Front Page' ? 'Home' : item}
                        </button>
                    );
                })}
            </div>

            {/* Book Page Stack Effect */}
            <div className="relative z-0 -mt-[1px]">
                <div className="h-[2px] w-[98%] mx-auto bg-[#d4d4d4] border-b border-zinc-400 shadow-sm"></div>
                <div className="h-[2px] w-[96%] mx-auto bg-[#d4d4d4] border-b border-zinc-400 shadow-sm"></div>
                <div className="h-[2px] w-[94%] mx-auto bg-[#d4d4d4] border-b border-zinc-400 shadow-sm"></div>
            </div>
        </div>
    );
};

export default MobileNavigation;
