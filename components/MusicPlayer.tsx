
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, ArrowRight, Disc, Terminal, Activity } from 'lucide-react';
import { Song } from '../types';

interface MusicPlayerProps {
  initialPlaylist?: Song[];
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ initialPlaylist = [] }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // If initial playlist has items, select the first one by default
  useEffect(() => {
    if (initialPlaylist.length > 0 && currentSongIndex === -1) {
      setCurrentSongIndex(0);
    }
  }, [initialPlaylist, currentSongIndex]);

  const currentSong = initialPlaylist[currentSongIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (currentSongIndex !== -1 && audioRef.current && isPlaying) {
         const playPromise = audioRef.current.play();
         if (playPromise !== undefined) {
           playPromise.catch(e => {
             console.warn("Playback error - user interaction required or invalid source", e);
             setIsPlaying(false);
           });
         }
    }
  }, [currentSongIndex, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        console.error("Play failed", e);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  const nextSong = () => {
    if (initialPlaylist.length === 0) return;
    let nextIndex = currentSongIndex + 1;
    if (nextIndex >= initialPlaylist.length) nextIndex = 0;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const prevSong = () => {
    if (initialPlaylist.length === 0) return;
    let prevIndex = currentSongIndex - 1;
    if (prevIndex < 0) prevIndex = initialPlaylist.length - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };
  
  const handleAudioError = (e: any) => {
    console.warn("Audio load error detected", e);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-full bg-gnar-black flex flex-col">
      
      {/* Header (Project File Style) */}
      <div className="sticky top-[80px] z-40 bg-white border-b-4 border-black p-4 flex justify-between items-center shadow-hard-pink">
        <div className="flex items-center gap-4">
          <div className="bg-black text-white font-mono font-bold px-4 py-2 border-2 border-black flex items-center gap-2 uppercase">
            <Disc size={20} /> SURPRISE MIX // VOL. 1
          </div>
          <span className="hidden md:block font-mono font-bold text-black uppercase tracking-widest opacity-60">
            STATUS: {isPlaying ? 'PLAYING' : 'IDLE'}
          </span>
        </div>
        <div className="font-sans text-2xl uppercase tracking-tighter text-black">
          SONIC_LAB_INTERFACE
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8 w-full flex-grow">
        
        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COL: Cassette Deck Visuals */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Cassette Container */}
            <div className="relative border-4 border-white bg-black group p-8 lg:p-12 flex items-center justify-center overflow-hidden">
               {/* Background Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
               
               {/* Industrial Label */}
               <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 font-mono text-sm border border-white z-10">
                 FIG 1.0 - AUDIO DECK
               </div>
               
               {/* Status LED */}
               <div className="absolute top-4 right-4 flex items-center gap-2">
                 <span className="font-mono text-xs text-white">PWR</span>
                 <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-acid-green shadow-[0_0_10px_#ccff00]' : 'bg-red-500 shadow-[0_0_10px_#ff0000]'}`}></div>
               </div>

               {/* --- THE CASSETTE TAPE --- */}
               <div className={`relative w-full max-w-lg aspect-[1.6/1] bg-[#1a1a1a] rounded-lg shadow-[0_10px_30px_rgba(0,0,0,1)] border-2 border-gray-700 transition-transform duration-500 ${isPlaying ? 'scale-[1.02]' : 'scale-100'}`}>
                    {/* Screws */}
                    {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                      <div key={i} className={`absolute ${pos} w-3 h-3 bg-gray-600 rounded-full flex items-center justify-center`}>
                        <div className="w-1 h-[2px] bg-gray-900 rotate-45"></div>
                      </div>
                    ))}

                    {/* Label Area */}
                    <div className="absolute top-4 left-4 right-4 bottom-12 bg-[#ddd] rounded-sm overflow-hidden flex flex-col items-center border border-black/20">
                        <div className="w-full h-6 bg-shock-pink flex items-center justify-between px-3">
                           <span className="font-sans font-bold text-black text-sm">HI-FIDELITY</span>
                           <span className="font-sans font-bold text-black text-sm">60 MIN</span>
                        </div>
                        <div className="flex-1 w-full bg-[#eee] relative flex flex-col items-center justify-center p-2">
                            <h3 className="font-marker text-xl md:text-3xl text-black -rotate-1 truncate max-w-full text-center">
                              {currentSong?.name || "NO TAPE INSERTED"}
                            </h3>
                            <div className="w-full h-[1px] bg-gray-400 mt-2"></div>
                            <div className="w-full h-[1px] bg-gray-400 mt-1"></div>
                        </div>

                        {/* Cutout */}
                        <div className="w-[70%] h-20 mb-3 bg-gray-800 rounded-full border-4 border-gray-500 relative flex items-center justify-center overflow-hidden shadow-inner">
                             {/* Left Spool */}
                             <div className="absolute left-3 w-14 h-14 rounded-full bg-white flex items-center justify-center animate-[spin_4s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                                {[0, 60, 120, 180, 240, 300].map(deg => (
                                  <div key={deg} className="absolute w-2 h-4 bg-gray-300 rounded-full" style={{ transform: `rotate(${deg}deg) translateY(-6px)` }}></div>
                                ))}
                             </div>
                             {/* Tape */}
                             <div className="absolute w-[50%] h-14 bg-black"></div>
                             {/* Right Spool */}
                             <div className="absolute right-3 w-14 h-14 rounded-full bg-white flex items-center justify-center animate-[spin_4s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
                                {[0, 60, 120, 180, 240, 300].map(deg => (
                                  <div key={deg} className="absolute w-2 h-4 bg-gray-300 rounded-full" style={{ transform: `rotate(${deg}deg) translateY(-6px)` }}></div>
                                ))}
                             </div>
                        </div>
                    </div>

                    {/* Bottom Housing */}
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#222] rounded-b-lg flex justify-center items-end pb-2">
                        <div className="w-1/2 h-full flex justify-center items-end gap-6 pb-2">
                           <div className="w-2 h-2 bg-black rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
                           <div className="w-12 h-6 bg-black rounded-t-md shadow-inner border-t border-gray-600"></div>
                           <div className="w-2 h-2 bg-black rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"></div>
                        </div>
                    </div>
               </div>
            </div>

            {/* Visualize Bar (Fake) */}
            <div className="flex gap-1 h-12 items-end justify-center px-4">
              {[...Array(30)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-full bg-acid-green transition-all duration-100"
                  style={{ 
                    height: isPlaying ? `${Math.random() * 100}%` : '10%',
                    opacity: isPlaying ? 1 : 0.3
                  }}
                ></div>
              ))}
            </div>

          </div>

          {/* RIGHT COL: Data & Controls */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* The Controls Box */}
            <div className="bg-white text-black p-6 border-4 border-black shadow-[8px_8px_0px_0px_#ccff00]">
              <h3 className="font-sans text-4xl mb-6 border-b-4 border-black inline-block">CONTROL DECK</h3>
              
              <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center gap-4">
                    <button 
                      onClick={prevSong}
                      className="flex-1 bg-black text-white hover:bg-gray-800 p-4 border-2 border-black shadow-hard-black active:translate-y-1 active:shadow-none transition-all flex justify-center"
                    >
                      <SkipBack size={24} />
                    </button>
                    
                    <button 
                      onClick={togglePlay}
                      className={`flex-[2] p-4 border-2 border-black shadow-hard-black active:translate-y-1 active:shadow-none transition-all flex justify-center ${isPlaying ? 'bg-shock-pink text-white animate-pulse' : 'bg-acid-green text-black'}`}
                    >
                      {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                    </button>
                    
                    <button 
                      onClick={nextSong}
                      className="flex-1 bg-black text-white hover:bg-gray-800 p-4 border-2 border-black shadow-hard-black active:translate-y-1 active:shadow-none transition-all flex justify-center"
                    >
                      <SkipForward size={24} />
                    </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-3 border-2 border-black p-2 bg-gray-100">
                    <button onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.01" 
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-shock-pink"
                    />
                </div>
              </div>
            </div>

            {/* Playlist (Terminal Style) */}
            <div className="bg-black border-4 border-white p-4 font-mono text-sm shadow-[8px_8px_0px_0px_#ff00cc]">
               <div className="border-b border-white/20 pb-2 mb-4 flex justify-between text-white/50">
                 <div className="flex gap-2 items-center">
                    <Terminal size={16} />
                    <span>TRACK_LISTING.LOG</span>
                 </div>
                 <Activity size={16} className={isPlaying ? "text-acid-green animate-pulse" : ""} />
               </div>
               
               <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                 {initialPlaylist.map((song, idx) => (
                   <div 
                     key={song.id}
                     onClick={() => {
                        setCurrentSongIndex(idx);
                        setIsPlaying(true);
                      }}
                     className={`flex gap-3 p-2 cursor-pointer transition-colors border border-transparent ${currentSongIndex === idx ? 'bg-white/10 border-acid-green text-acid-green' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                   >
                     <span className="shrink-0">
                       {currentSongIndex === idx ? '>' : String(idx + 1).padStart(2, '0')}
                     </span>
                     <div className="flex flex-col">
                        <span className="uppercase font-bold tracking-wider">{song.name}</span>
                        <span className="text-[10px] opacity-60">ID: {song.id.toUpperCase()}</span>
                     </div>
                     {currentSongIndex === idx && (
                       <span className="ml-auto animate-pulse text-[10px] self-center">PLAYING</span>
                     )}
                   </div>
                 ))}
                 
                 <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500">
                    // END OF STREAM
                 </div>
               </div>
            </div>

          </div>
        </div>
      </div>

      {currentSong?.url && (
        <audio 
          key={currentSong.url}
          ref={audioRef}
          src={currentSong.url}
          crossOrigin="anonymous"
          onEnded={nextSong}
          onError={handleAudioError}
        />
      )}
    </div>
  );
};
