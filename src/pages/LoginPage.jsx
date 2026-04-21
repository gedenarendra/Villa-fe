import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

const LoginPage = () => {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    login, 
    loading, 
    error 
  } = useAuth();

  const handleLogin = async (e) => {
    await login(e);
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="w-full max-w-md bg-white p-12 shadow-sm border border-charcoal/5 relative">
        {/* Back Button */}
        <Link 
          to="/" 
          className="absolute top-8 left-8 text-charcoal/30 hover:text-charcoal transition-colors flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          <span>Back</span>
        </Link>

        <div className="text-center mb-12 mt-4">
          <h1 className="font-bold text-[10px] tracking-[0.3em] uppercase text-charcoal/40 mb-4">Admin Portal</h1>
          <h2 className="font-bold text-3xl tracking-tighter uppercase text-charcoal">Nara Villa</h2>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-charcoal/60">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-cream/50 border-none px-10 py-4 text-sm focus:ring-1 focus:ring-charcoal/10 transition-all outline-none"
                placeholder="admin@nara.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold tracking-[0.1em] uppercase text-charcoal/60">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/30" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError(null);
                }}
                className="w-full bg-cream/50 border-none px-10 py-4 text-sm focus:ring-1 focus:ring-charcoal/10 transition-all outline-none"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-wider">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-charcoal text-white py-5 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-bronze transition-all duration-500 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            {!loading && <ArrowRight size={14} />}
          </button>
        </form>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-charcoal/20 uppercase tracking-[0.3em]">
            Authorized Access Only
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
