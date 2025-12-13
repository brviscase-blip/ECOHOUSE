import React, { useState } from 'react';
import { Home, Building2, ArrowRight, Lightbulb, Zap, Leaf, Award, Truck } from 'lucide-react';

const Content: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'house' | 'pro'>('house');

  const ecoHouseContent = [
    { title: "Casas Autossuficientes", description: "Energia limpa para sua residência com sistemas off-grid.", icon: <Zap className="h-5 w-5" /> },
    { title: "Design Biofílico", description: "Natureza integrada ao lar para bem-estar cognitivo.", icon: <Leaf className="h-5 w-5" /> },
    { title: "Automação Smart", description: "Gestão inteligente de recursos via sensores IoT.", icon: <Lightbulb className="h-5 w-5" /> }
  ];

  const ecoProContent = [
    { title: "Eficiência 4.0", description: "BIM aplicado à redução drástica de resíduos em obra.", icon: <Building2 className="h-5 w-5" /> },
    { title: "Consultoria LEED", description: "Pontuação máxima em selos globais de construção.", icon: <Award className="h-5 w-5" /> },
    { title: "Logística Zero", description: "Descarbonização completa da cadeia de suprimentos.", icon: <Truck className="h-5 w-5" /> }
  ];

  return (
    <section id="content" className="py-40 bg-slate-950 text-white relative overflow-hidden transition-colors">
      {/* Elemento Decorativo Técnico */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-500/5 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-24 gap-10">
          <div className="max-w-xl">
            <h2 className="text-[10px] text-emerald-400 font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-4">
              <span className="w-8 h-px bg-emerald-400" /> Inteligência Aplicada
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">Hub de Inovação Técnica</h3>
          </div>

          <div className="inline-flex bg-slate-900 p-1.5 rounded-full border border-slate-800">
            <button 
              onClick={() => setActiveTab('house')}
              className={`flex items-center gap-3 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === 'house' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Home className="h-3.5 w-3.5" /> EcoHouse
            </button>
            <button 
              onClick={() => setActiveTab('pro')}
              className={`flex items-center gap-3 px-8 py-3.5 text-[10px] font-bold uppercase tracking-widest rounded-full transition-all ${activeTab === 'pro' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <Building2 className="h-3.5 w-3.5" /> EcoPro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 animate-fade-in bg-slate-900 border border-slate-800">
          {(activeTab === 'house' ? ecoHouseContent : ecoProContent).map((item, idx) => (
            <div key={idx} className="group p-12 bg-slate-950 hover:bg-slate-900 border border-transparent hover:border-emerald-500/30 transition-all duration-500">
              <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-900 text-emerald-400 mb-10 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-400 font-light leading-relaxed mb-10 h-12">{item.description}</p>
              <button className="flex items-center text-[9px] font-bold uppercase tracking-[0.2em] text-emerald-400 group-hover:translate-x-3 transition-transform">
                Explorar Solução <ArrowRight className="ml-3 h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Content;