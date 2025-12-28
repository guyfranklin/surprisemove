
import React, { useState } from 'react';
import { CheckSquare, Square } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    newsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data
    alert("RIGHT ON! MESSAGE SENT. WE'LL GET BACK TO YOU... EVENTUALLY.");
    setFormData({ name: '', email: '', message: '', newsletter: false });
  };

  return (
    <div className="bg-white border-4 border-black p-6 shadow-hard-green relative max-w-2xl mx-auto transform rotate-1 mt-12">
      <div className="absolute -top-6 -left-6 bg-shock-pink text-white font-sans text-2xl px-4 py-2 border-2 border-black shadow-hard-black transform -rotate-3 z-10">
        GET IN TOUCH
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6 mt-4">
        <div>
          <label className="block font-mono font-bold mb-2 uppercase text-lg text-black">Who Are You?</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-gray-100 border-2 border-black p-3 font-mono text-black focus:outline-none focus:bg-yellow-100 focus:shadow-hard-black transition-all"
            placeholder="YOUR NAME"
          />
        </div>

        <div>
          <label className="block font-mono font-bold mb-2 uppercase text-lg text-black">Where Can We Reach You?</label>
          <input 
            type="email" 
            required
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            className="w-full bg-gray-100 border-2 border-black p-3 font-mono text-black focus:outline-none focus:bg-yellow-100 focus:shadow-hard-black transition-all"
            placeholder="YOUR EMAIL"
          />
        </div>

        <div>
          <label className="block font-mono font-bold mb-2 uppercase text-lg text-black">Spill It</label>
          <textarea 
            required
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
            rows={4}
            className="w-full bg-gray-100 border-2 border-black p-3 font-mono text-black focus:outline-none focus:bg-yellow-100 focus:shadow-hard-black transition-all resize-none"
            placeholder="SEND US A MIXTAPE TRACKLIST OR A RANT..."
          />
        </div>

        <div 
          className="flex items-start gap-3 cursor-pointer group"
          onClick={() => setFormData({...formData, newsletter: !formData.newsletter})}
        >
          <div className="mt-1 text-black">
            {formData.newsletter ? <CheckSquare size={24} /> : <Square size={24} />}
          </div>
          <p className="font-mono text-sm leading-tight select-none text-black group-hover:text-shock-pink transition-colors">
            Sign me up for updates and the occasional newsletter when we get around to it (which may be never).
          </p>
        </div>

        <button 
          type="submit" 
          className="w-full bg-black text-white font-sans text-3xl uppercase py-4 border-2 border-black hover:bg-acid-green hover:text-black hover:shadow-hard-pink transition-all active:translate-y-1 active:shadow-none"
        >
          SEND IT
        </button>
      </form>
    </div>
  );
};
