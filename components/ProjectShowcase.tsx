
import React from 'react';
import { Project } from '../types';
import { X, ArrowRight, Terminal } from 'lucide-react';
import { Footer } from './Footer';

interface ProjectShowcaseProps {
  project: Project;
  onClose: () => void;
}

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ project, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-gnar-black overflow-y-auto animate-in fade-in duration-300 flex flex-col">
      
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-hard-pink">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="bg-black text-white hover:bg-acid-green hover:text-black font-mono font-bold px-4 py-2 border-2 border-black flex items-center gap-2 transition-colors uppercase"
          >
            <X size={20} /> Return to Base
          </button>
          <span className="hidden md:block font-mono font-bold text-black uppercase tracking-widest">
            Project File: {project.id} // {project.status}
          </span>
        </div>
        <div className="font-sans text-2xl uppercase tracking-tighter text-black">
          {project.title}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 flex-grow w-full">
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COL: Imagery */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative border-4 border-white bg-black group">
               <div className="absolute -inset-2 bg-acid-green -z-10 rotate-1 group-hover:rotate-0 transition-transform"></div>
               <img 
                 src={project.imageUrl} 
                 alt={project.title} 
                 className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
               />
               <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-1 font-mono text-sm border border-white">
                 FIG 1.0 - MAIN VIEW
               </div>
            </div>

            {/* Gallery Grid */}
            {project.gallery && (
              <div className="grid grid-cols-2 gap-4">
                {project.gallery.map((img, idx) => (
                  <div key={idx} className="relative border-2 border-white/50 hover:border-shock-pink transition-colors">
                    <img src={img} alt="" className="w-full h-40 object-cover grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COL: Data */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* The Brief */}
            <div className="bg-white text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_#ccff00]">
              <h3 className="font-sans text-4xl mb-4 border-b-4 border-black inline-block">THE BRIEF</h3>
              <p className="font-mono text-lg leading-relaxed font-bold">
                {project.fullDescription || project.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map(tag => (
                   <span key={tag} className="bg-black text-white px-3 py-1 font-mono text-xs uppercase transform -rotate-2">
                     #{tag}
                   </span>
                ))}
              </div>
            </div>

            {/* The Stack (Terminal Style) */}
            <div className="bg-black border-4 border-white p-4 font-mono text-sm shadow-[8px_8px_0px_0px_#ff00cc]">
               <div className="border-b border-white/20 pb-2 mb-4 flex gap-2 text-white/50">
                 <Terminal size={16} />
                 <span>STACK_TRACE.LOG</span>
               </div>
               <div className="space-y-2">
                 {project.techStack?.map((tech, i) => (
                   <div key={i} className="flex gap-2">
                     <span className="text-acid-green">{'>'}</span>
                     <span className="text-white">Installing dependency:</span>
                     <span className="text-shock-pink">{tech}</span>
                   </div>
                 ))}
                 <div className="animate-pulse mt-4 text-acid-green">_CURSOR WAITING</div>
               </div>
            </div>

            {/* Features List */}
            <div className="bg-tape-gray border-4 border-black p-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur px-4 py-1 rotate-2 shadow-sm border border-black/10">
                 <span className="font-marker text-black">TOP SECRET</span>
              </div>
              <h3 className="font-sans text-3xl mb-4 text-black">FEATURES</h3>
              <ul className="space-y-3">
                {project.features?.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-black font-mono font-bold">
                    <ArrowRight size={20} className="text-shock-pink mt-1 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-4 pt-4">
              <a href={project.link} className="bg-shock-pink text-white border-4 border-white text-center py-4 font-sans text-3xl uppercase hover:bg-white hover:text-black hover:border-black transition-colors shadow-hard-white">
                LAUNCH PROJECT
              </a>
            </div>

          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
};
