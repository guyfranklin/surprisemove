
import React, { useState } from 'react';
import { Project, SiteContent, Song } from '../types';
import { X, Save, Trash2, Plus, Terminal, Type, LayoutTemplate, Check, Disc, Upload } from 'lucide-react';
import { Footer } from './Footer';

interface LabManagementProps {
  projects: Project[];
  siteContent: SiteContent;
  playlist: Song[];
  onClose: () => void;
  onSaveProject: (project: Project) => void;
  onDeleteProject: (id: string) => void;
  onUpdateContent: (content: SiteContent) => void;
  onUpdatePlaylist: (playlist: Song[]) => void;
}

const EMPTY_PROJECT: Project = {
  id: '',
  title: '',
  description: '',
  fullDescription: '',
  features: [],
  techStack: [],
  tags: [],
  imageUrl: 'https://picsum.photos/600/400',
  gallery: [],
  link: '#',
  status: 'CONCEPT TESTING'
};

export const LabManagement: React.FC<LabManagementProps> = ({
  projects,
  siteContent,
  playlist,
  onClose,
  onSaveProject,
  onDeleteProject,
  onUpdateContent,
  onUpdatePlaylist
}) => {
  const [activeTab, setActiveTab] = useState<'PROJECTS' | 'CONTENT' | 'MIXTAPE'>('PROJECTS');
  const [view, setView] = useState<'LIST' | 'EDIT'>('LIST');
  const [currentProject, setCurrentProject] = useState<Project>(EMPTY_PROJECT);
  const [editedContent, setEditedContent] = useState<SiteContent>(siteContent);
  const [notification, setNotification] = useState<string | null>(null);

  // Mixtape State
  const [newSongName, setNewSongName] = useState('');
  const [newSongUrl, setNewSongUrl] = useState('');

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Project Handlers
  const handleEditProject = (project: Project) => {
    setCurrentProject(project);
    setView('EDIT');
  };

  const handleCreateProject = () => {
    setCurrentProject({
      ...EMPTY_PROJECT,
      id: Date.now().toString(),
    });
    setView('EDIT');
  };

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProject(currentProject);
    setView('LIST');
    showNotification('PROTOCOL SAVED SUCCESSFULLY');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('ARE YOU SURE YOU WANT TO TERMINATE THIS PROTOCOL?')) {
      onDeleteProject(id);
      setView('LIST');
      showNotification('PROTOCOL TERMINATED');
    }
  };

  const updateArrayField = (field: keyof Project, value: string) => {
    const arr = value.split('\n').filter(line => line.trim() !== '');
    // @ts-ignore - dynamic assignment safe here
    setCurrentProject(prev => ({ ...prev, [field]: arr }));
  };

  // Content Handlers
  const handleSaveContent = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateContent(editedContent);
    showNotification('SYSTEM CORE UPDATED. CACHE REFRESHED.');
  };

  const updateContentValues = (value: string) => {
    const arr = value.split('\n').filter(line => line.trim() !== '');
    setEditedContent(prev => ({ ...prev, aboutValues: arr }));
  }

  // Mixtape Handlers
  const handleAddSong = () => {
    if (!newSongName || !newSongUrl) {
      alert("MISSING DATA. INPUT REQUIRED.");
      return;
    }
    const newSong: Song = {
      id: `track_${Date.now()}`,
      name: newSongName,
      url: newSongUrl
    };
    onUpdatePlaylist([...playlist, newSong]);
    setNewSongName('');
    setNewSongUrl('');
    showNotification('TRACK ADDED TO MIXTAPE');
  };

  const handleDeleteSong = (id: string) => {
    const updated = playlist.filter(s => s.id !== id);
    onUpdatePlaylist(updated);
    showNotification('TRACK DELETED');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setNewSongUrl(ev.target.result as string);
          if (!newSongName) {
            setNewSongName(file.name.replace(/\.[^/.]+$/, ""));
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper for status colors in list view
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'LIVE': return 'bg-green-500 shadow-[0_0_8px_#0f0]';
      case 'MVP': return 'bg-yellow-500 shadow-[0_0_8px_#eb0]';
      case 'CONCEPT TESTING': return 'bg-cyan-400 shadow-[0_0_8px_#0ff]';
      case 'HACKING IT': return 'bg-orange-500 shadow-[0_0_8px_#f90]';
      case 'MATURE/EXIT': return 'bg-purple-500 shadow-[0_0_8px_#a0f]';
      case 'DEAD': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black text-green-500 font-mono overflow-hidden flex flex-col">
      {/* CRT Scanline effect */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[200] bg-green-500 text-black px-6 py-3 font-bold border-2 border-white shadow-[0_0_20px_rgba(0,255,0,0.5)] flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 uppercase tracking-wider">
          <Check size={20} />
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="p-4 border-b border-green-500/50 flex justify-between items-center bg-black/90 relative z-30 shadow-[0_0_10px_rgba(0,255,0,0.2)]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal size={24} />
            <h1 className="text-xl font-bold tracking-widest hidden md:block">LAB_MANAGEMENT_SYSTEM_v1.0</h1>
          </div>
          <div className="flex border border-green-500/50 overflow-x-auto">
            <button
              onClick={() => setActiveTab('PROJECTS')}
              className={`px-4 py-1 flex items-center gap-2 text-sm uppercase whitespace-nowrap ${activeTab === 'PROJECTS' ? 'bg-green-500 text-black font-bold' : 'hover:bg-green-500/10'}`}
            >
              <LayoutTemplate size={16} /> Protocols
            </button>
            <button
              onClick={() => setActiveTab('CONTENT')}
              className={`px-4 py-1 flex items-center gap-2 text-sm uppercase whitespace-nowrap ${activeTab === 'CONTENT' ? 'bg-green-500 text-black font-bold' : 'hover:bg-green-500/10'}`}
            >
              <Type size={16} /> Site Copy
            </button>
            <button
              onClick={() => setActiveTab('MIXTAPE')}
              className={`px-4 py-1 flex items-center gap-2 text-sm uppercase whitespace-nowrap ${activeTab === 'MIXTAPE' ? 'bg-green-500 text-black font-bold' : 'hover:bg-green-500/10'}`}
            >
              <Disc size={16} /> Mixtape
            </button>
          </div>
        </div>
        <button onClick={onClose} className="hover:text-white hover:bg-green-900 px-3 py-1 border border-green-500">
          <X size={20} /> EXIT
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative z-30 flex flex-col">

        <div className="p-4 md:p-8 flex-grow">

          {/* CONTENT EDITOR TAB */}
          {activeTab === 'CONTENT' && (
            <div className="max-w-4xl mx-auto border border-green-500 p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
              <div className="flex justify-between items-center mb-6 border-b border-green-500/30 pb-4">
                <h2 className="text-2xl font-bold">GLOBAL SITE COPY</h2>
                <div className="text-sm opacity-70">Changes reflect immediately</div>
              </div>

              <form onSubmit={handleSaveContent} className="space-y-8">
                {/* Hero Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold bg-green-900/20 p-2 border-l-4 border-green-500">HERO SECTION</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Tagline (Box)</label>
                      <input
                        type="text"
                        value={editedContent.heroTagline}
                        onChange={e => setEditedContent({ ...editedContent, heroTagline: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Main Headline 1</label>
                      <input
                        type="text"
                        value={editedContent.heroHeadline1}
                        onChange={e => setEditedContent({ ...editedContent, heroHeadline1: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Main Headline 2 (Gradient)</label>
                      <input
                        type="text"
                        value={editedContent.heroHeadline2}
                        onChange={e => setEditedContent({ ...editedContent, heroHeadline2: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-xs uppercase mb-1 opacity-70">Hero Description (Supports newlines)</label>
                      <textarea
                        rows={3}
                        value={editedContent.heroDescription}
                        onChange={e => setEditedContent({ ...editedContent, heroDescription: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* About Teaser (Landing Page) */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold bg-green-900/20 p-2 border-l-4 border-green-500">LANDING PAGE: ABOUT SECTION</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Section Title (e.g., THE RULES HAVE CHANGED)</label>
                      <textarea
                        rows={2}
                        value={editedContent.aboutTitle}
                        onChange={e => setEditedContent({ ...editedContent, aboutTitle: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Origin Story (Short Text)</label>
                      <textarea
                        rows={4}
                        value={editedContent.aboutText}
                        onChange={e => setEditedContent({ ...editedContent, aboutText: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Full About Page */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold bg-green-900/20 p-2 border-l-4 border-green-500">FULL ABOUT PAGE</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Page Headline (Overlay H1)</label>
                      <textarea
                        rows={2}
                        value={editedContent.aboutHeadline || ''}
                        onChange={e => setEditedContent({ ...editedContent, aboutHeadline: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                        placeholder="WE ARE THE GLITCH"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">The Mission/Manifesto Text</label>
                      <textarea
                        rows={6}
                        value={editedContent.aboutManifesto || ''}
                        onChange={e => setEditedContent({ ...editedContent, aboutManifesto: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Core Values (One per line)</label>
                      <textarea
                        rows={5}
                        value={editedContent.aboutValues?.join('\n') || ''}
                        onChange={e => updateContentValues(e.target.value)}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Footer Quote</label>
                      <input
                        type="text"
                        value={editedContent.aboutQuote || ''}
                        onChange={e => setEditedContent({ ...editedContent, aboutQuote: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Contact Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold bg-green-900/20 p-2 border-l-4 border-green-500">CONTACT SECTION</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Heading</label>
                      <input
                        type="text"
                        value={editedContent.contactTitle}
                        onChange={e => setEditedContent({ ...editedContent, contactTitle: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Sub-heading (Colored)</label>
                      <input
                        type="text"
                        value={editedContent.contactSubtitle}
                        onChange={e => setEditedContent({ ...editedContent, contactSubtitle: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-green-500/30 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-500 text-black font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] uppercase flex items-center gap-2"
                  >
                    <Save size={18} /> UPDATE SYSTEM
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* MIXTAPE TAB */}
          {activeTab === 'MIXTAPE' && (
            <div className="max-w-4xl mx-auto border border-green-500 p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
              <div className="flex justify-between items-center mb-6 border-b border-green-500/30 pb-4">
                <h2 className="text-2xl font-bold">AUDIO DATABASE</h2>
                <div className="text-sm opacity-70">MANAGE MIXTAPE TRACKS</div>
              </div>

              {/* Add New Song Section */}
              <div className="bg-green-900/10 p-6 border border-green-500/30 mb-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-white">
                  <Plus size={18} /> INGEST NEW AUDIO
                </h3>
                <div className="grid md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-4">
                    <label className="block text-xs uppercase mb-1 opacity-70">Track Title</label>
                    <input
                      type="text"
                      value={newSongName}
                      onChange={(e) => setNewSongName(e.target.value)}
                      placeholder="e.g. Neon Nights"
                      className="w-full bg-black border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                    />
                  </div>
                  <div className="md:col-span-6">
                    <label className="block text-xs uppercase mb-1 opacity-70">Audio Source</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSongUrl}
                        onChange={(e) => setNewSongUrl(e.target.value)}
                        placeholder="https://... or Upload ->"
                        className="flex-grow bg-black border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                      <label className="cursor-pointer bg-green-500/20 hover:bg-green-500/40 border border-green-500/50 p-2 flex items-center justify-center text-green-500 transition-colors" title="Upload File (Base64)">
                        <Upload size={20} />
                        <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      onClick={handleAddSong}
                      className="w-full bg-green-500 text-black font-bold p-2 hover:bg-white transition-colors uppercase"
                    >
                      ADD
                    </button>
                  </div>
                </div>
                <p className="text-[10px] mt-2 opacity-50 text-red-400">
                  WARNING: Uploading files converts them to Base64 (Data URI) for local storage. Large files (&gt;3MB) may crash the storage. Prefer direct URLs for stability.
                </p>
              </div>

              {/* Playlist */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase mb-2 opacity-70">Current Playlist Sequence</h3>
                {playlist.length === 0 && (
                  <div className="text-center py-8 opacity-50 border border-green-500/20 border-dashed">
                    NO TRACKS FOUND IN DATABASE
                  </div>
                )}
                {playlist.map((song, index) => (
                  <div key={song.id} className="flex justify-between items-center bg-green-900/5 border border-green-500/20 p-3 hover:bg-green-900/20 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="font-mono opacity-50 w-6">{(index + 1).toString().padStart(2, '0')}</span>
                      <div className="flex flex-col">
                        <span className="font-bold text-white">{song.name}</span>
                        <span className="text-[10px] opacity-60 truncate max-w-[200px]">{song.url}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteSong(song.id)}
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'PROJECTS' && (
            <>
              {view === 'LIST' ? (
                <div className="max-w-5xl mx-auto">
                  <div className="flex justify-between items-end mb-8 border-b border-green-500/30 pb-4">
                    <div>
                      <h2 className="text-3xl font-bold mb-2">ACTIVE PROTOCOLS</h2>
                      <p className="text-green-500/70 text-sm">Total running experiments: {projects.length}</p>
                    </div>
                    <button
                      onClick={handleCreateProject}
                      className="bg-green-500 text-black px-6 py-3 font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] flex items-center gap-2 transition-all"
                    >
                      <Plus size={20} /> INITIATE NEW PROTOCOL
                    </button>
                  </div>

                  <div className="grid gap-4">
                    {projects.map((p) => (
                      <div key={p.id} className="border border-green-500/30 p-4 hover:bg-green-900/10 flex justify-between items-center group transition-colors">
                        <div className="flex items-center gap-6">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(p.status)}`}></div>
                          <div>
                            <h3 className="text-xl font-bold group-hover:text-white transition-colors">{p.title}</h3>
                            <span className="text-xs uppercase opacity-50">{p.id} // {p.tags.join(', ')}</span>
                          </div>
                        </div>
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleEditProject(p)}
                            className="px-4 py-2 border border-green-500/50 hover:bg-green-500 hover:text-black uppercase text-sm"
                          >
                            Access Data
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-4 py-2 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto bg-black border border-green-500 p-6 shadow-[0_0_20px_rgba(0,255,0,0.1)]">
                  <div className="flex justify-between items-center mb-6 border-b border-green-500/30 pb-4">
                    <h2 className="text-2xl font-bold">EDITING: {currentProject.title || 'NEW PROTOCOL'}</h2>
                    <button onClick={() => setView('LIST')} className="text-sm underline hover:text-white">CANCEL EDIT</button>
                  </div>

                  <form onSubmit={handleSubmitProject} className="space-y-6">

                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase mb-1 opacity-70">Project Title</label>
                        <input
                          type="text"
                          value={currentProject.title}
                          onChange={e => setCurrentProject({ ...currentProject, title: e.target.value })}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                        />
                      </div>
                      <div className="col-span-2 md:col-span-1">
                        <label className="block text-xs uppercase mb-1 opacity-70">Status</label>
                        <select
                          value={currentProject.status}
                          onChange={e => setCurrentProject({ ...currentProject, status: e.target.value as any })}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                        >
                          <option value="CONCEPT TESTING">CONCEPT TESTING</option>
                          <option value="HACKING IT">HACKING IT</option>
                          <option value="MVP">MVP</option>
                          <option value="LIVE">LIVE</option>
                          <option value="MATURE/EXIT">MATURE/EXIT</option>
                          <option value="DEAD">DEAD</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Short Description (Card)</label>
                      <input
                        type="text"
                        value={currentProject.description}
                        onChange={e => setCurrentProject({ ...currentProject, description: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase mb-1 opacity-70">Full Description (Showcase)</label>
                      <textarea
                        rows={4}
                        value={currentProject.fullDescription || ''}
                        onChange={e => setCurrentProject({ ...currentProject, fullDescription: e.target.value })}
                        className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs uppercase mb-1 opacity-70">Image URL</label>
                        <input
                          type="text"
                          value={currentProject.imageUrl}
                          onChange={e => setCurrentProject({ ...currentProject, imageUrl: e.target.value })}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase mb-1 opacity-70">Project Link</label>
                        <input
                          type="text"
                          value={currentProject.link}
                          onChange={e => setCurrentProject({ ...currentProject, link: e.target.value })}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 focus:outline-none focus:border-green-500 text-white"
                        />
                      </div>
                    </div>

                    {/* Array Fields */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs uppercase mb-1 opacity-70">Tags (One per line)</label>
                        <textarea
                          rows={5}
                          value={currentProject.tags.join('\n')}
                          onChange={e => updateArrayField('tags', e.target.value)}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 text-sm focus:outline-none focus:border-green-500 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase mb-1 opacity-70">Tech Stack (One per line)</label>
                        <textarea
                          rows={5}
                          value={currentProject.techStack?.join('\n')}
                          onChange={e => updateArrayField('techStack', e.target.value)}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 text-sm focus:outline-none focus:border-green-500 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs uppercase mb-1 opacity-70">Features (One per line)</label>
                        <textarea
                          rows={5}
                          value={currentProject.features?.join('\n')}
                          onChange={e => updateArrayField('features', e.target.value)}
                          className="w-full bg-green-900/10 border border-green-500/50 p-2 text-sm focus:outline-none focus:border-green-500 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="pt-6 border-t border-green-500/30 flex justify-end gap-4">
                      <button
                        type="button"
                        onClick={() => setView('LIST')}
                        className="px-6 py-3 border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-black uppercase"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-8 py-3 bg-green-500 text-black font-bold hover:bg-white hover:shadow-[0_0_15px_rgba(0,255,0,0.5)] uppercase flex items-center gap-2"
                      >
                        <Save size={18} /> Save Protocol
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};
