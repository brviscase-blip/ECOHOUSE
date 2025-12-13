import React from 'react';
import { Building2, Home, Hammer, Leaf, ShieldCheck, Ruler } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Construção Comercial',
    icon: <Building2 className="h-8 w-8" />,
    description: 'Edifícios corporativos e galpões logísticos com máxima eficiência operacional.'
  },
  {
    id: 2,
    title: 'Residencial Premium',
    icon: <Home className="h-8 w-8" />,
    description: 'Projetos exclusivos que harmonizam luxo, conforto e baixo impacto ambiental.'
  },
  {
    id: 3,
    title: 'Retrofit & Modernização',
    icon: <Hammer className="h-8 w-8" />,
    description: 'Renovação completa de estruturas, trazendo tecnologias de ponta para prédios antigos.'
  },
  {
    id: 4,
    title: 'Certificação LEED',
    icon: <Leaf className="h-8 w-8" />,
    description: 'Consultoria especializada para obtenção de selos de sustentabilidade globais.'
  },
  {
    id: 5,
    title: 'Gerenciamento 360°',
    icon: <ShieldCheck className="h-8 w-8" />,
    description: 'Controle rigoroso de cronograma, custos e padrões técnicos de qualidade.'
  },
  {
    id: 6,
    title: 'Engenharia Integrada',
    icon: <Ruler className="h-8 w-8" />,
    description: 'Desenvolvimento de projetos estruturais e complementares em plataforma BIM.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Soluções</h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Excelência em Engenharia
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group relative bg-white p-10 border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
            >
              {/* Decorative accent bar on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              <div className="w-16 h-16 bg-emerald-50 flex items-center justify-center mb-8 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight group-hover:text-emerald-700 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-gray-500 font-light leading-relaxed text-base">
                {service.description}
              </p>
              
              <div className="mt-8 flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                Saiba Mais <span className="ml-2">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;