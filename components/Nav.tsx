
import React, { useState } from 'react';
import { Skull, Menu, X } from 'lucide-react';

interface NavProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Nav: React.FC<NavProps> = ({ currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (view: string) => {
    setIsOpen(false);
    onNavigate(view);
  };

  const isActive = (view: string) => {
      // Logic for active state styling if needed, mainly for exact matches
      return currentView === view ? 'text-shock-pink underline decoration-wavy' : '';
  };

  return (
    <nav className="sticky top-0 z-50 bg-gnar-black border-b-4 border-white p-4 relative h-[80px]">
       {/* Background gradient line */}
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-shock-pink via-acid-green to-electric-blue"></div>

       <div className="flex justify-between items-center max-w-7xl mx-auto w-full h-full">
         
         {/* Logo */}
         <div 
           className="flex items-center gap-2 group cursor-pointer" 
           onClick={() => handleNavClick('HOME')}
         >
            <div className="bg-acid-green p-1 border-2 border-black shadow-[2px_2px_0px_0px_#fff] group-hover:rotate-12 transition-transform">
              <Skull size={32} className="text-black" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-sans tracking-tighter leading-none text-white group-hover:text-acid-green transition-colors">SURPRISE</span>
              <span className="text-2xl font-sans tracking-tighter leading-none text-white pl-4 group-hover:text-shock-pink transition-colors">MOVE</span>
            </div>
         </div>

         {/* Desktop Nav */}
         <div className="hidden md:flex gap-8 items-center font-mono font-bold text-lg text-white">
            <button onClick={() => handleNavClick('WORK')} className={`hover:text-acid-green hover:underline decoration-wavy decoration-2 uppercase ${isActive('WORK')}`}>WORK</button>
            <button onClick={() => handleNavClick('ORACLE')} className={`hover:text-shock-pink hover:underline decoration-wavy decoration-2 uppercase ${isActive('ORACLE')}`}>THE ORACLE</button>
            <button onClick={() => handleNavClick('MIXTAPE')} className={`hover:text-electric-blue hover:underline decoration-wavy decoration-2 uppercase ${isActive('MIXTAPE')}`}>MIXTAPE</button>
            <button onClick={() => handleNavClick('ABOUT')} className={`hover:text-white hover:underline decoration-wavy decoration-2 uppercase ${isActive('ABOUT')}`}>ABOUT</button>
         </div>

         {/* Mobile Menu Button */}
         <button 
           className="md:hidden bg-white text-black p-2 border-2 border-black shadow-[4px_4px_0px_0px_#ccff00] active:translate-y-1 active:shadow-none transition-all"
           onClick={() => setIsOpen(!isOpen)}
         >
           {isOpen ? <X size={24} /> : <Menu size={24} />}
         </button>

       </div>

       {/* Mobile Menu Overlay */}
       {isOpen && (
         <div className="absolute top-full left-0 w-full bg-gnar-black border-b-4 border-white p-6 flex flex-col gap-6 font-mono font-bold text-xl text-white shadow-hard-pink animate-in slide-in-from-top-2">
            <button onClick={() => handleNavClick('HOME')} className="text-left hover:text-acid-green uppercase">HOME</button>
            <button onClick={() => handleNavClick('WORK')} className="text-left hover:text-acid-green uppercase">WORK</button>
            <button onClick={() => handleNavClick('ORACLE')} className="text-left hover:text-shock-pink uppercase">THE ORACLE</button>
            <button onClick={() => handleNavClick('MIXTAPE')} className="text-left hover:text-electric-blue uppercase">MIXTAPE</button>
            <button onClick={() => handleNavClick('ABOUT')} className="text-left hover:text-white uppercase">ABOUT</button>
         </div>
       )}
    </nav>
  );
};
