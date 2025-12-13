import React from 'react';
import { Building2, Home, Hammer, Leaf, ShieldCheck, Ruler } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Construção Comercial',
    icon: <Building2 className="h-7 w-7" />,
    description: 'Edifícios corporativos e galpões logísticos com máxima eficiência operacional.'
  },
  {
    id: 2,
    title: 'Residencial Premium',
    icon: <Home className="h-7 w-7" />,
    description: 'Projetos exclusivos que harmonizam luxo, conforto e baixo impacto ambiental.'
  },
  {
    id: 3,
    title: 'Retrofit & Modernização',
    icon: <Hammer className="h-7 w-7" />,
    description: 'Renovação completa de estruturas, trazendo tecnologias de ponta para prédios antigos.'
  },
  {
    id: 4,
    title: 'Certificação LEED',
    icon: <Leaf className="h-7 w-7" />,
    description: 'Consultoria especializada para obtenção de selos de sustentabilidade globais.'
  },
  {
    id: 5,
    title: 'Gerenciamento 360°',
    icon: <ShieldCheck className="h-7 w-7" />,
    description: 'Controle rigoroso de cronograma, custos e padrões técnicos de qualidade.'
  },
  {
    id: 6,
    title: 'Engenharia Integrada',
    icon: <Ruler className="h-7 w-7" />,
    description: 'Desenvolvimento de projetos estruturais e complementares em plataforma BIM.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Soluções</h2>
          <p className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Excelência em Engenharia
          </p>
          <div className="w-16 h-1 bg-emerald-500 mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="group p-0 border-b border-gray-100 pb-8 hover:border-emerald-500 transition-all duration-500"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {service.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;