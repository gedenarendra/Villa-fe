import { ArrowUpRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 lg:py-40 px-6 lg:px-12 max-w-[1440px] mx-auto bg-cream dark:bg-transparent transition-colors duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
        
        {/* Left Side: Content */}
        <div className="lg:col-span-5 pt-4">
          <h2 className="font-bold text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1] tracking-[-0.04em] uppercase mb-10 text-charcoal dark:text-white transition-colors duration-500">
            Curated retreats in Bali's best locations
          </h2>
          <p className="text-gray-medium dark:text-white/60 text-[16px] lg:text-[18px] leading-[1.7] mb-12 max-w-md transition-colors duration-500">
            At Nara, we provide more than just a place to stay. We offer sanctuary and serenity through our collection of premium villas, each selected for its unique character and exceptional comfort.
          </p>
          <a href="#" className="group inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase text-charcoal dark:text-white border-b border-charcoal/20 dark:border-white/20 pb-2 hover:border-charcoal dark:hover:border-white transition-all duration-500">
            Explore More 
            <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
          </a>
        </div>

        {/* Right Side: Asymmetrical Grid */}
        <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
          <div className="col-span-7 overflow-hidden aspect-[3/4]">
            <img src="/nara_villa_hero.png" alt="Architecture" className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-1000" loading="lazy" />
          </div>
          <div className="col-span-5 flex flex-col gap-4">
            <div className="aspect-square overflow-hidden">
              <img src="/nara_villa_detail.png" alt="Interior detail" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="aspect-[4/5] overflow-hidden">
              <img src="/nara_villa_detail.png" alt="Texture detail" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
          
          {/* Subtle decorative square if needed to match design overlaps */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-charcoal dark:bg-white hidden lg:block -z-10 opacity-5 dark:opacity-5 transition-colors duration-500"></div>
        </div>
      </div>
    </section>
  );
};

export default About;
