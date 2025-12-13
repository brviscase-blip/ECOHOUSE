import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import About from './components/About';
import Content from './components/Content';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import AdminPortal from './components/AdminPortal';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Check persistent admin state if desired, otherwise just session
  useEffect(() => {
    const session = sessionStorage.getItem('cs_admin_session');
    if (session === 'active') setIsAdmin(true);
  }, []);

  const handleLogin = () => {
    setIsAdmin(true);
    sessionStorage.setItem('cs_admin_session', 'active');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('cs_admin_session');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />
      
      <main>
        {/* HOME SECTION */}
        <Hero />
        
        {/* CERTIFICAÇÕES SECTION */}
        <Certifications />
        
        {/* SOBRE NÓS SECTION */}
        <About />

        {/* CONTEÚDO SECTION (ECOHOUSE / ECOPRO) */}
        <Content />

        {/* BLOG SECTION (DINÂMICO) */}
        <Blog isAdmin={isAdmin} />
        
        {/* CONTATO SECTION */}
        <Contact />
      </main>

      <Footer />

      {/* PORTAL ADMINISTRATIVO (SECRETO) */}
      <AdminPortal 
        isAdmin={isAdmin} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default App;