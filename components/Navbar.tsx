import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const LOGO_URL = "/img/logo.png"; 

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Início', href: '#home' },
    { name: 'Serviços', href: '#services' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Recursos', href: '#resources' },
    { name: 'Blog', href: '#blog' },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full z-50 top-0 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer" 
              onClick={() => window.location.href = '#'}
            >
              <img 
                src={LOGO_URL} 
                alt="CONSTRUÇÕES SUSTENTÁVEIS" 
                className="h-12 w-auto object-contain transition-transform hover:scale-105"
                crossOrigin="anonymous"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const span = document.createElement('span');
                    span.className = 'fallback-text font-bold text-xl text-emerald-900 tracking-tight whitespace-nowrap uppercase';
                    span.innerText = 'CONSTRUÇÕES SUSTENTÁVEIS';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-500 hover:text-emerald-600 text-sm font-semibold uppercase tracking-widest transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-sm font-extrabold uppercase tracking-[0.2em] transition-all shadow-md hover:shadow-emerald-500/20 flex items-center justify-center text-center"
            >
              Contato
            </a>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-4 text-sm font-extrabold uppercase tracking-widest text-emerald-600 border-t border-gray-100 bg-emerald-50"
            >
              Contato
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;