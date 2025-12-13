import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Save, Image as ImageIcon, Clock, 
  Eye, Check, Layout, Trash2, Bold, Italic, 
  List, Type, AlignLeft, ChevronDown, ArrowLeft
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
  
  const [isPreview, setIsPreview] = useState(false);
  const categories = ['Certificações', 'Inovação', 'Materiais', 'Eventos'];
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize para o conteúdo principal
  useEffect(() => {
    if (contentRef.current && !isPreview) {
      contentRef.current.style.height = 'auto';
      contentRef.current.style.height = contentRef.current.scrollHeight + 'px';
    }
  }, [newPost.content, isPreview]);

  const handleSave = () => {
    if (!newPost.title?.trim() || !newPost.content?.trim()) {
      alert("⚠️ O título e o conteúdo são obrigatórios para a publicação.");
      return;
    }

    const createdPost: BlogPost = {
      id: Date.now(),
      date: new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date()),
      title: newPost.title,
      category: newPost.category || 'Inovação',
      excerpt: newPost.excerpt || '',
      content: newPost.content,
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

  return (
    <div className="fixed inset-0 z-[15000] bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans">
      
      {/* HEADER SUPERIOR FIXO */}
      <header className="h-14 flex-shrink-0 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between px-6 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={onCancel}
            className="flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Sair do Editor
          </button>
          <div className="h-4 w-px bg-gray-200 dark:bg-slate-800" />
          <div className="flex gap-1">
             <div className="h-4 w-4 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Modo Edição Ativo</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsPreview(!isPreview)}
            className={`flex items-center gap-2 px-6 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md ${isPreview ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
          >
            <Eye className="h-3.5 w-3.5" /> {isPreview ? 'Editor' : 'Pré-visualizar'}
          </button>
          <button 
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-md text-[10px] font-extrabold uppercase tracking-widest shadow-lg shadow-emerald-500/10 transition-all flex items-center gap-2 active:scale-95"
          >
            <Check className="h-3.5 w-3.5" /> Publicar Artigo
          </button>
        </div>
      </header>

      {/* ÁREA PRINCIPAL: DIVIDIDA EM EDITOR E SIDEBAR */}
      <div className="flex-grow flex overflow-hidden">
        
        {/* LADO ESQUERDO: CANVAS DE ESCRITA */}
        <main className="flex-grow overflow-y-auto bg-[#F8FAFC] dark:bg-slate-950 px-4 md:px-10 py-10 flex flex-col items-center">
          
          {/* BARRA DE FERRAMENTAS FLUTUANTE ESTILO WORD */}
          {!isPreview && (
            <div className="sticky top-0 mb-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-1 rounded-lg shadow-xl flex items-center gap-1 z-40">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"><Bold className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"><Italic className="h-4 w-4" /></button>
              <div className="w-px h-6 bg-gray-200 dark:bg-slate-800 mx-1" />
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"><List className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"><Type className="h-4 w-4" /></button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-300"><AlignLeft className="h-4 w-4" /></button>
            </div>
          )}

          <div className="w-full max-w-4xl bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-sm min-h-[1100px] border border-gray-100 dark:border-slate-800 flex flex-col overflow-hidden">
            
            {/* CAPA DINÂMICA */}
            <div className="relative aspect-[21/9] bg-slate-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
              {newPost.imageUrl ? (
                <>
                  <img src={newPost.imageUrl} className="w-full h-full object-cover" alt="Cover" />
                  <div className="absolute inset-0 bg-black/10 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <label className="p-3 bg-white text-slate-900 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                      <ImageIcon className="h-5 w-5" />
                      <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </label>
                    <button 
                      onClick={() => setNewPost({...newPost, imageUrl: ''})}
                      className="p-3 bg-red-600 text-white rounded-full shadow-2xl hover:scale-110 transition-transform"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </>
              ) : (
                <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group hover:bg-slate-100/50 dark:hover:bg-slate-800/80 transition-all">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ImageIcon className="h-8 w-8 text-slate-400 group-hover:text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-500 uppercase tracking-[0.2em] transition-colors">Imagem de Capa do Artigo</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              )}
            </div>

            {/* CONTEÚDO EDITÁVEL */}
            <div className="p-10 md:p-20 space-y-12">
              {isPreview ? (
                <div className="animate-fade-in prose prose-xl dark:prose-invert max-w-none">
                  <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tighter leading-tight mb-6">
                    {newPost.title || 'Título em branco'}
                  </h1>
                  <p className="text-xl text-slate-500 dark:text-slate-400 italic mb-10 border-l-2 border-emerald-500 pl-6 leading-relaxed font-light">
                    {newPost.excerpt || 'Resumo do artigo em branco...'}
                  </p>
                  <div className="whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-[1.8] font-normal">
                    {newPost.content || 'Nenhum conteúdo escrito ainda.'}
                  </div>
                </div>
              ) : (
                <>
                  <textarea 
                    placeholder="Clique aqui para digitar o título..."
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full text-5xl font-extrabold bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white placeholder:text-slate-200 resize-none overflow-hidden leading-tight outline-none tracking-tighter"
                    rows={1}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />

                  <textarea 
                    placeholder="Adicione um breve resumo para os cards de notícias..."
                    value={newPost.excerpt}
                    onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                    className="w-full text-xl font-light bg-transparent border-none focus:ring-0 text-slate-500 dark:text-slate-400 placeholder:text-slate-200 resize-none outline-none leading-relaxed italic"
                    rows={2}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = 'auto';
                      target.style.height = target.scrollHeight + 'px';
                    }}
                  />

                  <div className="h-px w-full bg-slate-100 dark:bg-slate-800" />

                  <textarea 
                    ref={contentRef}
                    placeholder="Escreva seu artigo aqui... "
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    className="w-full text-lg font-normal bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-200 placeholder:text-slate-100 resize-none outline-none leading-[2] min-h-[600px] overflow-hidden"
                  />
                </>
              )}
            </div>
          </div>
        </main>

        {/* SIDEBAR DE CONFIGURAÇÕES FIXA */}
        <aside className="hidden xl:flex w-80 flex-shrink-0 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-800 p-8 flex-col gap-10">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 mb-8 flex items-center gap-2">
              <Layout className="h-4 w-4" /> Atributos do Artigo
            </h4>
            
            <div className="space-y-8">
              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Categoria</label>
                <div className="relative">
                  <select 
                    value={newPost.category} 
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-700 rounded-lg py-3 px-4 text-xs font-bold outline-none focus:border-emerald-500 transition-all cursor-pointer appearance-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Tempo de Leitura</label>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg px-4 py-3">
                  <Clock className="h-4 w-4 text-slate-400" />
                  <input 
                    type="text" 
                    value={newPost.readTime} 
                    onChange={(e) => setNewPost({ ...newPost, readTime: e.target.value })}
                    className="w-full bg-transparent text-slate-900 dark:text-white text-xs font-bold outline-none"
                    placeholder="5 min"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Identificador (Slug)</label>
                <div className="p-3 bg-slate-100 dark:bg-slate-800/50 rounded text-[9px] font-mono text-slate-400 break-all">
                  /artigos/{newPost.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') || 'o-slug-aparecera-aqui'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto bg-emerald-50 dark:bg-slate-800/50 p-6 rounded-xl border border-emerald-100 dark:border-emerald-950/20">
             <div className="flex items-center gap-2 mb-3">
               <div className="w-2 h-2 rounded-full bg-emerald-500" />
               <p className="text-[9px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-[0.2em]">Salvamento Automático Ativo</p>
             </div>
             <p className="text-[9px] text-emerald-800/60 dark:text-emerald-400/50 leading-relaxed italic">
               Suas alterações são preservadas localmente nesta sessão para garantir a integridade dos dados.
             </p>
          </div>
        </aside>

      </div>
    </div>
  );
};

export default EditorView;