import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Upload, Image as ImageIcon } from 'lucide-react';

interface NavbarProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
  isAdmin?: boolean;
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme, isAdmin, isTransparent = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(() => {
    return localStorage.getItem('cs_site_logo');
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setLogoUrl(base64);
        localStorage.setItem('cs_site_logo', base64);
        setImgError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Certificações', href: '#certifications' },
    { name: 'Sobre Nós', href: '#about' },
    { name: 'Conteúdo', href: '#content' },
  ];

  // Lógica de cores baseada no estado da Navbar
  const shouldBeTransparent = isTransparent && !isScrolled;
  
  const navBaseStyle = "fixed top-0 left-0 w-full z-[100] transition-all duration-500 ease-out font-sans";
  const navDynamicStyle = shouldBeTransparent 
    ? "bg-transparent py-10" 
    : "bg-white dark:bg-slate-950 py-4 border-b border-gray-100 dark:border-slate-800 shadow-md";

  const textColorClass = shouldBeTransparent 
    ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" 
    : "text-slate-900 dark:text-white";

  const logoColorClass = shouldBeTransparent 
    ? "brightness-0 invert" 
    : "dark:brightness-0 dark:invert";

  return (
    <nav className={`${navBaseStyle} ${navDynamicStyle}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex justify-between items-center h-14">
          <div className="flex items-center">
            <div className="relative group">
              <div 
                className="flex-shrink-0 flex items-center cursor-pointer transition-transform duration-500 hover:scale-105" 
                onClick={() => !isAdmin && (window.location.href = '#home')}
              >
                {logoUrl && !imgError ? (
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    onError={() => setImgError(true)}
                    className={`h-10 md:h-14 w-auto object-contain transition-all duration-500 ${logoColorClass}`}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className={`flex items-center gap-3 border-2 border-dashed ${isAdmin ? 'border-emerald-500/50 bg-emerald-500/5' : (shouldBeTransparent ? 'border-white/20' : 'border-slate-200 dark:border-slate-800')} px-6 py-3 rounded-lg transition-all`}>
                    <ImageIcon className={`h-6 w-6 ${isAdmin ? 'text-emerald-400' : (shouldBeTransparent ? 'text-white/40' : 'text-slate-400')}`} />
                    {isAdmin && (
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest hidden sm:block">
                        Upload Logo
                      </span>
                    )}
                  </div>
                )}
              </div>

              {isAdmin && (
                <label className="absolute inset-0 flex items-center justify-center bg-emerald-600/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-lg backdrop-blur-sm">
                  <Upload className="h-5 w-5 text-white" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </label>
              )}
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-14">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] font-bold uppercase tracking-[0.35em] transition-all duration-300 relative group/link ${textColorClass} hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-105`}
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover/link:w-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></span>
              </a>
            ))}
            
            <div className={`h-4 w-px ${shouldBeTransparent ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-800'}`} />

            <button 
              onClick={onToggleTheme}
              className={`p-2.5 rounded-full transition-all hover:bg-emerald-500/10 hover:scale-110 ${textColorClass}`}
              aria-label="Alternar Tema"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <a
              href="#contact"
              className={`px-10 py-4 text-[10px] font-extrabold uppercase tracking-[0.3em] transition-all rounded-full overflow-hidden relative group/btn bg-emerald-600 text-white hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all`}
            >
              <span className="relative z-10">Contato</span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-400 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          <div className="flex items-center md:hidden gap-6">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${textColorClass} p-2`}
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950/98 backdrop-blur-3xl z-[120] flex flex-col items-center justify-center p-10 animate-fade-in">
           <button onClick={() => setIsOpen(false)} className="absolute top-10 right-10 p-4 text-white hover:text-emerald-400 transition-colors">
             <X className="h-10 w-10" />
           </button>
          <div className="flex flex-col gap-10 text-center">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold uppercase tracking-[0.2em] text-white hover:text-emerald-400 transition-all duration-300 transform hover:scale-110"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-12 px-20 py-8 text-sm font-bold uppercase tracking-[0.4em] bg-emerald-600 text-white rounded-full shadow-[0_20px_50px_rgba(16,185,129,0.4)]"
            >
              Falar com Especialista
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;