import React, { useState, useEffect } from 'react';

const MobileNavigation = ({ activePage, onNavigate }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            // Show on scroll up, hide on scroll down
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
        <>
            <style>{`
        @keyframes liquidFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
            <div
                className={`
          fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden
          transition-all duration-500 ease-in-out
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
        `}
            >
                <div
                    className="
            flex items-center justify-center gap-6 px-8 py-4
            rounded-full
            backdrop-blur-xl bg-white/10
            border border-white/20
            shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]
          "
                    style={{
                        background: 'linear-gradient(45deg, rgba(255,255,255,0.1), rgba(220, 38, 38, 0.15), rgba(255,255,255,0.1))',
                        backgroundSize: '200% 200%',
                        animation: 'liquidFlow 8s ease infinite'
                    }}
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
                  font-mono text-[10px] font-black uppercase tracking-widest
                  text-white/90 hover:text-red-400
                  transition-colors duration-300
                  drop-shadow-md
                "
                            >
                                {item === 'Front Page' ? 'Home' : item}
                            </button>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default MobileNavigation;
