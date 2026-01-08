
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Heart, 
  Settings, 
  PlusCircle,
  Eye,
  Star,
  Users,
  Download,
  CreditCard,
  ChevronRight,
  Code,
  Layers,
  Zap,
  Database,
  // Added Calendar to imports
  Calendar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', views: 400, clicks: 240 },
  { name: 'Feb', views: 300, clicks: 139 },
  { name: 'Mar', views: 200, clicks: 980 },
  { name: 'Apr', views: 278, clicks: 390 },
  { name: 'May', views: 189, clicks: 480 },
  { name: 'Jun', views: 239, clicks: 380 },
  { name: 'Jul', views: 349, clicks: 430 },
];

const Dashboard: React.FC = () => {
  const [showWixGuide, setShowWixGuide] = useState(false);

  const downloadTechnicalDocs = () => {
    const docsContent = `
# 📑 Guia de Integração Wix: MyListing Pro

## 1. Banco de Dados (Wix Data)
- Crie a coleção "Listings" com permissões de "Site Content".
- Campos obrigatórios: title (Text), type (Dropdown), rating (Number), images (Media Gallery).

## 2. Autenticação
- Utilize o 'Wix Members Area' para gerenciar perfis de donos de negócios.
- No React: Redirecione para '/login' (página nativa do Wix) se 'wix-members.currentMember' for nulo.

## 3. APIs Backend (Velo)
Para conectar este frontend:
\`\`\`javascript
// No arquivo masterPage.js do Wix
import { getListings } from 'backend/api.jsw';
$w("#customElement").on("requestData", async (event) => {
    const data = await getListings();
    $w("#customElement").setAttribute("listings", JSON.stringify(data));
});
\`\`\`
    `;

    const blob = new Blob([docsContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Wix-Integration-Guide.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 min-h-screen flex">
      {/* Sidebar Nav */}
      <aside className="hidden lg:flex w-72 bg-white border-r border-slate-200 flex-col sticky top-16 h-[calc(100vh-64px)]">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-12">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">W</div>
            <div>
              <h3 className="font-black text-slate-900 tracking-tight">Wix Admin</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sandbox Mode</p>
            </div>
          </div>

          <nav className="space-y-2">
            {[
              { icon: <LayoutDashboard size={20} />, label: 'Overview', active: !showWixGuide },
              { icon: <Layers size={20} />, label: 'Wix Connect', active: showWixGuide },
              { icon: <MessageSquare size={20} />, label: 'Messages', active: false },
              { icon: <CreditCard size={20} />, label: 'Billing', active: false },
            ].map((item, i) => (
              <button 
                key={i} 
                onClick={() => item.label === 'Wix Connect' ? setShowWixGuide(true) : setShowWixGuide(false)}
                className={`w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all ${item.active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'}`}
              >
                {item.icon}
                <span className="font-black text-sm uppercase tracking-wider">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          {showWixGuide ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
              <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-4xl font-black mb-4 tracking-tight">Próximos Passos: Wix</h2>
                  <p className="text-indigo-200 text-lg max-w-2xl font-medium">Siga este checklist para transformar este protótipo em uma plataforma real rodando no Wix Studio.</p>
                </div>
                <Database className="absolute -bottom-10 -right-10 w-64 h-64 text-white/5" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center"><Database size={24} /></div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">1. Setup Database</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">No Wix CMS, crie coleções para Listings, Reviews e Bookings. Use tipos de campo precisos.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center"><Zap size={24} /></div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">2. Backend Velo</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Crie arquivos .jsw no backend para expor funções wix-data.query() de forma segura.</p>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                  <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center"><Code size={24} /></div>
                  <h4 className="font-black text-slate-900 uppercase tracking-widest text-xs">3. Custom Element</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">Hospede o bundle React e adicione-o como um "Custom Element" no editor Wix.</p>
                </div>
              </div>

              <div className="bg-slate-900 p-10 rounded-[2.5rem] text-indigo-400 font-mono text-sm shadow-2xl">
                <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-4">
                  <span className="font-black uppercase tracking-widest">Exemplo de Conexão (Headless)</span>
                  <Code size={18} />
                </div>
                <pre className="overflow-x-auto">
{`import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({ clientId: 'SUA_CLIENT_ID' })
});

// Buscar dados reais:
const { items: listings } = await wixClient.items
  .query('Listings')
  .find();`}
                </pre>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Visão Geral do Site</h1>
                  <p className="text-slate-500 font-medium text-lg">Métricas simuladas da sua futura rede Wix.</p>
                </div>
                <button 
                  onClick={downloadTechnicalDocs}
                  className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center shadow-xl hover:bg-indigo-700 transition-all"
                >
                  <Download size={18} className="mr-2" />
                  Guia de Configuração
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { label: 'Visitas (Wix Analytics)', value: '142.8K', icon: <Eye />, color: 'bg-indigo-600', trend: '+12%' },
                  { label: 'Reservas Ativas', value: '892', icon: <Calendar />, color: 'bg-emerald-500', trend: '+45' },
                  { label: 'Vendas Totais', value: 'R$ 12.4K', icon: <CreditCard />, color: 'bg-amber-500', trend: '+14%' },
                  { label: 'Novos Membros', value: '2.4K', icon: <Users />, color: 'bg-rose-500', trend: '+8%' }
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                      <div className={`${stat.color} p-4 rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform`}>
                        {stat.icon}
                      </div>
                      <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter bg-slate-50 text-slate-500">
                        {stat.trend}
                      </span>
                    </div>
                    <h3 className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</h3>
                    <p className="text-3xl font-black text-slate-900 mt-2 tracking-tight">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-10 rounded-[3rem] border-2 border-slate-50 shadow-sm">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10, fontWeight: 900}} />
                      <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                      <Area type="monotone" dataKey="views" stroke="#4f46e5" strokeWidth={4} fillOpacity={0.1} fill="#4f46e5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
