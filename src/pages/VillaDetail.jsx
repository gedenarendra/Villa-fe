import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useVillaDetail } from '../hooks/useVillaDetail';
import MainLayout from '../layouts/MainLayout';
import AvailabilityCalendar from '../components/common/AvailabilityCalendar';
import { Loader2, Users, MapPin, Calendar as CalendarIcon, MessageCircle, ArrowLeft } from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const VillaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const {
    villa,
    availability,
    loading,
    error,
    validationError,
    setValidationError,
    startYear,
    endYear,
    setStartYear,
    setEndYear,
    handleWhatsAppBooking
  } = useVillaDetail(id);

  React.useEffect(() => {
    if (validationError) {
      MySwal.fire({
        title: 'Invalid Selection',
        text: validationError,
        icon: 'error',
        confirmButtonColor: '#C5A358'
      }).then(() => setValidationError(null));
    }
  }, [validationError, setValidationError]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal">
      <Loader2 className="w-12 h-12 text-bronze animate-spin" />
    </div>
  );

  if (error || !villa) return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-charcoal text-center p-6">
      <div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-charcoal dark:text-white mb-4">Villa Not Found</h2>
        <button onClick={() => navigate('/')} className="text-bronze font-bold underline uppercase text-xs">Back to Home</button>
      </div>
    </div>
  );

  return (
    <MainLayout>
      <div className="pt-32 pb-20 px-6 lg:px-12 max-w-[1440px] mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/')} 
          className="group flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 hover:text-bronze transition-all mb-10"
        >
          <div className="w-8 h-8 rounded-full border border-charcoal/5 flex items-center justify-center group-hover:border-bronze transition-all">
            <ArrowLeft size={14} />
          </div>
          Back to Catalog
        </button>

        {/* Title Section */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 mb-6">
            <span className="px-4 py-1.5 bg-bronze/10 text-bronze text-[10px] font-bold uppercase tracking-widest rounded-full">
              {villa.location}
            </span>
            <span className="px-4 py-1.5 bg-charcoal/5 dark:bg-white/5 text-gray-medium dark:text-white/60 text-[10px] font-bold uppercase tracking-widest rounded-full">
              {villa.max_guests} Guests Max
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter text-charcoal dark:text-white leading-[0.9]">
            {villa.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Left Column: Gallery & Info */}
          <div className="lg:col-span-2 space-y-16">
            {/* Main Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 aspect-[16/9] overflow-hidden rounded-3xl bg-cream">
                <img 
                  src={villa.images?.[0]?.image_url || '/nara_villa_hero.png'} 
                  alt={villa.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              {villa.images?.slice(1, 5).map((img, idx) => (
                <div key={idx} className="aspect-square overflow-hidden rounded-3xl bg-cream">
                  <img src={img.image_url} alt={`${villa.name} view`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Description & Specs */}
            <div>
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-medium mb-8 border-b border-cream dark:border-white/5 pb-4">
                Property Overview
              </h2>
              <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                <p className="text-gray-medium dark:text-white/60 leading-relaxed whitespace-pre-line text-lg">
                  {villa.description}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-12 py-12 border-t border-cream dark:border-white/5">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-medium">Yearly Rate</span>
                  <span className="text-xl font-bold text-charcoal dark:text-white">Rp {villa.price_per_year ? Number(villa.price_per_year).toLocaleString('id-ID') : '0'}</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-medium">Capacity</span>
                  <span className="text-xl font-bold text-charcoal dark:text-white">{villa.max_guests} Persons</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-medium">Current Status</span>
                  <span className={`text-xl font-bold uppercase ${
                      villa.status === 'available' ? 'text-green-500' : 
                      villa.status === 'partially_booked' ? 'text-amber-500' : 
                      'text-red-500'
                    }`}>
                    {villa.status === 'fullbooked' ? 'Fully Booked' : villa.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Booking Sidebar (Sticky) */}
          <div className="relative">
            <div className="lg:sticky lg:top-32 space-y-8">
              {/* Availability Section */}
              <div className="bg-white dark:bg-charcoal-light p-8 rounded-[2.5rem] border border-cream dark:border-white/5 shadow-xl shadow-charcoal/5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-charcoal dark:text-white mb-6 flex items-center gap-3">
                  <CalendarIcon className="w-4 h-4 text-bronze" />
                  Yearly Availability
                </h3>
                <AvailabilityCalendar bookings={availability} villaStatus={villa.status} />
              </div>

              {/* Booking Action */}
              <div className="bg-charcoal text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-bronze/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                
                <h3 className="text-sm font-bold uppercase tracking-widest mb-8 relative z-10">Inquiry & Booking</h3>
                
                <div className="flex flex-col gap-6 mb-10 relative z-10">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/40 block mb-3 font-bold">Start Year</label>
                      <select 
                        value={startYear}
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          setStartYear(val);
                          if (endYear < val) setEndYear(val);
                        }}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-bronze transition-all text-white font-medium appearance-none"
                      >
                        {[0,1,2,3,4,5].map(offset => {
                          const year = new Date().getFullYear() + offset;
                          return <option key={year} value={year} className="bg-charcoal text-white">{year}</option>
                        })}
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] uppercase tracking-widest text-white/40 block mb-3 font-bold">Until Year</label>
                      <select 
                        value={endYear}
                        onChange={(e) => setEndYear(parseInt(e.target.value))}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-bronze transition-all text-white font-medium appearance-none"
                      >
                        {[0,1,2,3,4,5].map(offset => {
                          const year = startYear + offset;
                          return <option key={year} value={year} className="bg-charcoal text-white">{year}</option>
                        })}
                      </select>
                    </div>
                  </div>
                  
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <label className="text-[9px] uppercase tracking-widest text-white/40 block mb-2 font-bold">Lease Summary</label>
                    <p className="text-white font-bold text-sm">
                      {startYear === endYear ? `Full Year ${startYear}` : `${startYear} - ${endYear}`}
                    </p>
                    <div className="h-[1px] bg-white/10 my-3"></div>
                    <p className="text-bronze text-[10px] font-bold uppercase tracking-widest">
                      {endYear - startYear + 1} Years Total Duration
                    </p>
                  </div>
                </div>

                <button 
                  onClick={handleWhatsAppBooking}
                  className="w-full bg-bronze hover:bg-bronze-dark text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-[0.2em] text-[10px] transition-all transform hover:scale-[1.02] active:scale-95 shadow-xl shadow-bronze/20 relative z-10"
                >
                  <MessageCircle className="w-4 h-4" />
                  Inquire via WhatsApp
                </button>
                
                <p className="text-center text-[8px] text-white/20 mt-6 uppercase tracking-[0.2em] font-bold relative z-10">
                  Connect with Nara Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default VillaDetail;