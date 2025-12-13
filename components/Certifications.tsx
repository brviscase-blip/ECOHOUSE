import React from 'react';
import { ShieldCheck, Award, Zap, Droplets, Leaf, ThermometerSnowflake } from 'lucide-react';

const Certifications: React.FC = () => {
  const certifications = [
    {
      title: "LEED Platinum/Gold",
      description: "Excelência global em design ambiental e performance energética para edifícios corporativos.",
      icon: <Award className="h-8 w-8" />
    },
    {
      title: "Selo WELL",
      description: "Foco total na saúde e bem-estar dos ocupantes, otimizando ar, luz e conforto térmico.",
      icon: <ThermometerSnowflake className="h-8 w-8" />
    },
    {
      title: "AQUA-HQE",
      description: "Certificação de alta qualidade ambiental adaptada à realidade da construção brasileira.",
      icon: <ShieldCheck className="h-8 w-8" />
    }
  ];

  return (
    <section id="certifications" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Certificações</h2>
            <h3 className="text-4xl md:text-6xl font-bold text-slate-900 leading-[1.1] tracking-tighter mb-8">
              Rigores Técnicos <br/>
              <span className="text-emerald-500">Internacionais.</span>
            </h3>
            <p className="text-gray-500 text-lg font-light leading-relaxed mb-10 max-w-lg">
              Nossa engenharia não é apenas robusta; ela é validada pelos maiores órgãos de certificação ambiental do mundo, garantindo valorização do imóvel e eficiência operacional vitalícia.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">45+</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Obras LEED</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">100%</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Aderência Técnica</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex items-start gap-6">
                <div className="bg-emerald-50 p-4 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {cert.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">{cert.title}</h4>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;