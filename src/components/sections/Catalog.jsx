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
              <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                <img 
                  src={item?.images?.find(img => img.is_primary)?.image_url || item?.images?.[0]?.image_url || '/nara_villa_hero.png'} 
                  alt={item?.name || 'Villa'} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  loading="lazy"
                  width="600"
                  height="800"
                />
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  <div className="bg-white/90 dark:bg-charcoal/90 backdrop-blur-sm px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white transition-colors duration-500">
                    Rp {typeof item?.price_per_year === 'number' ? item.price_per_year.toLocaleString() : (item?.price_per_year || '4.5M')} / Year
                  </div>
                  <div className={`px-3 py-1 text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md flex items-center gap-2 transition-colors duration-500 ${
                    item?.current_availability === 'available' 
                      ? 'bg-green-500/80 text-white' 
                      : item?.current_availability === 'limited'
                        ? 'bg-amber-400/90 text-charcoal'
                        : 'bg-red-500/80 text-white'
                  }`}>
                    <span>
                      {item?.current_availability === 'fully booked' ? 'Fully Booked' : 
                       item?.current_availability === 'limited' ? 'Limited Availability' : 
                       'Available'}
                    </span>
                    {item?.current_availability !== 'available' && item?.next_available_year && (
                      <span className={`${item?.current_availability === 'limited' ? 'bg-charcoal/10' : 'bg-white/20'} px-1.5 py-0.5 rounded-sm`}>
                        NEXT: {item.next_available_year}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <h4 className="font-bold text-lg uppercase tracking-tight mb-2 text-charcoal dark:text-white group-hover:text-bronze dark:group-hover:text-bronze transition-colors duration-500">
                {item?.name || 'Unnamed Villa'}
              </h4>
              <p className="text-gray-medium dark:text-white/60 text-[10px] font-bold uppercase tracking-[0.15em] transition-colors duration-500">
                {item?.category || 'Luxury Rental'} • {item?.location || 'Uluwatu'}
              </p>
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
