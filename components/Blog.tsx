
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Clock, Plus, Edit2, Trash2, X, Save, Image as ImageIcon, ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';

const INITIAL_POSTS: BlogPost[] = [
  {
    id: 1,
    date: '15 Mar, 2024',
    category: 'Certificações',
    title: 'Guia Definitivo para Certificação LEED v4.1',
    excerpt: 'Tudo o que você precisa saber sobre as novas exigências de performance e saúde para edifícios verdes.',
    content: 'A certificação LEED (Leadership in Energy and Environmental Design) é o selo de sustentabilidade mais reconhecido do mundo. Na versão 4.1, o foco mudou drasticamente para o desempenho em tempo real.\n\nNão basta apenas projetar uma economia; é necessário prová-la através de dados reais de consumo de energia e água.\n\nPrincipais mudanças:\n1. Créditos de Localização e Transporte: Maior ênfase em mobilidade elétrica.\n2. Eficiência Energética: Exigências 15% mais rígidas.\n3. Materiais: Foco em transparência química.\n\nNossa equipe técnica já está adaptada para garantir que seu próximo empreendimento alcance o nível Platinum com estas novas métricas.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '8 min'
  },
  {
    id: 2,
    date: '02 Abr, 2024',
    category: 'Inovação',
    title: 'BIM: A Digitalização do Canteiro de Obras',
    excerpt: 'A modelagem inteligente que reduz desperdício de materiais em até 30% na fase de execução.',
    content: 'O Building Information Modeling (BIM) não é apenas um software 3D; é um processo de gestão de informação. Ao construir virtualmente antes de colocar o primeiro tijolo no lugar, conseguimos prever colisões entre sistemas hidráulicos e estruturais, eliminando o retrabalho.\n\nBenefícios diretos:\n- Redução de custos em 15%.\n- Cumprimento de prazos com precisão de 95%.\n- Documentação as-built perfeita.\n\nNa CONSTRUÇÕES SUSTENTÁVEIS, todos os nossos projetos são desenvolvidos nativamente em BIM.',
    imageUrl: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    readTime: '5 min'
  }
];

const categories = ['Todos', 'Certificações', 'Inovação', 'Materiais', 'Eventos'];

interface BlogProps {
  isAdmin?: boolean;
  onPostSelect: (post: BlogPost) => void;
}

const Blog: React.FC<BlogProps> = ({ isAdmin, onPostSelect }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  // Carrega sempre do LocalStorage ou do Initial se estiver vazio
  useEffect(() => {
    const saved = localStorage.getItem('cs_blog_posts');
    if (saved) {
      setPosts(JSON.parse(saved));
    } else {
      setPosts(INITIAL_POSTS);
      localStorage.setItem('cs_blog_posts', JSON.stringify(INITIAL_POSTS));
    }
  }, []);

  const saveToLocal = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
    localStorage.setItem('cs_blog_posts', JSON.stringify(updatedPosts));
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesCategory = selectedCategory === 'Todos' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, posts]);

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }),
      category: 'Inovação',
      title: '',
      excerpt: '',
      content: '',
      imageUrl: '',
      readTime: '5 min'
    };
    setEditingPost(newPost);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingPost({ ...post });
    setShowEditor(true);
  };

  const handleDeletePost = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Deseja realmente excluir este artigo permanentemente?')) {
      const updated = posts.filter(p => p.id !== id);
      saveToLocal(updated);
    }
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    let updated: BlogPost[];
    const exists = posts.find(p => p.id === editingPost.id);
    
    if (exists) {
      updated = posts.map(p => p.id === editingPost.id ? editingPost : p);
    } else {
      updated = [editingPost, ...posts];
    }

    saveToLocal(updated);
    setShowEditor(false);
    setEditingPost(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingPost) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingPost({ ...editingPost, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="blog" className="py-32 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs text-emerald-600 font-bold tracking-[0.3em] uppercase mb-4">Conhecimento</h2>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">Hub de Conteúdo</h3>
          <p className="mt-6 text-gray-500 font-light">Tendências e guias técnicos salvos localmente no seu navegador.</p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 border-b border-gray-200 pb-8">
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            {isAdmin && (
              <button onClick={handleCreatePost} className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 shadow-lg flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-transform hover:scale-105">
                <Plus className="h-4 w-4" /> Criar Blog
              </button>
            )}
            <div className="relative flex-grow md:w-80">
              <input type="text" placeholder="Buscar..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 focus:border-emerald-500 outline-none text-sm shadow-sm" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredPosts.map((post) => (
            <article key={post.id} className="group flex flex-col bg-white shadow-sm hover:shadow-xl transition-all duration-500 h-full relative cursor-pointer overflow-hidden" onClick={() => onPostSelect(post)}>
              {isAdmin && (
                <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={(e) => handleEditPost(post, e)} className="p-2 bg-white text-emerald-600 hover:bg-emerald-600 hover:text-white shadow-md transition-all"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={(e) => handleDeletePost(post.id, e)} className="p-2 bg-white text-red-600 hover:bg-red-600 hover:text-white shadow-md transition-all"><Trash2 className="h-4 w-4" /></button>
                </div>
              )}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={post.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-3 py-1 text-[9px] font-bold uppercase tracking-widest">{post.category}</div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 mb-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-emerald-600 transition-colors">{post.title}</h4>
                <p className="text-gray-500 font-light text-sm line-clamp-3 mb-8">{post.excerpt}</p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-700 group-hover:translate-x-2 transition-transform">
                  Leia mais <ArrowRight className="ml-2 h-3 w-3" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {showEditor && editingPost && (
        <div className="fixed inset-0 z-[11000] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12 shadow-2xl relative border-t-4 border-emerald-500">
            <button onClick={() => setShowEditor(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X className="h-6 w-6" /></button>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tighter uppercase mb-10 border-b pb-6">Sistema de Publicação Local</h2>
            <form onSubmit={handleSavePost} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Título do Artigo</label>
                  <input type="text" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-xl" placeholder="..." required />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Categoria</label>
                    <select value={editingPost.category} onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none">
                      {categories.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Tempo de Leitura</label>
                    <input type="text" value={editingPost.readTime} onChange={(e) => setEditingPost({ ...editingPost, readTime: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none" placeholder="Ex: 5 min" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Resumo</label>
                  <textarea rows={3} value={editingPost.excerpt} onChange={(e) => setEditingPost({ ...editingPost, excerpt: e.target.value })} className="w-full px-4 py-3 bg-gray-50 outline-none resize-none border-b-2 border-transparent focus:border-emerald-500" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Conteúdo do Blog</label>
                  <textarea rows={8} value={editingPost.content} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} className="w-full px-4 py-3 bg-gray-50 outline-none resize-none border-b-2 border-transparent focus:border-emerald-500" placeholder="Escreva o texto completo aqui..." />
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Imagem de Capa</label>
                  <div className="relative group aspect-[16/10] bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden hover:border-emerald-500 transition-all">
                    {editingPost.imageUrl ? <img src={editingPost.imageUrl} className="w-full h-full object-cover" alt="" /> : <div className="flex flex-col items-center justify-center h-full text-gray-400"><ImageIcon className="h-12 w-12 mb-2" /><span className="text-[10px] font-bold uppercase">Subir Foto</span></div>}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
                <div className="flex gap-4 pt-10">
                  <button type="submit" className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-xl shadow-emerald-500/10"><Save className="h-4 w-4" /> Gravar Localmente</button>
                  <button type="button" onClick={() => setShowEditor(false)} className="px-10 bg-gray-100 text-gray-600 font-bold py-5 text-xs uppercase tracking-widest">Descartar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Blog;
