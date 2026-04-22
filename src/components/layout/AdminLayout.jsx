import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, 
  Home, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Sun,
  Moon
} from 'lucide-react';

import { navigationService } from '../../services/navigationService';
import { useTheme } from '../../hooks/useTheme';

const AdminLayout = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = navigationService.getAdminNavItems();
  const activeItem = navigationService.getActiveItem(location.pathname);

  return (
    <div className="min-h-screen bg-[#F9F9F8] dark:bg-[#111111] flex transition-colors duration-500 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-charcoal text-white flex flex-col fixed h-full shadow-2xl z-20">
        <div className="p-8">
          <Link to="/" className="font-bold text-lg tracking-widest uppercase flex items-center gap-2">
            <span className="w-8 h-8 bg-bronze rounded-lg flex items-center justify-center text-xs">N</span>
            Nara Admin
          </Link>
        </div>
        
        <nav className="flex-grow px-4 space-y-2 mt-4">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              to={item.disabled ? '#' : item.path} 
              className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-all ${
                activeItem.id === item.id 
                  ? 'bg-white/10 text-white shadow-lg shadow-black/20' 
                  : item.disabled 
                    ? 'text-white/10 cursor-not-allowed' 
                    : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-4 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> Logout
          </button>
        </div>
      </aside>


      {/* Main Content Area */}
      <div className="flex-grow flex flex-col ml-64">
        {/* Top Header */}
        <header className="h-20 bg-white/80 dark:bg-charcoal/80 backdrop-blur-md border-b border-charcoal/5 dark:border-white/5 px-10 flex items-center justify-between sticky top-0 z-10 transition-colors duration-500">
          <div className="relative w-96">
            {/* <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-charcoal/20 dark:text-white/20" size={16} />
            <input 
              type="text" 
              placeholder="Search something..." 
              className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-12 py-3 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-bronze/20 text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 transition-all duration-500"
            /> */}
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-2xl bg-[#F9F9F8] dark:bg-white/5 text-charcoal/40 dark:text-white/40 hover:text-bronze dark:hover:text-bronze transition-all duration-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <div className="flex items-center gap-4 pl-6 border-l border-charcoal/5 dark:border-white/5">
              <div className="text-right">
                <p className="text-xs font-bold text-charcoal dark:text-white tracking-wide">Admin User</p>
                <p className="text-[10px] text-charcoal/40 dark:text-white/40 uppercase tracking-widest font-bold">Manager</p>
              </div>
              <div className="w-11 h-11 rounded-2xl bg-bronze/20 flex items-center justify-center text-bronze font-black text-xs shadow-inner rotate-3">
                AU
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-10">
          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
