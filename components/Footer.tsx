import React from 'react';
import { HardHat, Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <HardHat className="h-8 w-8 text-emerald-500" />
              <span className="font-bold text-2xl tracking-tight">ECOHOUSE</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Comprometidos com a excelência na construção civil e a preservação do meio ambiente. Construímos hoje pensando no amanhã.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Links Rápidos</h4>
            <ul className="space-y-3">
              <li><a href="#home" className="text-gray-400 hover:text-emerald-500 transition-colors">Início</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-emerald-500 transition-colors">Serviços</a></li>
              <li><a href="#projects" className="text-gray-400 hover:text-emerald-500 transition-colors">Projetos</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-emerald-500 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Serviços</h4>
            <ul className="space-y-3">
              <li className="text-gray-400">Gestão de Obras</li>
              <li className="text-gray-400">Projetos Sustentáveis</li>
              <li className="text-gray-400">Reformas Comerciais</li>
              <li className="text-gray-400">Laudos Técnicos</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Newsletter</h4>
            <p className="text-gray-400 mb-4 text-sm">Receba novidades sobre construção sustentável.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-emerald-500"
              />
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded transition-colors font-medium">
                Inscrever-se
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ECOHOUSE Construções. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;