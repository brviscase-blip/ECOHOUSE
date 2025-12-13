import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Resources from './components/Resources';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <Navbar />
      
      <main>
        <Hero />
        
        <Services />
        
        <section id="sustainability" className="py-32 bg-emerald-950 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-30"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-4 border border-emerald-500/20 group-hover:border-emerald-500/50 transition-colors duration-500 pointer-events-none"></div>
              <img 
                src="https://images.unsplash.com/photo-1449156001437-3a1621dfbe69?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Arquitetura Verde" 
                className="relative z-10 w-full aspect-[4/5] object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="md:w-1/2 space-y-10">
              <div className="space-y-4">
                <h2 className="text-emerald-400 font-bold uppercase tracking-[0.3em] text-xs">Manifesto Verde</h2>
                <h3 className="text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
                  A sustentabilidade é o nosso <br/><span className="italic font-light">código-fonte.</span>
                </h3>
              </div>
              
              <p className="text-emerald-100/70 text-lg font-light leading-relaxed">
                Na CONSTRUÇÕES SUSTENTÁVEIS, não apenas seguimos normas, nós as desafiamos. Cada viga, cada painel e cada sistema é escolhido para garantir que o legado que deixamos seja tão resiliente quanto a natureza.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {[
                  'Engenharia de Baixo Carbono',
                  'Gestão Inteligente de Água',
                  'Canteiros Energia Zero',
                  'Economia Circular de Materiais'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-2 h-2 bg-emerald-500 flex-shrink-0"></div>
                    <span className="text-sm font-bold uppercase tracking-widest text-emerald-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Portfolio />
        
        <Resources />
        
        <Blog />
        
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;