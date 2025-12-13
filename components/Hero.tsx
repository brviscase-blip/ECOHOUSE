import React, { useState } from 'react';
import { ArrowRight, Upload } from 'lucide-react';

interface HeroProps {
  isAdmin?: boolean;
}

const Hero: React.FC<HeroProps> = ({ isAdmin }) => {
  const [bgUrl, setBgUrl] = useState<string>(() => {
    return localStorage.getItem('cs_hero_bg') || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80";
  });

  const handleBgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setBgUrl(base64);
        localStorage.setItem('cs_hero_bg', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex items-center overflow-hidden group/hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bgUrl}
          alt="Arquitetura Moderna"
          className="w-full h-full object-cover animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-slate-950/85"></div>
      </div>

      {/* Editor Controls - Moved to high z-index and fixed pointer events */}
      {isAdmin && (
        <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none opacity-0 group-hover/hero:opacity-100 transition-opacity duration-500 bg-slate-950/20 backdrop-blur-[2px]">
          <label className="pointer-events-auto flex items-center gap-3 px-8 py-4 bg-white text-slate-900 rounded-full text-[10px] font-extrabold uppercase tracking-widest cursor-pointer hover:bg-emerald-50 transition-all shadow-2xl hover:-translate-y-1">
            <Upload className="h-4 w-4" />
            Alterar Fundo do Hero
            <input type="file" accept="image/*" onChange={handleBgUpload} className="hidden" />
          </label>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="max-w-4xl space-y-8 animate-fade-in-up">
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-emerald-500"></div>
            <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.4em] font-sans">Engenharia de Alto Padrão</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tighter font-display text-shadow-xl">
            ESTRUTURANDO O <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-100">AMANHÃ.</span>
          </h1>
          
          <p className="text-base md:text-lg text-gray-400 font-light max-w-xl leading-relaxed font-sans">
            Sustentabilidade não é um diferencial, é o nosso fundamento. Projetos que unem tecnologia avançada e consciência ambiental absoluta para ativos imobiliários de valor.
          </p>
          
          <div className="flex flex-wrap gap-5 pt-6 font-sans">
            <a
              href="#projects"
              className="group flex items-center gap-4 px-10 py-5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-[0.3em] transition-all"
            >
              Ver Portfolio
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
            </a>
            <a
              href="#contact"
              className="flex items-center gap-4 px-10 py-5 border border-white/20 hover:border-emerald-500 text-white text-[10px] font-bold uppercase tracking-[0.3em] backdrop-blur-sm transition-all"
            >
              Consultoria Técnica
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce z-10">
        <div className="w-px h-12 bg-gradient-to-b from-emerald-500/0 via-emerald-500 to-emerald-500/0"></div>
      </div>
    </section>
  );
};

export default Hero;