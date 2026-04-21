import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-24 pb-12 px-8 lg:px-16">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          <div className="lg:col-span-2">
            <Link to="/" className="font-bold text-2xl uppercase tracking-widest-plus mb-6 text-white-pure block">Nara Villa</Link>
            <p className="text-white/50 max-w-sm leading-relaxed text-sm">
              Exclusive properties designed with intention and crafted for timelessness. Experience the art of modern living.
            </p>
          </div>
          
          <div>
            <h5 className="text-[10px] font-bold tracking-widest-plus uppercase mb-6 text-white/40">Office</h5>
            <address className="not-italic text-white/60 leading-loose text-sm">
              Jl. Uluwatu No. 124<br />
              Badung, Bali<br />
              80361 ID
            </address>
          </div>
          
          <div>
            <h5 className="text-[10px] font-bold tracking-widest-plus uppercase mb-6 text-white/40">Connect</h5>
            <div className="flex flex-col gap-4 text-white/60 text-sm">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Instagram</a>
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">Pinterest</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors w-fit">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-white/30 text-[10px] tracking-widest uppercase">
          <p>&copy; 2024 Nara Villa Property. All rights reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
