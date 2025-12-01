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
        fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[9999] md:hidden
        transition-all duration-300 ease-in-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
      `}
        >
            <div
                className="
          flex items-center justify-center gap-6 px-6 py-3
          bg-[#1a1a1a]
          border border-red-700
          shadow-xl shadow-black/50
          rounded-sm
        "
            >
                {navItems.map((item) => {
                    const id = item.toLowerCase().replace(' ', '');
                    const targetPage = id === 'frontpage' ? 'front' : id;
                    const isActive = activePage === targetPage;

                    if (isActive) return null;

                    return (
                        <button
                            key={item}
                            onClick={() => onNavigate(targetPage)}
                            className="
                font-mono text-[11px] font-bold uppercase tracking-widest
                text-white hover:text-red-500
                transition-colors duration-200
              "
                        >
                            {item === 'Front Page' ? 'Home' : item}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default MobileNavigation;
