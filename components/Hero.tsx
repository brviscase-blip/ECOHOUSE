import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative pt-20 h-screen min-h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Modern Eco Construction"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-2xl space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-emerald-400/30 bg-emerald-900/30 backdrop-blur-sm text-emerald-300 text-sm font-semibold uppercase tracking-wider">
            Líder em Construção Verde
          </div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Construindo o Futuro com <span className="text-emerald-400">Sustentabilidade</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
            Especialistas em obras civis e comerciais de alto padrão. Unimos engenharia moderna e responsabilidade ambiental para entregar projetos duradouros e eficientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href="#projects"
              className="inline-flex justify-center items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/30"
            >
              Ver Projetos
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href="#contact"
              className="inline-flex justify-center items-center px-8 py-4 border-2 border-white/20 hover:border-white/40 text-base font-medium rounded-lg text-white backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;