import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Residencial Green Valley",
    category: "Residencial",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Condomínio de alto padrão com certificação ambiental e automação residencial."
  },
  {
    id: 2,
    title: "Torre Corporativa Nexus",
    category: "Comercial",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Edifício comercial de 25 andares no centro financeiro, com fachada ventilada."
  },
  {
    id: 3,
    title: "Centro Logístico EcoPort",
    category: "Industrial",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Galpão logístico de 10.000m² com sistema de captação de água pluvial."
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-base text-emerald-600 font-semibold tracking-wide uppercase">Portfolio</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Obras que Inspiram
            </p>
          </div>
          <a href="#" className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center group">
            Ver todos os projetos
            <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer bg-gray-100">
              <div className="aspect-w-16 aspect-h-12 h-80 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-90 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-3 py-1 bg-emerald-600 rounded-full text-xs font-semibold mb-2">
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold mb-1">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;