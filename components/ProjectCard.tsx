
import React from 'react';
import { Project } from '../types';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  index: number;
  onOpen: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onOpen }) => {
  // Rotate cards slightly for a messy look
  const rotation = index % 2 === 0 ? 'rotate-1' : '-rotate-1';
  const hoverRotation = index % 2 === 0 ? '-rotate-1' : 'rotate-1';

  // Dynamic border colors
  const borderColor = index % 3 === 0 ? 'border-acid-green' : index % 3 === 1 ? 'border-shock-pink' : 'border-electric-blue';
  const shadowColor = index % 3 === 0 ? 'hover:shadow-hard-green' : index % 3 === 1 ? 'hover:shadow-hard-pink' : 'hover:shadow-[6px_6px_0px_0px_#00ffff]';

  return (
    <div className={`group relative bg-white text-black p-4 border-4 border-black ${rotation} hover:${hoverRotation} transition-all duration-300 transform hover:-translate-y-2 ${shadowColor} flex flex-col`}>
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-tape-gray/80 rotate-2 z-10 backdrop-blur-sm pointer-events-none border border-white/20 shadow-sm"></div>

      <div className="relative overflow-hidden border-2 border-black mb-4 h-48 bg-black">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 mix-blend-hard-light opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className={`absolute bottom-0 right-0 bg-black text-white font-mono text-xs px-2 py-1 border-t-2 border-l-2 ${borderColor}`}>
          {project.status}
        </div>
      </div>

      <div className="space-y-3 flex-grow">
        <h3 className="text-3xl font-sans uppercase tracking-tight leading-none group-hover:text-shock-pink transition-colors">
          {project.title}
        </h3>
        <p className="font-mono text-sm leading-tight font-bold text-gray-800">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-bold uppercase bg-black text-white px-2 py-0.5 transform -rotate-2">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end mt-auto">
        <button
          onClick={onOpen}
          className="bg-black text-white hover:bg-transparent hover:text-black border-2 border-black px-4 py-2 font-bold font-sans tracking-wider flex items-center gap-2 transition-colors w-full justify-center"
        >
          CHECK IT <ExternalLink size={16} />
        </button>
      </div>
    </div>
  );
};
