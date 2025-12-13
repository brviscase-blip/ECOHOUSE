import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Certifications from './components/Certifications';
import About from './components/About';
import Content from './components/Content';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Blog from './components/Blog';
import PostView from './components/PostView';
import AdminPortal from './components/AdminPortal';
import { BlogPost } from './types';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Verifica sessão administrativa persistente
  useEffect(() => {
    const session = sessionStorage.getItem('cs_admin_session');
    if (session === 'active') setIsAdmin(true);
  }, []);

  // Rola para o topo ao trocar de "página"
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePost]);

  const handleLogin = () => {
    setIsAdmin(true);
    sessionStorage.setItem('cs_admin_session', 'active');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('cs_admin_session');
  };

  const handleSelectPost = (post: BlogPost) => {
    setActivePost(post);
  };

  const handleBackToHome = () => {
    setActivePost(null);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {activePost ? (
          /* AMBIENTE SEPARADO: VISUALIZAÇÃO DO ARTIGO */
          <PostView 
            post={activePost} 
            onBack={handleBackToHome} 
            isAdmin={isAdmin}
            onUpdatePost={(updated) => setActivePost(updated)}
          />
        ) : (
          /* AMBIENTE LANDING PAGE */
          <>
            <Hero />
            <Certifications />
            <About />
            <Content />
            <Blog isAdmin={isAdmin} onPostSelect={handleSelectPost} />
            <Contact />
          </>
        )}
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