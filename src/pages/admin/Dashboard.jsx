import { useDashboard } from '../../hooks/useDashboard.jsx';
import { 
  TrendingUp,
  TrendingDown,
Home as HomeIcon,
  Loader2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} 
from 'recharts';

const Dashboard = () => {
  const { villas, stats, chartData, loading, error } = useDashboard();


  if (error) {
     return (
       <div className="flex items-center justify-center h-[60vh] text-red-500 font-bold uppercase tracking-widest text-xs">
         {error}
       </div>
     );
  }

  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-3xl font-black text-charcoal dark:text-white uppercase tracking-tighter mb-2">Revenue Analytics</h2>
        <p className="text-sm text-charcoal/40 dark:text-white/40 font-medium italic">Tracking performance for rented properties.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white dark:bg-charcoal p-8 rounded-[2rem] border border-charcoal/5 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-500 group">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-full ${stat.isUp ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {stat.isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30 mb-2">{stat.label}</p>
            <h3 className="text-2xl font-black text-charcoal dark:text-white tracking-tight">{loading ? '...' : stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white dark:bg-charcoal p-10 rounded-[2.5rem] border border-charcoal/5 dark:border-white/5 shadow-sm transition-all duration-500">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h3 className="text-xl font-black text-charcoal dark:text-white tracking-tight">Financial Growth</h3>
            <p className="text-xs text-charcoal/40 dark:text-white/40 font-medium">Monthly revenue trends from active rentals</p>
          </div>
          <div className="flex gap-2">
            <button className="px-5 py-2.5 bg-bronze text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-bronze/20">Monthly</button>
            <button className="px-5 py-2.5 bg-[#F9F9F8] dark:bg-white/5 text-charcoal/40 dark:text-white/40 text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-charcoal dark:hover:text-white transition-colors">Yearly</button>
          </div>
        </div>

        <div className="h-[450px] w-full">
          {loading ? (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="animate-spin text-bronze/20" size={40} />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C5A358" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#C5A358" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" opacity={0.05} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fontWeight: 800, fill: '#888'}}
                  dy={15}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 11, fontWeight: 800, fill: '#888'}}
                  tickFormatter={(value) => `Rp ${value / 1000}k`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#111', 
                    border: 'none', 
                    borderRadius: '20px',
                    padding: '15px 20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                  }}
                  itemStyle={{ color: '#C5A358', fontSize: '12px', fontWeight: 900 }}
                  labelStyle={{ color: '#fff', fontSize: '10px', textTransform: 'uppercase', marginBottom: '5px', letterSpacing: '1px' }}
                  cursor={{ stroke: '#C5A358', strokeWidth: 1, strokeDasharray: '5 5' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#C5A358" 
                  strokeWidth={5}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
        <div className="bg-white dark:bg-charcoal p-10 rounded-[2.5rem] border border-charcoal/5 dark:border-white/5 shadow-sm">
          <h3 className="text-xs font-black text-charcoal dark:text-white uppercase tracking-[0.2em] mb-8">Latest Properties</h3>
          <div className="space-y-8">
            {villas.slice().reverse().slice(0, 3).map((villa, idx) => {
              const statusStr = villa.status?.toLowerCase();
              
              // Mapping warna & label berdasarkan Enum Backend
              let statusLabel = 'Available';
              let statusColor = 'bg-green-500/10 text-green-500';

              if (statusStr === 'fullbooked') {
                statusLabel = 'Full Booked';
                statusColor = 'bg-red-500/10 text-red-500';
              } else if (statusStr === 'partially_booked') {
                statusLabel = 'Partially Booked';
                statusColor = 'bg-yellow-500/10 text-yellow-600';
              }

              return (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#F9F9F8] dark:bg-white/5 flex items-center justify-center text-charcoal/10 group-hover:bg-bronze/10 group-hover:text-bronze transition-all duration-500 rotate-2 group-hover:rotate-0">
                      <HomeIcon size={24} />
                    </div>
                    <div>
                      <p className="text-base font-black text-charcoal dark:text-white transition-colors">{villa.name}</p>
                      <p className="text-[10px] text-charcoal/30 dark:text-white/30 font-bold uppercase tracking-[0.1em]">{villa.location || 'Location Not Set'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-base font-black text-charcoal dark:text-white">Rp {villa.price_per_year ? Number(villa.price_per_year).toLocaleString('id-ID') : '0'}</p>
                    <p className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-md inline-block ${statusColor}`}>
                      {statusLabel}
                    </p>
                  </div>
                </div>
              );
            })}
            {villas.length === 0 && !loading && (
              <div className="text-center py-10 opacity-20">
                <p className="text-xs font-black uppercase tracking-widest">No properties found</p>
              </div>
            )}
          </div>
        </div>


        <div className="bg-charcoal text-white p-12 rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group flex flex-col justify-center">
           <div className="relative z-10">
             <span className="inline-block bg-bronze/20 text-bronze text-[9px] font-black uppercase tracking-[0.3em] px-3 py-1.5 rounded-full mb-6">AI Insights</span>
             <p className="text-2xl font-light leading-relaxed mb-10 max-w-sm">
               Based on current trends, <span className="font-black text-bronze underline decoration-bronze/30 underline-offset-8">Ocean View</span> properties are yielding 15% higher returns.
             </p>
             <button className="bg-white text-charcoal px-8 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:bg-bronze hover:text-white transition-all shadow-xl active:scale-95">
               Optimize Pricing
             </button>
           </div>
           <div className="absolute -right-20 -bottom-20 opacity-[0.03] group-hover:opacity-[0.07] group-hover:scale-110 transition-all duration-1000 pointer-events-none">
              <TrendingUp size={400} />
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
