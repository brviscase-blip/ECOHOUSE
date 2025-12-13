import React, { useState, useMemo } from 'react';
import { ArrowRight, Search, Clock, Tag } from 'lucide-react';
import { BlogPost } from '../types';

const posts: BlogPost[] = [
  {
    id: 1,
    date: '15 Mar, 2024',
    category: 'Certificações',
    title: 'Guia Definitivo para Certificação LEED v4.1',
    excerpt: 'Tudo o que você precisa saber sobre as novas exigências de performance e saúde para edifícios verdes.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '8 min'
  },
  {
    id: 2,
    date: '02 Abr, 2024',
    category: 'Inovação',
    title: 'BIM: A Digitalização do Canteiro de Obras',
    excerpt: 'A modelagem inteligente que reduz desperdício de materiais em até 30% na fase de execução.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '5 min'
  },
  {
    id: 3,
    date: '20 Mai, 2024',
    category: 'Materiais',
    title: 'O Avanço dos Vidros Fotovoltaicos Orgânicos',
    excerpt: 'Conheça a tecnologia que transforma fachadas envidraçadas em usinas de energia limpa.',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '6 min'
  },
  {
    id: 4,
    date: '12 Jun, 2024',
    category: 'Eventos',
    title: 'Webinar: Cidades Inteligentes e Resilientes',
    excerpt: 'Debate com especialistas sobre como adaptar o urbanismo às mudanças climáticas.',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '45 min'
  },
  {
    id: 5,
    date: '05 Jul, 2024',
    category: 'Certificações',
    title: 'Selo WELL: Focando na Saúde do Ocupante',
    excerpt: 'Como projetar espaços que melhoram a produtividade e o bem-estar mental dos usuários.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '10 min'
  }
];

const categories = ['Todos', 'Certificações', 'Inovação', 'Materiais', 'Eventos'];

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="blog" className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Conhecimento</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Conteúdo e Inovação
          </h3>
          <p className="mt-6 text-gray-500 font-light">
            Acompanhe as tendências e guias técnicos que estão moldando o futuro da construção sustentável no Brasil.
          </p>
        </div>

        {/* Filtros e Busca */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-lg' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Buscar artigos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 focus:border-emerald-500 outline-none text-sm transition-all shadow-sm"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Grid de Posts */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredPosts.map((post) => (
              <article key={post.id} className="group flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">
                    {post.category}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                    <span>{post.date}</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-600 transition-colors">
                    {post.title}
                  </h4>
                  <p className="text-gray-500 font-light text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50">
                    <button className="flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 group-hover:translate-x-2 transition-transform">
                      Leia mais <ArrowRight className="ml-2 h-3 w-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-dashed border-gray-200">
            <p className="text-gray-400 font-light">Nenhum artigo encontrado para esta busca.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;