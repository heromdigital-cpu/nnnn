
import React, { useState } from 'react';
import { 
  ChevronRight, 
  MapPin, 
  Image as ImageIcon, 
  Tag, 
  CreditCard, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useLanguage } from '../App';

const AddListing: React.FC = () => {
  const { language } = useLanguage();
  const [step, setStep] = useState(1);
  const [listingType, setListingType] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const steps = [
    { num: 1, title: 'Tipo', icon: <Tag size={18} /> },
    { num: 2, title: 'Informações', icon: <Info size={18} /> },
    { num: 3, title: 'Localização', icon: <MapPin size={18} /> },
    { num: 4, title: 'Plano', icon: <CreditCard size={18} /> }
  ];

  const isPT = language === 'pt-BR';

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            {isPT ? 'Anuncie seu Negócio' : 'List your Business'}
          </h1>
          <p className="text-slate-500 font-medium">
            {isPT 
              ? 'Alcance milhares de clientes com nossa plataforma profissional.' 
              : 'Reach thousands of customers with our professional platform.'}
          </p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between mb-12 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center flex-grow last:flex-grow-0">
              <div className="flex flex-col items-center flex-grow">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm transition-all ${step >= s.num ? 'bg-indigo-600 text-white shadow-lg rotate-3' : 'bg-slate-100 text-slate-400'}`}>
                  {step > s.num ? <CheckCircle2 size={22} /> : s.num}
                </div>
                <span className={`text-[10px] uppercase font-black mt-3 tracking-[0.2em] ${step >= s.num ? 'text-indigo-600' : 'text-slate-400'}`}>
                  {s.title}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-1 flex-grow mx-4 rounded-full ${step > s.num ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          {step === 1 && (
            <div className="p-12 space-y-10 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">O que você está anunciando?</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {['Restaurante', 'Hotel', 'Evento', 'Vaga', 'Imóvel', 'Serviço'].map(t => (
                  <button 
                    key={t}
                    onClick={() => setListingType(t)}
                    className={`p-10 rounded-[2.5rem] border-4 transition-all text-center flex flex-col items-center group ${listingType === t ? 'border-indigo-600 bg-indigo-50/50' : 'border-slate-50 hover:border-slate-200'}`}
                  >
                    <span className="text-4xl mb-4 group-hover:scale-125 transition-transform duration-300">🏢</span>
                    <span className={`font-black uppercase text-xs tracking-widest ${listingType === t ? 'text-indigo-600' : 'text-slate-500'}`}>{t}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="p-12 space-y-10 animate-in fade-in duration-500">
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Informações Básicas</h2>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Nome do Negócio</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex: Blue Ocean Bistro" 
                    className="w-full bg-slate-50 border-none rounded-2xl p-5 font-bold text-lg focus:ring-4 focus:ring-indigo-100 outline-none transition-all" 
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest block">Descrição</label>
                  <textarea 
                    rows={5} 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-3xl p-6 font-medium text-slate-600 outline-none focus:ring-4 focus:ring-indigo-100 transition-all resize-none" 
                    placeholder="Conte sobre seu diferencial..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* Stepper Footer */}
          <div className="p-10 bg-slate-900 border-t border-white/5 flex items-center justify-between">
            <button 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className={`flex items-center space-x-3 font-black uppercase text-xs tracking-[0.2em] transition-all ${step === 1 ? 'opacity-0' : 'text-white hover:text-indigo-400'}`}
            >
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </button>

            <button 
              onClick={() => step < 4 ? setStep(step + 1) : alert('Anúncio enviado!')}
              className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] flex items-center space-x-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/40"
            >
              <span>{step === 4 ? 'Concluir' : 'Continuar'}</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddListing;
