
import React from 'react';
import { SiteContent } from '../types';
import { Zap, Skull, Fingerprint } from 'lucide-react';

interface AboutPageProps {
  content: SiteContent;
  onClose?: () => void; // Optional now as it's a page
}

export const AboutPage: React.FC<AboutPageProps> = ({ content }) => {
  return (
    <div className="min-h-full bg-gnar-black flex flex-col">
      
      {/* Sticky Header */}
      <div className="sticky top-[80px] z-40 bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-hard-pink">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white font-mono font-bold px-4 py-2 border-2 border-black flex items-center gap-2 uppercase">
            <Skull size={20} /> CLASSIFIED // ABOUT US
          </div>
        </div>
        <div className="font-sans text-2xl uppercase tracking-tighter text-black">
          SURPRISE MOVE
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-12 w-full flex-grow relative">
        {/* Texture Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/crumpled-paper.png')] opacity-10 pointer-events-none z-0 mix-blend-overlay"></div>
            
            {/* HERO TITLE */}
            <div className="relative mb-12 text-center transform -rotate-1 mt-4 z-10">
              <div className="absolute inset-0 bg-white translate-x-2 translate-y-2 mix-blend-difference hidden md:block"></div>
              <h1 className="relative text-5xl md:text-8xl font-sans text-white uppercase leading-[0.8] mix-blend-difference z-10 whitespace-pre-wrap">
                {content.aboutHeadline}
                <span className="text-shock-pink">.</span>
              </h1>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative z-10">
              
              {/* LEFT COLUMN: THE LORE */}
              <div className="space-y-12">
                
                <div className="relative bg-white p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_#ccff00] rotate-1 text-black">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 font-mono uppercase transform -rotate-2 border border-white">
                      Origin Story
                  </div>
                  <div className="font-mono text-lg md:text-xl font-bold leading-relaxed whitespace-pre-wrap mt-2">
                    {content.aboutText}
                  </div>
                  <Zap className="absolute bottom-4 right-4 text-acid-green fill-current drop-shadow-sm" size={40}/>
                </div>

                <div className="relative group">
                  <div className="absolute inset-0 border-4 border-white translate-x-4 translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=1000&auto=format&fit=crop" 
                    alt="Abandoned Pool" 
                    className="relative border-4 border-white grayscale group-hover:grayscale-0 transition-all duration-500 w-full h-auto object-cover" 
                  />
                  <div className="absolute bottom-0 left-0 bg-shock-pink text-white px-4 py-2 font-sans text-xl uppercase border-t-2 border-r-2 border-black">
                    Fig 1. The Office
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: THE MANIFESTO & VALUES */}
              <div className="space-y-12 mt-8 lg:mt-0">
                
                {/* MANIFESTO */}
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-sans text-white mb-6 border-l-8 border-shock-pink pl-6">
                      THE MISSION
                    </h2>
                    <div className="font-mono text-lg md:text-xl text-white/90 whitespace-pre-wrap leading-relaxed">
                      {content.aboutManifesto}
                    </div>
                </div>

                {/* VALUES LIST */}
                <div className="bg-gnar-black border-4 border-white p-6 md:p-8 relative">
                    <div className="absolute -right-4 -top-4 bg-electric-blue text-black p-3 border-4 border-white shadow-hard-white transform rotate-3">
                      <Fingerprint size={32} />
                    </div>
                    
                    <h3 className="text-3xl md:text-4xl font-sans text-white mb-8 underline decoration-acid-green decoration-4 underline-offset-4">
                      CORE PROTOCOLS
                    </h3>

                    <ul className="space-y-4">
                      {content.aboutValues.map((val, idx) => (
                        <li key={idx} className="flex items-center gap-4 group">
                          <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-white text-black font-sans text-xl md:text-2xl border-2 border-black group-hover:bg-acid-green transition-colors">
                            0{idx + 1}
                          </div>
                          <span className="font-mono text-lg md:text-xl font-bold text-white uppercase group-hover:text-acid-green transition-colors">
                            {val}
                          </span>
                        </li>
                      ))}
                    </ul>
                </div>

              </div>

            </div>

            {/* BOTTOM SECTION */}
            <div className="mt-20 text-center pb-12 relative z-10">
                <p className="font-marker text-3xl md:text-4xl text-gray-500 transform -rotate-2 opacity-60">
                  {content.aboutQuote}
                </p>
            </div>

      </div>
      
    </div>
  );
};
