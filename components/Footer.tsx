
import React from 'react';
import { Github, Instagram, Mail, Lock } from 'lucide-react';

interface FooterProps {
  onStaffClick?: () => void;
  showStaffButton?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ onStaffClick, showStaffButton = false }) => {
  return (
    <footer className="py-12 bg-black text-white text-center font-mono relative border-t-2 border-white/10 w-full mt-auto">
      <div className="flex justify-center gap-8 mb-8">
         <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-acid-green transition-colors"><Github size={32}/></a>
         <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-shock-pink transition-colors"><Instagram size={32}/></a>
         <a href="mailto:hello@surprisemove.com" className="hover:text-electric-blue transition-colors"><Mail size={32}/></a>
      </div>
      <p className="text-sm text-gray-500 mb-4">
        © 1985-{new Date().getFullYear()} SURPRISE MOVE ADVENTURE STUDIO. ALL RIGHTS RESERVED.
      </p>
      {showStaffButton && (
        <button 
          onClick={onStaffClick}
          className="text-xs text-gray-800 hover:text-red-500 flex items-center justify-center gap-1 mx-auto uppercase tracking-widest border border-transparent hover:border-red-900 px-2 py-1"
        >
          <Lock size={10} /> Staff Only
        </button>
      )}
    </footer>
  );
};