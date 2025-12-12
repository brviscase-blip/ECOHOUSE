import React, { useState } from 'react';
import { Phone, Mail, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <section id="contact" className="relative py-24 bg-slate-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500 blur-3xl"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-2">Fale Conosco</h2>
            <h3 className="text-4xl font-bold mb-8 leading-tight">Vamos construir seu<br/>sonho juntos?</h3>
            <p className="text-gray-400 mb-12 text-lg">
              Entre em contato para agendar uma visita técnica ou solicitar um orçamento. Nossa equipe está pronta para atender você.
            </p>

            <div className="space-y-10">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/10 p-4 rounded-xl">
                  <Phone className="h-7 w-7 text-emerald-400" />
                </div>
                <div className="ml-5">
                  <h4 className="text-xl font-bold text-white">Telefone</h4>
                  <p className="mt-1 text-gray-300 text-lg">(92) 98182 1090</p>
                  <p className="text-gray-300 text-lg">(92) 99498 8464</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-white/10 p-4 rounded-xl">
                  <Mail className="h-7 w-7 text-emerald-400" />
                </div>
                <div className="ml-5">
                  <h4 className="text-xl font-bold text-white">E-mail</h4>
                  <p className="mt-1 text-gray-300 text-lg">financeiroehc.construcoes@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-2xl text-gray-900">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Send className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-2">Mensagem Enviada!</h4>
                <p className="text-gray-500">Agradecemos o contato. Retornaremos em breve.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-6 text-emerald-600 font-medium hover:underline"
                >
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h4 className="text-2xl font-bold mb-6 text-gray-900">Envie uma mensagem</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Interesse</label>
                  <select
                    id="interest"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  >
                    <option>Construção Residencial</option>
                    <option>Construção Comercial</option>
                    <option>Reforma</option>
                    <option>Consultoria</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? 'Enviando...' : 'Enviar Mensagem'}
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