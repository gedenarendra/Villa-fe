import { useVillas } from '../../hooks/useVillas';
import { useVillaForm } from '../../hooks/useVillaForm';
import { 
  Plus, 
  MoreVertical,
  Loader2,
  X,
  Camera,
  Users as UsersIcon,
  DollarSign,
  MapPin,
  Trash2
} from 'lucide-react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Catalog = () => {
  const { villas, loading, error, refresh, deleteVilla } = useVillas();
  const {
    isModalOpen,
    isSubmitting,
    formData,
    openModal,
    closeModal,
    handleChange,
    handleSubmit: originalSubmit
  } = useVillaForm(refresh);

  const handleSubmit = async (e) => {
    const result = await originalSubmit(e);
    if (result && result.success) {
      MySwal.fire({
        title: 'Success!',
        text: 'New villa has been added to catalog.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#fff'
      });
    } else if (result && !result.success) {
      MySwal.fire({
        title: 'Error!',
        text: result.error?.response?.data?.message || 'Failed to save property.',
        icon: 'error',
        confirmButtonColor: '#C5A358'
      });
    }
  };

  const handleDelete = async (id, name) => {
    const result = await MySwal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${name}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#C5A358', // Bronze color
      cancelButtonColor: '#111', // Charcoal color
      confirmButtonText: 'Yes, delete it!',
      background: '#fff',
      customClass: {
        popup: 'rounded-[2rem] border-none font-sans',
        title: 'text-charcoal font-black uppercase tracking-tight',
        confirmButton: 'rounded-xl px-6 py-3 text-[10px] font-bold uppercase tracking-widest',
        cancelButton: 'rounded-xl px-6 py-3 text-[10px] font-bold uppercase tracking-widest'
      }
    });

    if (result.isConfirmed) {
      const response = await deleteVilla(id);
      if (response.success) {
        MySwal.fire({
          title: 'Deleted!',
          text: 'The villa has been removed from catalog.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#fff',
          customClass: {
            popup: 'rounded-[2rem] border-none font-sans',
            title: 'text-charcoal font-black uppercase tracking-tight'
          }
        });
      } else {
        MySwal.fire({
          title: 'Error!',
          text: 'Something went wrong while deleting.',
          icon: 'error',
          confirmButtonColor: '#C5A358'
        });
      }
    }
  };


  if (error) {
    return (
      <div className="flex items-center justify-center h-[500px] text-red-500 text-[10px] font-black uppercase tracking-[0.3em]">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-10 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-charcoal dark:text-white uppercase tracking-tighter mb-2">Property Catalog</h2>
          <p className="text-sm text-charcoal/40 dark:text-white/40 font-medium italic">Manage your rental listings and availability status.</p>
        </div>
        <button 
          onClick={openModal}
          className="bg-charcoal dark:bg-bronze text-white px-8 py-4 rounded-2xl text-[10px] font-black tracking-[0.2em] uppercase hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-charcoal/20"
        >
          <Plus size={16} /> Add New Villa
        </button>
      </div>

      {/* Add Villa Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-charcoal/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#151515] w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className="p-8 border-b border-charcoal/5 dark:border-white/5 flex justify-between items-center bg-[#F9F9F8] dark:bg-charcoal/20">
              <div>
                <h3 className="text-xl font-black text-charcoal dark:text-white uppercase tracking-tight">New Villa Catalog</h3>
                <p className="text-[10px] font-bold text-charcoal/40 dark:text-white/40 uppercase tracking-widest mt-1">Fill in the property details</p>
              </div>
              <button 
                onClick={closeModal}
                className="p-3 rounded-xl bg-white dark:bg-white/5 text-charcoal/40 hover:text-charcoal dark:text-white/40 dark:hover:text-white transition-all shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-10 space-y-8 scrollbar-hide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Villa Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Villa Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Ocean Front Sanctuary"
                      className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Availability</label>
                  <select 
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-bronze/20 transition-all outline-none appearance-none"
                  >
                    <option value="available">Available</option>
                    <option value="not available">Not Available</option>
                  </select>
                </div>

                {/* Price / Year */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Price per Year (Rp)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 dark:text-white/20" />
                    <input 
                      type="number" 
                      name="price_per_year"
                      required
                      value={formData.price_per_year}
                      onChange={handleChange}
                      placeholder="500000000"
                      className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Max Guests */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Max Guests</label>
                  <div className="relative">
                    <UsersIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 dark:text-white/20" />
                    <input 
                      type="number" 
                      name="max_guests"
                      required
                      value={formData.max_guests}
                      onChange={handleChange}
                      placeholder="8"
                      className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Location</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 dark:text-white/20" />
                    <input 
                      type="text" 
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Uluwatu, Bali"
                      className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Featured Image URL</label>
                <div className="relative">
                  <Camera size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-charcoal/20 dark:text-white/20" />
                  <input 
                    type="url" 
                    name="image_url"
                    required
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none pl-12 pr-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 dark:text-white/40 ml-1">Description</label>
                <textarea 
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about this magnificent property..."
                  className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-6 py-4 rounded-3xl text-sm font-bold text-charcoal dark:text-white placeholder:text-charcoal/20 dark:placeholder:text-white/20 focus:ring-2 focus:ring-bronze/20 transition-all outline-none resize-none"
                ></textarea>
              </div>
            </form>

            {/* Modal Footer */}
            <div className="p-10 border-t border-charcoal/5 dark:border-white/5 bg-[#F9F9F8] dark:bg-charcoal/20 flex gap-4">
              <button 
                type="button"
                onClick={closeModal}
                className="flex-1 px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 hover:text-charcoal dark:hover:text-white transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-[2] bg-charcoal dark:bg-bronze text-white px-8 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-xl shadow-charcoal/10 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Processing...
                  </>
                ) : (
                  'Create Villa Catalog'
                )}
              </button>
            </div>

          </div>
        </div>
      )}


      {/* Table Container */}
      <div className="bg-white dark:bg-charcoal rounded-[2.5rem] border border-charcoal/5 dark:border-white/5 overflow-hidden shadow-sm min-h-[500px] transition-all duration-500">
        {loading ? (
          <div className="flex items-center justify-center h-[500px]">
            <Loader2 className="animate-spin text-bronze/20" size={40} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-charcoal/5 dark:border-white/5 bg-[#F9F9F8] dark:bg-[#151515] transition-colors duration-500">
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30">Villa Name</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30">Location</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30">Price / Year</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30">Status</th>
                  <th className="px-10 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-charcoal/30 dark:text-white/30 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charcoal/5 dark:divide-white/5">
                {(!Array.isArray(villas) || villas.length === 0) ? (
                  <tr>
                    <td colSpan="5" className="px-10 py-40 text-center">
                      <div className="flex flex-col items-center gap-4 opacity-10">
                        <p className="text-sm uppercase tracking-[0.5em] font-black">No Data Found</p>
                        <div className="w-20 h-[1px] bg-charcoal dark:bg-white"></div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  villas.map((villa) => (
                    <tr key={villa?.id || Math.random()} className="hover:bg-[#F9F9F8]/50 dark:hover:bg-white/5 transition-colors group">
                      <td className="px-10 py-8">
                        <p className="text-base font-black text-charcoal dark:text-white tracking-tight group-hover:text-bronze transition-colors">{villa?.name || 'Unknown'}</p>
                      </td>
                      <td className="px-10 py-8 text-sm text-charcoal/60 dark:text-white/60 font-bold">{villa?.location || 'N/A'}</td>
                      <td className="px-10 py-8 text-sm text-charcoal dark:text-white font-black">
                        Rp {typeof villa?.price_per_year === 'number' ? villa.price_per_year.toLocaleString() : (villa?.price_per_year || villa?.price || '0')} / Yr
                      </td>
                      <td className="px-10 py-8">
                        <span className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${
                          (villa?.status === 'available') 
                            ? 'bg-green-100 text-green-600 dark:bg-green-500/10 dark:text-green-400' 
                            : 'bg-red-100 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                        }`}>
                          {villa?.status || 'available'}
                        </span>
                      </td>
                      <td className="px-10 py-8 text-right flex justify-end gap-2">
                        <button 
                          onClick={() => handleDelete(villa.id, villa.name)}
                          className="p-3 rounded-xl text-red-400/40 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                        <button className="p-3 rounded-xl text-charcoal/20 hover:text-charcoal hover:bg-charcoal/5 dark:hover:text-white dark:hover:bg-white/5 transition-all">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
