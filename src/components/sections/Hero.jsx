import { ArrowLeft, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[100vh] w-full flex flex-col justify-end px-6 lg:px-12 overflow-hidden">
      {/* Background Image */}
      <img 
        src="/nara_villa_hero.png" 
        alt="Nara Villa Exterior" 
        className="absolute inset-0 w-full h-full object-cover z-0"
        fetchpriority="high"
        loading="eager"
      />
      <div className="absolute inset-0 bg-black/25 z-[1]"></div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full text-white grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 lg:pb-24 items-end">
        
        {/* Main Heading (Moved up independently) */}
        <div className="lg:col-span-8 mb-24 lg:mb-56">
          <h1 className="font-bold text-[3rem] md:text-[5rem] lg:text-[6.5rem] leading-[0.85] tracking-[-0.05em] uppercase">
            Exclusive villa<br />
            <span className="md:pl-[8%]">retreats for</span><br />
            <span className="md:pl-[16%]">modern souls</span>
          </h1>
        </div>

        {/* Subtext (Lower Middle - Kept at bottom) */}
        <div className="lg:col-span-3 lg:pb-4">
          <p className="text-[14px] lg:text-[16px] text-white/80 font-medium leading-[1.6] max-w-[320px]">
            Discover our handpicked collection of luxury villas in Bali. Spaces designed for privacy, comfort, and an unforgettable stay.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
