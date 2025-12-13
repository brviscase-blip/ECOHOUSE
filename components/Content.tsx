
import React, { useState } from 'react';
import { Home, Building2, ArrowRight, Lightbulb } from 'lucide-react';

// Define custom icons outside the component to avoid "used before declaration" errors
const Zap = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 14.71V21h6.29a2.22 2.22 0 0 0 1.57-.66L21 11.05a2.22 2.22 0 0 0 0-3.13l-4.17-4.17a2.22 2.22 0 0 0-3.13 0L3.34 14.14a2.22 2.22 0 0 0-.66 1.57z"></path>
  </svg>
);

const Leaf = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 2 7 0 5-4 9-7 11z"></path>
    <path d="M9 11l-5 5"></path>
    <path d="M5 11l-2 2"></path>
    <path d="M11 7l-2 2"></path>
  </svg>
);

const Award = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"></path>
    <circle cx="12" cy="8" r="6"></circle>
  </svg>
);

const Truck = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
    <path d="M15 18H9"></path>
    <path d="M19 18h2a1 1 0 0 0 1-1v-5h-4l-3 5"></path>
    <path d="M13 9h4"></path>
    <circle cx="7" cy="18" r="2"></circle>
    <circle cx="17" cy="18" r="2"></circle>
  </svg>
);

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'house' | 'pro'>('house');

  const ecoHouseContent = [
    { title: "Casas Autossuficientes", description: "Dicas de como transformar sua residência em um ecossistema produtor de energia.", icon: <Zap className="h-5 w-5" /> },
    { title: "Design Biofílico", description: "Trazendo a natureza para dentro de casa para melhorar a saúde mental.", icon: <Leaf className="h-5 w-5" /> },
    { title: "Automação Smart-Green", description: "Sistemas inteligentes que gerenciam o consumo de água e luz automaticamente.", icon: <Lightbulb className="h-5 w-5" /> }
  ];

  const ecoProContent = [
    { title: "Eficiência Industrial 4.0", description: "Modelagem BIM aplicada à redução drástica de resíduos em grandes canteiros.", icon: <Building2 className="h-5 w-5" /> },
    { title: "Consultoria LEED", description: "O caminho técnico para alcançar as pontuações máximas em certificações globais.", icon: <Award className="h-5 w-5" /> },
    { title: "Logística Carbono Zero", description: "Estratégias para descarbonizar a cadeia de suprimentos da construção civil.", icon: <Truck className="h-5 w-5" /> }
  ];

  return (
    <section id="content" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Conteúdo</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Hub de Inovação</h3>
          <p className="mt-6 text-gray-500 font-light">Explore nossos dois braços de conteúdo técnico e inspiracional.</p>
        </div>

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-100 p-1 rounded-none shadow-inner">
            <button 
              onClick={() => setActiveTab('house')}
              className={`flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'house' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Home className="h-4 w-4" /> EcoHouse
            </button>
            <button 
              onClick={() => setActiveTab('pro')}
              className={`flex items-center gap-3 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'pro' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Building2 className="h-4 w-4" /> EcoPro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in">
          {(activeTab === 'house' ? ecoHouseContent : ecoProContent).map((item, idx) => (
            <div key={idx} className="group p-10 border border-gray-100 bg-white hover:border-emerald-500 transition-all duration-500 hover:shadow-2xl">
              <div className="text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h4>
              <p className="text-sm text-gray-500 font-light leading-relaxed mb-8">{item.description}</p>
              <button className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 group-hover:translate-x-2 transition-transform">
                Ver Guia <ArrowRight className="ml-2 h-3 w-3" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-emerald-50 text-center">
          <h4 className="text-xl font-bold text-slate-900 mb-4">Quer receber novidades técnicas diretamente?</h4>
          <p className="text-gray-600 mb-8 max-w-lg mx-auto font-light">Assine nossa newsletter segmentada e fique por dentro do que há de novo no {activeTab === 'house' ? 'setor residencial' : 'setor corporativo'}.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Seu melhor e-mail" className="flex-grow px-6 py-4 bg-white border-none outline-none text-sm" />
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all">Assinar</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
