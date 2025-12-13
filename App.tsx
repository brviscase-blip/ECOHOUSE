import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Navbar />
      
      <main>
        <Hero />
        <Services />
        
        <section id="sustainability" className="py-20 bg-emerald-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1542332213-31f87348057f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Casa Sustentável de Alto Padrão" 
                className="rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500 w-full aspect-[4/5] object-cover"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <h2 className="text-emerald-400 font-semibold uppercase tracking-wider">Nosso Compromisso</h2>
              <h3 className="text-4xl font-bold">Construção Verde não é apenas tendência, é necessidade.</h3>
              <p className="text-emerald-100 text-lg leading-relaxed">
                Na CONSTRUÇÕES SUSTENTÁVEIS, cada projeto é pensado para minimizar o impacto ambiental. Utilizamos materiais recicláveis, sistemas de eficiência energética e gestão inteligente de resíduos em todos os canteiros de obra.
              </p>
              <ul className="space-y-4 mt-4">
                {[
                  'Certificação LEED em grandes projetos',
                  'Redução de 30% no consumo de água',
                  'Uso de energia solar nos canteiros',
                  'Descarte responsável de entulho'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <Portfolio />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;