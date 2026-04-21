import { User, Menu, Sun, Moon, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { useTheme } from '../hooks/useTheme';
import { useHeader } from '../hooks/useHeader';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isMenuOpen, navLinks, openMenu, closeMenu } = useHeader();

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 px-6 py-10 lg:px-12 flex justify-between items-center text-white">
        {/* Logo */}
        <div className="w-1/4">
          <Link to="/" className="font-bold text-[10px] lg:text-[12px] tracking-[0.2em] uppercase">
            Nara Villa
          </Link>
        </div>
        
        {/* Navigation - Desktop */}
        <nav className="hidden md:flex justify-center gap-10 lg:gap-16 font-medium text-[9px] lg:text-[13px] tracking-[0.15em] uppercase w-2/4">
          {navLinks.map((link) => (
            <NavHashLink 
              key={link.title} 
              smooth 
              to={link.href} 
              className="hover:text-white/60 transition-colors"
            >
              {link.title}
            </NavHashLink>
          ))}
        </nav>
        
        {/* Icons */}
        <div className="flex justify-end items-center gap-6 lg:gap-8 w-1/4">
          <button onClick={toggleTheme} className="hover:text-white/60 transition-colors" aria-label="Toggle Theme">
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          <Link to="/login" className="hover:text-white/60 transition-colors">
            <User size={16} strokeWidth={1.5} />
          </Link>
          <button 
            className="md:hidden hover:text-white/60 transition-colors"
            onClick={openMenu}
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-charcoal text-white flex flex-col p-8 md:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-bold text-[10px] tracking-[0.2em] uppercase">Nara Villa</span>
              <button onClick={closeMenu}>
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <NavHashLink 
                    smooth 
                    to={link.href} 
                    className="text-3xl font-bold uppercase tracking-tighter hover:text-bronze transition-colors"
                    onClick={closeMenu}
                  >
                    {link.title}
                  </NavHashLink>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto pt-10 border-t border-white/10 flex flex-col gap-4">
              <Link 
                to="/login" 
                className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-3"
                onClick={closeMenu}
              >
                <User size={14} /> My Account
              </Link>
              <p className="text-white/30 text-[9px] uppercase tracking-widest mt-4">
                &copy; 2024 Nara Villa Property
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
