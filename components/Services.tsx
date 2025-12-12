import React from 'react';
import { Building2, Home, Hammer, Leaf, ShieldCheck, Ruler } from 'lucide-react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: 1,
    title: 'Construção Comercial',
    icon: <Building2 className="h-8 w-8" />,
    description: 'Edifícios corporativos, galpões logísticos e lojas comerciais com foco em eficiência operacional.'
  },
  {
    id: 2,
    title: 'Construção Residencial',
    icon: <Home className="h-8 w-8" />,
    description: 'Casas de alto padrão e condomínios planejados para conforto e bem-estar da sua família.'
  },
  {
    id: 3,
    title: 'Retrofit & Reformas',
    icon: <Hammer className="h-8 w-8" />,
    description: 'Modernização de estruturas existentes, renovando fachadas e interiores com tecnologias atuais.'
  },
  {
    id: 4,
    title: 'Consultoria Sustentável',
    icon: <Leaf className="h-8 w-8" />,
    description: 'Projetos com certificação LEED, uso de energia solar e sistemas de reuso de água.'
  },
  {
    id: 5,
    title: 'Gestão de Obras',
    icon: <ShieldCheck className="h-8 w-8" />,
    description: 'Administração completa da obra, garantindo prazos, custos e qualidade técnica.'
  },
  {
    id: 6,
    title: 'Projetos de Engenharia',
    icon: <Ruler className="h-8 w-8" />,
    description: 'Desenvolvimento de projetos estruturais, elétricos e hidráulicos integrados.'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Nossos Serviços</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Soluções Completas em Engenharia
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Da concepção à entrega das chaves, oferecemos excelência em cada etapa do seu projeto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group cursor-default"
            >
              <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                <div className="text-emerald-600 group-hover:text-white transition-colors duration-300">
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
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