import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, Plus, ArrowRight } from 'lucide-react';
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
    <section id="blog" className="py-48 bg-gray-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
          <div className="max-w-2xl">
            <h2 className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.4em] uppercase mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-emerald-500"></span> Conhecimento
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">Insight Editorial</h3>
          </div>
          
          {isAdmin && (
            <button 
              onClick={onRequestCreate}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] shadow-2xl transition-all hover:-translate-y-1 rounded-full"
            >
              <Plus className="h-4 w-4 inline-block mr-2" /> Novo Artigo
            </button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center mb-20 gap-8 pb-10 border-b border-gray-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 text-[10px] font-bold uppercase tracking-[0.15em] rounded-full transition-all border ${selectedCategory === cat ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white dark:bg-slate-900 text-slate-400 border-gray-200 dark:border-slate-800 hover:border-emerald-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full lg:w-96">
            <input 
              type="text" 
              placeholder="Pesquisar artigos..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              className="w-full pl-14 pr-6 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-full border border-gray-200 dark:border-slate-800 focus:border-emerald-500 outline-none text-xs transition-all placeholder:text-slate-400 shadow-sm" 
            />
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.length > 0 ? filteredPosts.map((post) => (
            <article 
              key={post.id} 
              className="group flex flex-col cursor-pointer bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_30px_70px_rgba(0,0,0,0.4)] transition-all duration-500 hover:-translate-y-2" 
              onClick={() => onPostSelect(post)}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt="" 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                />
                <div className="absolute top-6 left-6 bg-emerald-600 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white rounded-lg shadow-xl">
                  {post.category}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-grow">
                <div className="flex items-center gap-6 mb-6 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                  <span>{post.date}</span>
                </div>
                
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-5 group-hover:text-emerald-600 transition-colors leading-[1.2]">
                  {post.title}
                </h4>
                
                <p className="text-gray-500 dark:text-gray-400 font-light text-sm line-clamp-3 mb-10 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 group-hover:gap-4 transition-all">
                  Ler Artigo Completo <ArrowRight className="ml-3 h-3 w-3 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          )) : (
            <div className="col-span-full py-32 text-center border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-3xl">
              <p className="text-slate-400 uppercase tracking-[0.3em] text-[10px] font-bold">Nenhum registro encontrado para esta busca.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;