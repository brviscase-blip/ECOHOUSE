
import React, { useState } from 'react';
import { ChevronLeft, Calendar, Clock, Edit2, X, Save, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { BlogPost } from '../types';

interface PostViewProps {
  post: BlogPost;
  onBack: () => void;
  isAdmin: boolean;
  onUpdatePost: (updated: BlogPost) => void;
}

const PostView: React.FC<PostViewProps> = ({ post, onBack, isAdmin, onUpdatePost }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState<BlogPost>({ ...post });
  const [showSavedMsg, setShowSavedMsg] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Persiste no localStorage do frontend
    const saved = localStorage.getItem('cs_blog_posts');
    const allPosts = saved ? JSON.parse(saved) as BlogPost[] : [];
    const updatedAll = allPosts.map(p => p.id === editedPost.id ? editedPost : p);
    
    // Se por algum motivo o post atual não estava na lista (ex: cache limpo), ele adiciona
    if (!updatedAll.find(p => p.id === editedPost.id)) {
      updatedAll.unshift(editedPost);
    }
    
    localStorage.setItem('cs_blog_posts', JSON.stringify(updatedAll));
    
    // Atualiza o estado global no App.tsx
    onUpdatePost(editedPost);
    setIsEditing(false);
    
    // Feedback visual de salvo
    setShowSavedMsg(true);
    setTimeout(() => setShowSavedMsg(false), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedPost({ ...editedPost, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-fade-in bg-white min-h-screen pt-32 pb-20 relative">
      {showSavedMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[13000] bg-emerald-600 text-white px-6 py-3 shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <CheckCircle className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-widest">Artigo Salvo no Navegador</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-emerald-600 font-bold text-[10px] uppercase tracking-[0.2em] mb-12 hover:-translate-x-2 transition-transform group">
          <ChevronLeft className="h-4 w-4" /> <span className="border-b border-transparent group-hover:border-emerald-600">Voltar para a Listagem</span>
        </button>

        <div className="space-y-8 mb-16">
          <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="bg-emerald-600 text-white px-3 py-1">{post.category}</span>
            <span className="flex items-center gap-2"><Calendar className="h-3 w-3" /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock className="h-3 w-3" /> {post.readTime}</span>
          </div>
          
          <div className="flex justify-between items-start gap-8">
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 tracking-tighter leading-tight flex-grow">{post.title}</h2>
            {isAdmin && (
              <button onClick={() => setIsEditing(true)} className="p-4 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Edit2 className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        <div className="relative aspect-[21/9] mb-16 overflow-hidden shadow-2xl">
          <img src={post.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="prose prose-lg max-w-none text-gray-700 font-light leading-relaxed space-y-8 whitespace-pre-wrap text-lg md:text-xl border-l-2 border-emerald-50 pl-8">
          {post.content || "Sem conteúdo disponível."}
        </div>

        <div className="mt-24 pt-12 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-emerald-950 flex items-center justify-center text-emerald-400 font-bold text-lg tracking-tighter">CS</div>
            <div><p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Redação Sustentável</p><p className="text-xs text-gray-400">Time de Inovação</p></div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 z-[12000] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto p-12 shadow-2xl relative border-t-4 border-emerald-500">
            <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900"><X className="h-6 w-6" /></button>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tighter uppercase mb-10 border-b pb-6">Edição de Conteúdo Local</h2>
            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Título do Post</label>
                  <input type="text" value={editedPost.title} onChange={(e) => setEditedPost({ ...editedPost, title: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none transition-all font-bold text-xl" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Categoria</label>
                    <input type="text" value={editedPost.category} onChange={(e) => setEditedPost({ ...editedPost, category: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Leitura</label>
                    <input type="text" value={editedPost.readTime} onChange={(e) => setEditedPost({ ...editedPost, readTime: e.target.value })} className="w-full px-4 py-3 bg-gray-50 border-b-2 border-transparent focus:border-emerald-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Texto Completo</label>
                  <textarea rows={12} value={editedPost.content} onChange={(e) => setEditedPost({ ...editedPost, content: e.target.value })} className="w-full px-4 py-3 bg-gray-50 outline-none resize-none border-b-2 border-transparent focus:border-emerald-500" />
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <label className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">Capa do Artigo</label>
                  <div className="relative group aspect-[16/10] bg-gray-50 border-2 border-dashed border-gray-200 overflow-hidden">
                    <img src={editedPost.imageUrl} className="w-full h-full object-cover" alt="" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
                <div className="flex gap-4 pt-10">
                  <button type="submit" className="flex-grow bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 text-xs uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2 shadow-xl"><Save className="h-4 w-4" /> Atualizar Localmente</button>
                  <button type="button" onClick={() => setIsEditing(false)} className="px-10 bg-gray-100 text-gray-600 font-bold py-5 text-xs uppercase tracking-widest">Cancelar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostView;
