import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useVillas } from '../../hooks/useVillas';

const Catalog = () => {
  const { villas: properties, loading, error } = useVillas();
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-bold uppercase tracking-widest text-[10px]">{error}</p>
      </div>
    );
  }

  return (
    <section id="catalog" className="py-24 lg:py-40 px-6 lg:px-12 max-w-[1440px] mx-auto bg-transparent transition-colors duration-500">
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-20 gap-8">
        <h2 className="font-bold text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] leading-[1] tracking-[-0.04em] uppercase text-charcoal dark:text-white text-center lg:text-left transition-colors duration-500">
          Explore Our<br />Villa Catalog
        </h2>
        <p className="text-gray-medium dark:text-white/60 text-sm lg:text-base max-w-sm mb-2 font-medium text-center lg:text-left transition-colors duration-500">
          Find your perfect getaway. Browse through our exclusive property catalog to check availability and book your next stay.
        </p>
      </div>

      <div className="relative group/catalog">
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-8 lg:gap-12 pb-12 -mx-6 px-6 lg:-mx-12 lg:px-12 scroll-smooth"
        >
        {loading ? (
          // Skeleton Loading
          [1, 2, 3, 4].map((n) => (
            <div key={n} className="flex-none w-[80vw] md:w-[calc(33.333%-2rem)] snap-start animate-pulse">
              <div className="aspect-[3/4] bg-cream dark:bg-white/5 mb-6 rounded-3xl"></div>
              <div className="h-6 bg-cream dark:bg-white/5 w-3/4 mb-2"></div>
              <div className="h-4 bg-cream dark:bg-white/5 w-1/4"></div>
            </div>
          ))
        ) : (
          properties && properties.length > 0 ? properties.map((item) => (
            <Link to={`/villas/${item.id}`} key={item?.id || Math.random()} className="group cursor-pointer block flex-none w-[80vw] md:w-[calc(33.333%-2rem)] snap-start">
              <div className="aspect-[3/4] overflow-hidden mb-8 relative rounded-3xl shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-700 bg-cream dark:bg-white/5">
                {/* Image with zoom effect */}
                <img 
                  src={item?.images?.find(img => img.is_primary)?.image_url || item?.images?.[0]?.image_url || '/nara_villa_hero.png'} 
                  alt={item?.name || 'Villa'} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  loading="lazy"
                />
                
                {/* Hover Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex flex-col justify-end p-8">
                  <p className="text-white/80 text-[10px] font-medium leading-relaxed mb-4 line-clamp-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-100">
                    {item?.description || 'Experience ultimate luxury in the heart of Bali. This property offers breathtaking views and world-class amenities.'}
                  </p>
                  <div className="w-full h-[1px] bg-white/20 mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-200">
                    Explore Now <span className="w-4 h-[1px] bg-white"></span>
                  </span>
                </div>

                {/* Top Labels */}
                <div className="absolute top-6 right-6 flex flex-col gap-2 items-end z-10">
                  <div className="bg-white/90 dark:bg-charcoal/90 backdrop-blur-md px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-charcoal dark:text-white shadow-xl transform group-hover:-translate-x-2 transition-transform duration-700">
                    Rp {item?.price_per_year ? Number(item.price_per_year).toLocaleString('id-ID') : '4.5M'} / Yr
                  </div>
                  
                  <div className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md flex items-center gap-2 transform group-hover:-translate-x-4 transition-transform duration-700 delay-75 shadow-xl ${
                    item?.status === 'available' 
                      ? 'bg-green-500/80 text-white' 
                      : item?.status === 'partially_booked'
                        ? 'bg-amber-400/90 text-charcoal'
                        : 'bg-red-500/80 text-white'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${item?.status === 'available' ? 'bg-white' : 'bg-charcoal/40'}`}></span>
                    <span>
                      {item?.status === 'fullbooked' ? 'Fully Booked' : 
                       item?.status === 'partially_booked' ? 'Partially Booked' : 
                       'Available'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="px-2">
                <h4 className="font-bold text-xl uppercase tracking-tighter mb-2 text-charcoal dark:text-white group-hover:text-bronze dark:group-hover:text-bronze transition-colors duration-500">
                  {item?.name || 'Unnamed Villa'}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-[1px] bg-charcoal/10 dark:bg-white/10"></span>
                  <p className="text-gray-medium dark:text-white/60 text-[9px] font-black uppercase tracking-[0.2em] transition-colors duration-500">
                    {item?.location || 'Bali'} • {item?.max_guests || '8'} Guests
                  </p>
                </div>
              </div>
            </Link>
          )) : (
            <div className="flex-none w-full text-center py-20 text-charcoal/20 dark:text-white/20 text-xs uppercase tracking-widest font-bold">
              No villas available at the moment
            </div>
          )
        )}
        </div>

        {/* Floating Navigation Arrows */}
        {properties && properties.length > 3 && (
          <>
            <button 
              onClick={() => scroll('left')}
              className="absolute -left-4 lg:-left-8 top-[40%] -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/90 dark:bg-charcoal/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-charcoal dark:text-white opacity-0 group-hover/catalog:opacity-100 transition-all duration-500 hidden lg:flex border border-charcoal/5 dark:border-white/5 hover:bg-bronze hover:text-white active:scale-90"
              aria-label="Scroll left"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="absolute -right-4 lg:-right-8 top-[40%] -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-white/90 dark:bg-charcoal/90 backdrop-blur-md shadow-2xl flex items-center justify-center text-charcoal dark:text-white opacity-0 group-hover/catalog:opacity-100 transition-all duration-500 hidden lg:flex border border-charcoal/5 dark:border-white/5 hover:bg-bronze hover:text-white active:scale-90"
              aria-label="Scroll right"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {properties && properties.length > 3 && (
        <div className="mt-4 flex flex-col items-center lg:items-start gap-6">
          <div className="h-[2px] w-full max-w-[200px] bg-charcoal/5 dark:bg-white/5 relative overflow-hidden rounded-full">
            <div 
              className="absolute inset-y-0 left-0 bg-bronze transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(5, scrollProgress)}%` }}
            />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-medium/60 dark:text-white/30 flex items-center gap-3">
            Swipe to explore <span className="w-8 h-[1px] bg-charcoal/10 dark:bg-white/10"></span>
          </p>
        </div>
      )}
    </section>
  );
};


export default Catalog;
