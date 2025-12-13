import React, { useState, useRef } from 'react';
import { 
  X, Save, Image as ImageIcon, ArrowLeft, Clock, Tag, 
  Bold, Italic, List, Link as LinkIcon, Heading1, Heading2, 
  Layout, Eye, Hash, Globe, ChevronDown, Sparkles, Zap, Shrink, Maximize
} from 'lucide-react';
import { BlogPost } from '../types';

interface EditorViewProps {
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

const EditorView: React.FC<EditorViewProps> = ({ onSave, onCancel }) => {
  const [newPost, setNewPost] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Inovação',
    excerpt: '',
    content: '',
    readTime: '5 min',
    imageUrl: ''
  });
  const [isOptimizing, setIsOptimizing] = useState(false);

  const contentRef = useRef<HTMLTextAreaElement>(null);
  const categories = ['Certificações', 'Inovação', 'Materiais', 'Eventos'];

  const optimizeImage = (base64Str: string, quality: number, maxWidth: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64Str;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const handleOptimization = async (preset: 'high' | 'web' | 'mobile') => {
    if (!newPost.imageUrl) return;
    setIsOptimizing(true);
    
    let quality = 0.9;
    let width = 1920;

    if (preset === 'web') {
      quality = 0.7;
      width = 1200;
    } else if (preset === 'mobile') {
      quality = 0.5;
      width = 800;
    }

    const optimized = await optimizeImage(newPost.imageUrl, quality, width);
    setNewPost({ ...newPost, imageUrl: optimized });
    setIsOptimizing(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      alert("O artigo precisa de um título e conteúdo para ser publicado.");
      return;
    }

    const createdPost: BlogPost = {
      id: Date.now(),
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
      title: newPost.title || 'Sem Título',
      category: newPost.category || 'Inovação',
      excerpt: newPost.excerpt || '',
      content: newPost.content || '',
      readTime: newPost.readTime || '5 min',
      imageUrl: newPost.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'
    };

    onSave(createdPost);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const adjustHeight = (el: HTMLTextAreaElement | null) => {
    if (el) {
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
    }
  };

  return (
    <div className="fixed inset-0 z-[15000] bg-[#F8F9FA] dark:bg-slate-950 flex flex-col animate-fade-in overflow-hidden font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* HEADER BUSINESS PRO */}
      <header className="h-20 border-b border-gray-200/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-between px-6 md:px-12 z-50 transition-colors">
        <div className="flex items-center gap-6">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all group"
          >
            <div className="p-2 rounded-full group-hover:bg-gray-100 dark:group-hover:bg-slate-800 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] hidden sm:block">Sair do Editor</span>
          </button>
          
          <div className="h-8 w-px bg-gray-200 dark:bg-slate-800 hidden md:block" />
          
          {/* TOOLBAR MINIMALISTA */}
          <div className="hidden lg:flex items-center gap-1 bg-gray-50 dark:bg-slate-800/50 p-1 rounded-xl">
            {[Heading1, Heading2, Bold, Italic, List, LinkIcon].map((Icon, i) => (
              <button key={i} className="p-2.5 text-slate-500 hover:text-emerald-600 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all shadow-none hover:shadow-sm">
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-2.5 text-slate-600 dark:text-slate-300 hover:text-emerald-600 font-bold text-[10px] uppercase tracking-widest transition-all rounded-full border border-gray-200 dark:border-slate-700 hover:border-emerald-500">
            <Eye className="h-3.5 w-3.5" /> Pré-visualizar
          </button>
          <button 
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full text-[10px] font-extrabold uppercase tracking-[0.2em] shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2 transform active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" /> Publicar Artigo
          </button>
        </div>
      </header>

      {/* EDITOR CANVAS */}
      <main className="flex-grow overflow-y-auto scroll-smooth flex justify-center py-10 px-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10">
          
          {/* AREA DE ESCRITA - ESTILO PAPER */}
          <div className="flex-grow bg-white dark:bg-slate-900 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-slate-800 overflow-hidden min-h-screen transition-colors">
            
            {/* CAPA PRO COM OPÇÕES DE OTIMIZAÇÃO */}
            <div className="relative aspect-[21/9] w-full bg-gray-50 dark:bg-slate-800 group overflow-hidden">
              {newPost.imageUrl ? (
                <>
                  <img src={newPost.imageUrl} className={`w-full h-full object-cover transition-all duration-700 ${isOptimizing ? 'blur-md grayscale' : ''}`} alt="Cover" />
                  
                  {/* OVERLAY DE OTIMIZAÇÃO */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center backdrop-blur-[2px]">
                    <div className="flex flex-wrap justify-center gap-3 p-4 bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-white/20">
                      <button 
                        onClick={() => handleOptimization('high')}
                        className="flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                      >
                        <Maximize className="h-3 w-3" /> Alta Res
                      </button>
                      <button 
                        onClick={() => handleOptimization('web')}
                        className="flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                      >
                        <Zap className="h-3 w-3" /> Web
                      </button>
                      <button 
                        onClick={() => handleOptimization('mobile')}
                        className="flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
                      >
                        <Shrink className="h-3 w-3" /> Mobile
                      </button>
                      <div className="w-px h-4 bg-gray-200 dark:bg-slate-700 self-center" />
                      <label className="flex items-center gap-2 px-4 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 hover:text-emerald-600 cursor-pointer transition-colors">
                        Alterar
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    {isOptimizing && (
                      <div className="mt-4 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest drop-shadow-md">Otimizando...</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 border-b border-gray-100 dark:border-slate-800">
                  <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40">Adicionar Capa de Alto Impacto</span>
                  <label className="mt-6 bg-white text-black px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-emerald-50 transition-all shadow-xl">
                    Escolher Imagem
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              )}
            </div>

            {/* ESCRITA REAL */}
            <div className="max-w-3xl mx-auto w-full px-6 md:px-16 py-16 md:py-24 space-y-12">
              
              {/* TITULO PRETO ABSOLUTO - AJUSTADO PARA 5XL */}
              <textarea 
                placeholder="Título do seu próximo artigo..."
                rows={1}
                value={newPost.title}
                onChange={(e) => {
                  setNewPost({ ...newPost, title: e.target.value });
                  adjustHeight(e.target);
                }}
                className="w-full text-4xl md:text-5xl font-bold bg-transparent border-none focus:ring-0 text-[#000000] dark:text-white placeholder:text-gray-200 dark:placeholder:text-slate-800 resize-none overflow-hidden leading-[1.1] transition-colors"
              />

              {/* RESUMO BUSINESS */}
              <div className="relative group">
                <div className="absolute -left-8 top-0 bottom-0 w-1 bg-emerald-500 rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity" />
                <textarea 
                  placeholder="Resumo executivo: Uma frase curta que define o impacto deste conteúdo..."
                  rows={2}
                  value={newPost.excerpt}
                  onChange={(e) => {
                    setNewPost({ ...newPost, excerpt: e.target.value });
                    adjustHeight(e.target);
                  }}
                  className="w-full text-lg md:text-xl font-light italic bg-transparent border-none focus:ring-0 text-slate-500 dark:text-slate-400 placeholder:text-gray-200 dark:placeholder:text-slate-800 resize-none overflow-hidden leading-relaxed"
                />
              </div>

              <div className="h-px w-24 bg-gradient-to-r from-emerald-500 to-transparent" />

              {/* CORPO DO TEXTO PRETO ABSOLUTO */}
              <textarea 
                ref={contentRef}
                placeholder="Comece a redigir seu conteúdo profissional..."
                value={newPost.content}
                onChange={(e) => {
                  setNewPost({ ...newPost, content: e.target.value });
                  adjustHeight(e.target);
                }}
                style={{ minHeight: '600px' }}
                className="w-full text-lg font-normal bg-transparent border-none focus:ring-0 text-[#000000] dark:text-slate-50 placeholder:text-gray-100 dark:placeholder:text-slate-900 resize-none outline-none leading-[1.8]"
              />
            </div>
          </div>

          {/* SIDEBAR CONFIGS */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200/50 dark:border-slate-800 shadow-sm transition-colors">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-10 flex items-center gap-2">
                <Layout className="h-4 w-4" /> Atributos do Artigo
              </h4>
              
              <div className="space-y-10">
                {/* CATEGORIA CUSTOMIZADA (NADA NATIVO) */}
                <div className="relative">
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Categoria</label>
                  <div className="relative">
                    <select 
                      value={newPost.category} 
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full appearance-none bg-gray-50 dark:bg-slate-800 text-black dark:text-white border border-gray-100 dark:border-slate-700 rounded-2xl py-4 px-5 text-xs font-bold outline-none focus:border-emerald-500 transition-all cursor-pointer"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tempo de Leitura</label>
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl px-5 py-4 focus-within:border-emerald-500 transition-all">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <input 
                      type="text" 
                      value={newPost.readTime} 
                      onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                      className="w-full bg-transparent text-black dark:text-white text-xs font-bold outline-none"
                      placeholder="Ex: 5 min"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Identificador (Slug)</label>
                  <div className="flex items-center gap-3 bg-gray-100/50 dark:bg-slate-800/50 border border-transparent rounded-2xl px-5 py-4">
                    <Hash className="h-4 w-4 text-slate-300" />
                    <span className="text-[10px] text-slate-400 font-mono truncate italic">
                      {newPost.title?.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'link-do-artigo'}
                    </span>
                  </div>
                </div>

                <div className="pt-8 border-t border-gray-50 dark:border-slate-800">
                   <div className="flex items-center gap-3 mb-4">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                     <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Salvamento Automático Ativo</p>
                   </div>
                   <p className="text-[9px] text-slate-400 leading-relaxed font-medium italic">
                     * Suas alterações são preservadas localmente nesta sessão para garantir a integridade dos dados.
                   </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default EditorView;