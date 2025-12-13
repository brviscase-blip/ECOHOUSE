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
import EditorView from './components/EditorView';
import AdminPortal from './components/AdminPortal';
import { BlogPost } from './types';

const SectionDivider: React.FC = () => (
  <div className="section-divider" />
);

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('cs_theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Lógica de Reveal ao Scroll
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const sections = document.querySelectorAll('.reveal-on-scroll');
    sections.forEach(sec => observer.observe(sec));

    return () => sections.forEach(sec => observer.unobserve(sec));
  }, [activePost, isCreating]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('cs_theme', theme);
  }, [theme]);

  useEffect(() => {
    const session = sessionStorage.getItem('cs_admin_session');
    if (session === 'active') setIsAdmin(true);
  }, []);

  useEffect(() => {
    if (activePost || isCreating) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activePost, isCreating]);

  const handleLogin = () => {
    setIsAdmin(true);
    sessionStorage.setItem('cs_admin_session', 'active');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('cs_admin_session');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleSaveNewPost = (newPost: BlogPost) => {
    const saved = localStorage.getItem('cs_blog_posts');
    const posts: BlogPost[] = saved ? JSON.parse(saved) : [];
    const updatedPosts = [newPost, ...posts];
    localStorage.setItem('cs_blog_posts', JSON.stringify(updatedPosts));
    setIsCreating(false);
    window.location.reload(); 
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-emerald-50 font-sans flex flex-col transition-colors duration-500">
      
      {isCreating ? (
        <EditorView 
          onSave={handleSaveNewPost} 
          onCancel={() => setIsCreating(false)} 
        />
      ) : (
        <>
          <Navbar 
            theme={theme} 
            onToggleTheme={toggleTheme} 
            isAdmin={isAdmin} 
            isTransparent={!activePost}
          />
          
          <main className="flex-grow">
            {activePost ? (
              <PostView 
                post={activePost} 
                onBack={() => setActivePost(null)} 
                isAdmin={isAdmin}
                onUpdatePost={(updated) => setActivePost(updated)}
              />
            ) : (
              <>
                <Hero isAdmin={isAdmin} />
                <div className="reveal-on-scroll">
                  <SectionDivider />
                  <Certifications />
                </div>
                <div className="reveal-on-scroll">
                  <SectionDivider />
                  <About isAdmin={isAdmin} />
                </div>
                <div className="reveal-on-scroll">
                  <SectionDivider />
                  <Content />
                </div>
                <div className="reveal-on-scroll">
                  <SectionDivider />
                  <Blog 
                    isAdmin={isAdmin} 
                    onPostSelect={(post) => setActivePost(post)} 
                    onRequestCreate={() => setIsCreating(true)}
                  />
                </div>
                <div className="reveal-on-scroll">
                  <SectionDivider />
                  <Contact />
                </div>
              </>
            )}
          </main>

          <Footer />

          <AdminPortal 
            isAdmin={isAdmin} 
            onLogin={handleLogin} 
            onLogout={handleLogout} 
          />
        </>
      )}
    </div>
  );
};

export default App;