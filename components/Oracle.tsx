
import React, { useState } from 'react';
import { generateSkaterSlang } from '../services/geminiService';
import { Zap, MessageSquare } from 'lucide-react';
import { ChatMessage } from '../types';

export const Oracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<ChatMessage[]>([
    { role: 'model', text: 'YO! STOKED YOU ARE HERE. I AM THE ORACLE OF GNAR. LET\'S BUILD SOMETHING RADICAL.' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: query };
    setHistory(prev => [...prev, userMsg]);
    setQuery('');
    setLoading(true);

    const response = await generateSkaterSlang(userMsg.text);
    
    setHistory(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="min-h-[60vh] flex flex-col justify-center max-w-4xl mx-auto w-full p-4">
      <div className="border-4 border-white bg-gnar-black p-1 relative shadow-hard-pink">
        
        {/* Header of the terminal */}
        <div className="bg-white text-black p-2 flex justify-between items-center mb-1">
           <div className="flex items-center gap-2">
             <Zap size={20} className="fill-current text-black" />
             <h2 className="font-sans text-2xl uppercase">Oracle_v2.5.exe</h2>
           </div>
           <div className="flex gap-1">
             <div className="w-4 h-4 border-2 border-black bg-white"></div>
             <div className="w-4 h-4 border-2 border-black bg-black"></div>
           </div>
        </div>

        {/* Chat Area */}
        <div className="bg-black p-6 min-h-[400px] max-h-[600px] overflow-y-auto font-mono border-2 border-white/20">
          {history.map((msg, idx) => (
            <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-3 border-2 ${
                msg.role === 'user' 
                  ? 'border-acid-green text-acid-green rounded-tl-xl rounded-br-xl' 
                  : 'border-shock-pink text-shock-pink rounded-tr-xl rounded-bl-xl'
              }`}>
                <p className="text-lg leading-snug glitch-text">{msg.text}</p>
              </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start mb-4">
               <div className="border-2 border-shock-pink p-3 text-shock-pink animate-pulse">
                 THINKING...
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleAsk} className="mt-2 flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="TYPE YOUR QUESTION HERE..."
            className="flex-1 bg-gray-900 border-2 border-white text-white p-4 font-mono focus:outline-none focus:border-acid-green uppercase"
          />
          <button 
            type="submit" 
            disabled={loading}
            className="bg-acid-green text-black font-sans text-xl px-8 hover:bg-white border-2 border-white transition-colors disabled:opacity-50"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
};