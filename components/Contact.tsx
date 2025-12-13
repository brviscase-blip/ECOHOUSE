import React, { useState } from 'react';
import { Phone, Mail, Send, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="py-48 bg-gray-100 dark:bg-slate-900/50 relative transition-colors border-t border-gray-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-32">
          
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold tracking-[0.4em] uppercase flex items-center gap-3">
                <span className="h-px w-8 bg-emerald-500"></span> Iniciar Projeto
              </h2>
              <h3 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tighter transition-colors">
                Sua visão, nossa <br/><span className="text-emerald-500">execução técnica.</span>
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg font-light leading-relaxed max-w-md transition-colors">
                Pronto para transformar sua infraestrutura? Nossa equipe técnica está disponível para diagnósticos precisos.
              </p>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1">Central de Atendimento</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white transition-colors">(92) 98182 1090</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                  <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 dark:text-gray-400 uppercase tracking-widest mb-1">E-mail Corporativo</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white break-all transition-colors">financeiroehc.construcoes@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-12 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.08)] dark:shadow-2xl border border-white dark:border-slate-800 transition-all rounded-3xl">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-emerald-50 dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-8">
                  <Send className="h-6 w-6" />
                </div>
                <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Recebido com Sucesso.</h4>
                <p className="text-gray-600 dark:text-gray-400 font-light mb-10">Retornaremos com uma análise inicial em até 24 horas.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-800 transition-colors"
                >
                  Nova Solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="space-y-8">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Nome / Empresa"
                      className="w-full py-4 bg-transparent border-b border-emerald-500/30 dark:border-emerald-500/20 text-slate-900 dark:text-white outline-none focus:border-emerald-500 text-sm font-bold transition-all placeholder:text-emerald-600/70 dark:placeholder:text-emerald-400/50"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <input
                      type="tel"
                      id="phone"
                      placeholder="WhatsApp"
                      className="w-full py-4 bg-transparent border-b border-emerald-500/30 dark:border-emerald-500/20 text-slate-900 dark:text-white outline-none focus:border-emerald-500 text-sm font-bold transition-all placeholder:text-emerald-600/70 dark:placeholder:text-emerald-400/50"
                    />
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="E-mail"
                      className="w-full py-4 bg-transparent border-b border-emerald-500/30 dark:border-emerald-500/20 text-slate-900 dark:text-white outline-none focus:border-emerald-500 text-sm font-bold transition-all placeholder:text-emerald-600/70 dark:placeholder:text-emerald-400/50"
                    />
                  </div>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Descrição breve do seu projeto..."
                    className="w-full py-4 bg-transparent border-b border-emerald-500/30 dark:border-emerald-500/20 text-slate-900 dark:text-white outline-none focus:border-emerald-500 text-sm font-bold resize-none transition-all placeholder:text-emerald-600/70 dark:placeholder:text-emerald-400/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-slate-950 dark:bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-5 text-[10px] uppercase tracking-[0.4em] transition-all disabled:opacity-70 flex items-center justify-center gap-3 shadow-xl rounded-xl"
                >
                  {formStatus === 'submitting' ? 'Enviando...' : 'Solicitar Orçamento Técnico'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;