import React, { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';

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
    <section id="contact" className="relative py-32 bg-slate-950 text-white overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/10 blur-[120px] pointer-events-none"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          
          <div>
            <h2 className="text-emerald-400 font-bold tracking-[0.2em] uppercase text-xs mb-4">Contato</h2>
            <h3 className="text-5xl md:text-6xl font-bold mb-8 leading-tight tracking-tighter">
              Vamos erguer o seu <br/><span className="text-emerald-500">próximo marco?</span>
            </h3>
            <p className="text-gray-400 mb-12 text-lg font-light leading-relaxed max-w-md">
              Agende uma reunião técnica e descubra como nossa metodologia pode otimizar seu empreendimento.
            </p>

            <div className="space-y-12">
              <div className="flex items-center group">
                <div className="flex-shrink-0 w-12 h-12 border border-emerald-500/30 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <Phone className="h-5 w-5 text-emerald-400 group-hover:text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Telefone</p>
                  <p className="text-xl font-medium tracking-tight">(92) 98182 1090</p>
                </div>
              </div>

              <div className="flex items-center group">
                <div className="flex-shrink-0 w-12 h-12 border border-emerald-500/30 rounded-full flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                  <Mail className="h-5 w-5 text-emerald-400 group-hover:text-white" />
                </div>
                <div className="ml-6">
                  <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">E-mail</p>
                  <p className="text-xl font-medium tracking-tight">financeiroehc.construcoes@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-none p-10 shadow-2xl text-slate-900">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <Send className="h-10 w-10 text-emerald-600" />
                </div>
                <h4 className="text-3xl font-bold text-slate-900 mb-3">Recebido!</h4>
                <p className="text-gray-500 font-light">Em breve um de nossos engenheiros entrará em contato.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-sm font-bold uppercase tracking-widest text-emerald-600 hover:text-emerald-800"
                >
                  Nova Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="border-b border-gray-200 focus-within:border-emerald-500 transition-colors">
                    <label htmlFor="name" className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Nome Completo</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full py-2 bg-transparent text-slate-900 outline-none text-lg font-medium"
                      placeholder="Ex: João Silva"
                    />
                  </div>
                  <div className="border-b border-gray-200 focus-within:border-emerald-500 transition-colors">
                    <label htmlFor="phone" className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">WhatsApp</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full py-2 bg-transparent text-slate-900 outline-none text-lg font-medium"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div className="border-b border-gray-200 focus-within:border-emerald-500 transition-colors">
                  <label htmlFor="email" className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">E-mail Corporativo</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full py-2 bg-transparent text-slate-900 outline-none text-lg font-medium"
                    placeholder="exemplo@empresa.com"
                  />
                </div>

                <div className="border-b border-gray-200 focus-within:border-emerald-500 transition-colors">
                  <label htmlFor="message" className="block text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">Resumo do Projeto</label>
                  <textarea
                    id="message"
                    rows={3}
                    required
                    className="w-full py-2 bg-transparent text-slate-900 outline-none text-lg font-medium resize-none"
                    placeholder="Descreva brevemente sua necessidade..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-slate-950 hover:bg-emerald-700 text-white font-bold py-5 text-xs uppercase tracking-[0.3em] transition-all disabled:opacity-70"
                >
                  {formStatus === 'submitting' ? 'Processando...' : 'Enviar Solicitação'}
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