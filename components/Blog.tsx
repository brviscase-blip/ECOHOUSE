import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, Plus, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { BlogPost } from '../types';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    date: '15 Mar, 2024',
    category: 'Certificações',
    title: 'Guia Definitivo para Certificação LEED v4.1',
    excerpt: 'Novas exigências de performance técnica para edifícios verdes de alto padrão.',
    content: 'A certificação LEED é o selo verde mais reconhecido mundialmente...',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    readTime: '8 min'
  },
  {
    id: 2,
    date: '10 Fev, 2024',
    category: 'Inovação',
    title: 'O Futuro do BIM na Gestão de Obras',
    excerpt: 'Como a modelagem 5D está revolucionando a economia de insumos no canteiro.',
    content: 'O BIM não é apenas software, é um processo colaborativo...',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    readTime: '12 min'
  }
];

const categories = ['Todos', 'Certificações', 'Inovação', 'Materiais', 'Eventos'];

interface BlogProps {
  isAdmin?: boolean;
  onPostSelect: (post: BlogPost) => void;
  onRequestCreate: () => void;
}

const Blog: React.FC<BlogProps> = ({ isAdmin, onPostSelect, onRequestCreate }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('cs_blog_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('cs_blog_posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, posts]);

  return (
    <section id="blog" className="py-48 bg-[#ffffff] dark:bg-[#0a0f12] relative overflow-hidden bg-blueprint transition-colors">
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#16827d]/10 pointer-events-none" />
      
      {/* Container esticado para largura quase total */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
          <div className="max-w-3xl space-y-8">
            <div className="flex items-center gap-4">
              <span className="p-2 bg-[#16827d]/10 text-[#16827d] rounded-lg">
                <BookOpen className="h-5 w-5" />
              </span>
              <h2 className="text-[10px] text-[#16827d] font-extrabold tracking-[0.6em] uppercase">Insight Editorial</h2>
            </div>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#0a0f12] dark:text-white leading-[0.95]">
              Documentação <br/>
              <span className="text-[#16827d]">de Performance.</span>
            </h3>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-light max-w-2xl">
              Análises técnicas, estudos de caso e atualizações normativas para o ecossistema da construção civil moderna.
            </p>
          </div>
          
          {isAdmin && (
            <button 
              onClick={onRequestCreate}
              className="bg-[#16827d] hover:bg-[#126a66] text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] shadow-[0_20px_40px_rgba(22,130,125,0.3)] transition-all hover:-translate-y-2 rounded-2xl flex items-center gap-4"
            >
              <Plus className="h-4 w-4" /> Novo Registro Técnico
            </button>
          )}
        </div>

        {/* Barra de Ferramentas Esticada (w-full sem limites de max-width interno) */}
        <div className="mb-20 bg-slate-50 dark:bg-slate-900/50 backdrop-blur-md p-4 md:p-6 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-between w-full">
          <div className="flex flex-wrap gap-3 items-center justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-8 py-4 text-[10px] font-bold uppercase tracking-[0.25em] rounded-2xl transition-all border ${selectedCategory === cat ? 'bg-[#0a0f12] dark:bg-white text-white dark:text-[#0a0f12] border-[#0a0f12] dark:border-white shadow-xl scale-105' : 'bg-white dark:bg-[#0a0f12] text-slate-400 border-slate-200 dark:border-slate-800 hover:border-[#16827d] hover:text-[#16827d]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          
          {/* Campo de pesquisa agora estica livremente */}
          <div className="relative flex-1 w-full group">
            <input 
              type="text" 
              placeholder="Pesquisar na biblioteca técnica de performance e documentos normativos..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-16 pr-8 py-6 bg-white dark:bg-[#0a0f12] text-slate-900 dark:text-white rounded-[2rem] border border-slate-200 dark:border-slate-800 focus:border-[#16827d] focus:ring-4 focus:ring-[#16827d]/5 outline-none text-xs transition-all shadow-sm group-hover:shadow-md" 
            />
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-hover:text-[#16827d] transition-colors" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col cursor-pointer bg-white dark:bg-[#0a0f12] rounded-[3rem] overflow-hidden border-2 border-slate-200/60 dark:border-emerald-900/40 shadow-[0_15px_60px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] hover:border-emerald-500/60 dark:hover:border-emerald-500/60 transition-all duration-700 hover:-translate-y-4" 
              onClick={() => onPostSelect(post)}
            >
              <div className="relative aspect-[16/11] overflow-hidden border-b-2 border-slate-200/60 dark:border-emerald-900/40 group-hover:border-emerald-500/60 transition-all duration-700 rounded-t-[2.85rem] isolation-auto transform-gpu">
                <img 
                  src={post.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 will-change-transform" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f12]/40 to-transparent pointer-events-none" />
                <div className="absolute top-8 left-8 bg-white/90 dark:bg-[#0a0f12]/80 backdrop-blur-md px-6 py-2 text-[8px] font-bold uppercase tracking-[0.3em] text-[#16827d] rounded-full border border-white/20 shadow-xl">
                  {post.category}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-0 p-8 opacity-5 text-[#16827d] pointer-events-none">
                   <Layers className="h-12 w-12" />
                </div>

                <div className="flex items-center gap-6 mb-8 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 text-[#16827d]">
                    <Clock className="h-3.5 w-3.5" /> {post.readTime}
                  </span>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  <span>{post.date}</span>
                </div>
                
                <h4 className="text-2xl font-bold text-[#0a0f12] dark:text-white mb-6 group-hover:text-[#16827d] transition-colors leading-[1.1] tracking-tight">
                  {post.title}
                </h4>
                
                <p className="text-slate-500 dark:text-slate-400 font-light text-sm line-clamp-3 mb-10 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-[9px] font-extrabold uppercase tracking-[0.3em] text-[#16827d] group-hover:gap-6 transition-all border-t border-slate-50 dark:border-slate-800/50 pt-8">
                  Ver Documento Completo <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-48 text-center bg-slate-50 dark:bg-slate-900/20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem]">
              <p className="text-slate-400 uppercase tracking-[0.4em] text-[10px] font-bold">Nenhum registro encontrado no diretório atual.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;