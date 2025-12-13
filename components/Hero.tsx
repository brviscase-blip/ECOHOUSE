import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-20 h-screen min-h-[700px] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Arquitetura Moderna"
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/70 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-3xl space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-emerald-400/20 bg-emerald-950/40 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-[0.2em]">
            Construções Sustentáveis
          </div>
          <h1 className="text-6xl md:text-8xl font-bold leading-[1.1] tracking-tight">
            Futuro Construímos <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Agora!</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-xl leading-relaxed">
            Unindo a precisão da engenharia de alto padrão com o respeito absoluto pelo meio ambiente.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-6">
            <a
              href="#projects"
              className="inline-flex justify-center items-center px-10 py-4 text-sm font-bold uppercase tracking-widest rounded-none text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-2xl hover:shadow-emerald-500/40"
            >
              Nossos Projetos
              <ArrowRight className="ml-3 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex justify-center items-center px-10 py-4 text-sm font-bold uppercase tracking-widest border border-white/30 hover:border-white/80 text-white backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all rounded-none"
            >
              Solicitar Proposta
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;