import { Link } from 'react-router-dom';
import { useVillas } from '../../hooks/useVillas';

const Catalog = () => {
  const { villas: properties, loading, error } = useVillas();

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {loading ? (
          // Skeleton Loading
          [1, 2, 3].map((n) => (
            <div key={n} className="animate-pulse">
              <div className="aspect-[3/4] bg-cream dark:bg-white/5 mb-6"></div>
              <div className="h-6 bg-cream dark:bg-white/5 w-3/4 mb-2"></div>
              <div className="h-4 bg-cream dark:bg-white/5 w-1/4"></div>
            </div>
          ))
        ) : (
          properties && properties.length > 0 ? properties.map((item) => (
            <Link to={`/villas/${item.id}`} key={item?.id || Math.random()} className="group cursor-pointer block">
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
                    Rp {typeof item?.price_per_year === 'number' ? item.price_per_year.toLocaleString() : (item?.price_per_year || '4.5M')} / Yr
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
            <div className="col-span-3 text-center py-10 text-charcoal/20 dark:text-white/20 text-xs uppercase tracking-widest font-bold">
              No villas available at the moment
            </div>
          )
        )}
      </div>
    </section>
  );
};


export default Catalog;
