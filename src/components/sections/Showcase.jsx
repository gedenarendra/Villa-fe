import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Showcase = () => {
  return (
    <section id="projects" className="pb-32 px-6 lg:px-12 max-w-[1800px] mx-auto">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] lg:aspect-[21/9] overflow-hidden group">
        <img 
          src="/nara_villa_hero.png" 
          alt="Featured Project" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/40 transition-opacity duration-700 group-hover:bg-black/30"></div>
        
        <div className="absolute bottom-0 left-0 p-8 lg:p-20 text-white z-10 w-full max-w-4xl">
          <h3 className="font-bold text-[2rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1] tracking-[-0.04em] uppercase mb-8">
            Find your perfect<br />escape at nara
          </h3>
          <p className="text-white/70 text-[16px] md:text-[18px] leading-relaxed mb-12 max-w-xl font-medium">
            Discover a world where every detail is taken care of. From cliffside views to tropical gardens, find the villa that fits your dream vacation.
          </p>
          <Link to="/#catalog" className="group/link inline-flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] uppercase text-white border-b border-white/30 pb-2 hover:border-white transition-all duration-500">
            Find Your Escape 
            <ArrowRight size={16} className="group-hover/link:translate-x-2 transition-transform duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
};


export default Showcase;
