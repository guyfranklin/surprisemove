
import React, { useState, useEffect } from 'react';
import { Nav } from './components/Nav';
import { ProjectCard } from './components/ProjectCard';
import { Oracle } from './components/Oracle';
import { ContactForm } from './components/ContactForm';
import { ProjectShowcase } from './components/ProjectShowcase';
import { LabManagement } from './components/LabManagement';
import { AboutPage } from './components/AboutPage';
import { Footer } from './components/Footer';
import { ArcadeGame } from './components/ArcadeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { PROJECTS, INITIAL_SITE_CONTENT, PLAYLIST } from './constants';
import { Project, SiteContent, Song } from './types';
import { ArrowDown } from 'lucide-react';

const App: React.FC = () => {
  // Initialize state from LocalStorage if available, otherwise use constants
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('surprise_move_projects');
      if (saved) {
         return JSON.parse(saved);
      }
      return PROJECTS;
    } catch (e) {
      console.warn('Failed to load projects from storage', e);
      return PROJECTS;
    }
  });

  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem('surprise_move_content');
      return saved ? JSON.parse(saved) : INITIAL_SITE_CONTENT;
    } catch (e) {
      console.warn('Failed to load content from storage', e);
      return INITIAL_SITE_CONTENT;
    }
  });

  const [playlist, setPlaylist] = useState<Song[]>(() => {
    try {
      const saved = localStorage.getItem('surprise_move_playlist');
      return saved ? JSON.parse(saved) : PLAYLIST;
    } catch (e) {
      console.warn('Failed to load playlist from storage', e);
      return PLAYLIST;
    }
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMgmtOpen, setIsMgmtOpen] = useState(false);
  const [view, setView] = useState<'HOME' | 'ORACLE' | 'MIXTAPE' | 'ABOUT'>('HOME');

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('surprise_move_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('surprise_move_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('surprise_move_playlist', JSON.stringify(playlist));
  }, [playlist]);

  // Management Handlers
  const handleSaveProject = (project: Project) => {
    setProjects(prev => {
      const exists = prev.find(p => p.id === project.id);
      if (exists) {
        return prev.map(p => p.id === project.id ? project : p);
      }
      return [...prev, project];
    });
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateContent = (content: SiteContent) => {
    setSiteContent(content);
  };

  const handleUpdatePlaylist = (newPlaylist: Song[]) => {
    setPlaylist(newPlaylist);
  };

  // Navigation Handler
  const handleNavigate = (target: string) => {
    if (target === 'WORK') {
        setView('HOME');
        // Small delay to allow render before scroll
        setTimeout(() => {
            document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        setView(target as any);
        window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gnar-black selection:bg-shock-pink selection:text-white flex flex-col">
      
      {/* SHOWCASE OVERLAY */}
      {selectedProject && (
        <ProjectShowcase 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

      {/* LAB MANAGEMENT OVERLAY */}
      {isMgmtOpen && (
        <LabManagement 
          projects={projects}
          siteContent={siteContent}
          playlist={playlist}
          onClose={() => setIsMgmtOpen(false)}
          onSaveProject={handleSaveProject}
          onDeleteProject={handleDeleteProject}
          onUpdateContent={handleUpdateContent}
          onUpdatePlaylist={handleUpdatePlaylist}
        />
      )}

      <Nav 
        currentView={view}
        onNavigate={handleNavigate} 
      />
      
      {/* HOME PAGE VIEW */}
      {view === 'HOME' && (
        <>
          {/* HERO SECTION */}
          <header className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b-4 border-white">
            {/* Abstract Background Shapes */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-10 left-10 w-64 h-64 border-[20px] border-acid-green rounded-full mix-blend-difference animate-pulse"></div>
              <div className="absolute bottom-20 right-10 w-96 h-96 border-[4px] border-shock-pink rotate-45"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-20 bg-white -rotate-12"></div>
            </div>

            <div className="relative z-10 text-center px-4">
              <div className="bg-white text-black px-6 py-2 inline-block transform -rotate-3 mb-6 border-4 border-black shadow-hard-green">
                <span className="font-marker text-xl md:text-3xl">{siteContent.heroTagline}</span>
              </div>
              
              <h1 className="text-[15vw] leading-[0.85] font-sans font-gritty tracking-wide select-none flex flex-col items-center justify-center">
                {/* SURPRISE */}
                <div className="relative inline-block transform -rotate-2 hover:rotate-1 transition-transform duration-300">
                  <span className="relative z-10 text-white mix-blend-difference grunge-shadow">
                     {siteContent.heroHeadline1}
                  </span>
                  {/* Textured Overlay */}
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-noise opacity-50 z-20 pointer-events-none" aria-hidden="true">
                    {siteContent.heroHeadline1}
                  </span>
                </div>
                
                {/* MOVE */}
                <div className="relative inline-block transform rotate-1 hover:-rotate-1 transition-transform duration-300">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-br from-acid-green to-shock-pink grunge-shadow-light">
                    {siteContent.heroHeadline2}
                  </span>
                  {/* Textured Overlay */}
                  <span className="absolute inset-0 text-transparent bg-clip-text bg-noise opacity-40 mix-blend-multiply z-20 pointer-events-none" aria-hidden="true">
                    {siteContent.heroHeadline2}
                  </span>
                </div>
              </h1>
              
              <div className="mt-8 font-mono text-white text-lg md:text-2xl max-w-2xl mx-auto border-l-4 border-acid-green pl-6 text-left whitespace-pre-wrap">
                {siteContent.heroDescription}
              </div>
            </div>

            <div className="absolute bottom-10 animate-bounce">
              <ArrowDown size={48} className="text-white" />
            </div>
          </header>

          {/* MANIFESTO TEASER (Previously About) */}
          <section className="py-24 bg-white text-black relative border-b-4 border-black">
            <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-black translate-x-4 translate-y-4"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1547447134-cd3f5c716030?q=80&w=800&auto=format&fit=crop" 
                    alt="Skate Bowl" 
                    className="relative border-4 border-black z-10 grayscale hover:grayscale-0 transition-all duration-500" 
                  />
                </div>
                <div>
                  <h2 className="text-6xl md:text-8xl font-sans leading-none mb-6 whitespace-pre-wrap">{siteContent.aboutTitle}</h2>
                  <div className="font-mono text-lg mb-8 whitespace-pre-wrap space-y-4">
                    {siteContent.aboutText.split('\n\n')[0]} {/* Only show first paragraph as teaser */}
                  </div>
                  <button 
                    onClick={() => handleNavigate('ABOUT')}
                    className="bg-black text-white px-8 py-3 font-sans text-2xl uppercase border-4 border-transparent hover:bg-white hover:text-black hover:border-black hover:shadow-hard-pink transition-all"
                  >
                    READ FULL STORY
                  </button>
                </div>
            </div>
          </section>

          {/* WORK SECTION */}
          <section id="work" className="scroll-mt-28 py-24 px-4 bg-gnar-black relative">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-30 pointer-events-none"></div>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-6xl md:text-9xl text-white font-sans text-center mb-8 text-outline select-none">
                THE LAB
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                {projects.map((project, index) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    index={index} 
                    onOpen={() => setSelectedProject(project)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* ARCADE GAME SECTION */}
          <section className="bg-gnar-black py-12 border-t-4 border-white">
            <ArcadeGame />
          </section>

          {/* CONTACT SECTION */}
          <section className="py-24 bg-acid-green text-black border-y-4 border-black relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 font-marker text-4xl opacity-20 -rotate-12 pointer-events-none">
              INSERT COIN
            </div>

            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-5xl md:text-7xl font-sans mb-8 leading-none">
                <span className="whitespace-pre-wrap">{siteContent.contactTitle}</span> <span className="text-shock-pink">{siteContent.contactSubtitle}</span>
              </h2>
              
              <ContactForm />
            </div>
          </section>
        </>
      )}

      {/* ORACLE PAGE VIEW */}
      {view === 'ORACLE' && (
        <section className="flex-grow bg-gradient-to-b from-gnar-black to-gray-900 flex flex-col items-center justify-center relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-10 pointer-events-none"></div>
          <Oracle />
        </section>
      )}

      {/* MIXTAPE PAGE VIEW */}
      {view === 'MIXTAPE' && (
        <section className="flex-grow bg-gnar-black relative flex flex-col">
          <MusicPlayer initialPlaylist={playlist} />
        </section>
      )}

      {/* ABOUT PAGE VIEW */}
      {view === 'ABOUT' && (
        <section className="flex-grow bg-gnar-black relative flex flex-col">
          <AboutPage content={siteContent} />
        </section>
      )}

      {/* FOOTER */}
      <Footer showStaffButton onStaffClick={() => setIsMgmtOpen(true)} />
    </div>
  );
};

export default App;
