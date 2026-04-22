import { useCalendar } from '../../hooks/useCalendar';
import { Calendar as CalendarIcon, Loader2, CheckCircle, AlertCircle, Edit2, Trash2, X } from 'lucide-react';

const CalendarManager = () => {
  const {
    villas,
    bookings,
    loading,
    submitting,
    message,
    selectedVilla,
    setSelectedVilla,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
    note,
    setNote,
    handleBlock,
    handleEdit,
    handleDelete,
    isEditing,
    resetForm
  } = useCalendar();

  if (loading) return (
    <div className="flex items-center justify-center h-[500px]">
      <Loader2 className="animate-spin text-bronze" size={40} />
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-black text-charcoal dark:text-white uppercase tracking-tighter mb-2">Calendar Management</h2>
          <p className="text-sm text-charcoal/40 dark:text-white/40 font-medium italic">Block years range and manage property availability.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Block Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-charcoal-light p-8 rounded-[2.5rem] border border-charcoal/5 dark:border-white/5 shadow-sm sticky top-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-charcoal dark:text-white flex items-center gap-3">
                <CalendarIcon className="w-4 h-4 text-bronze" />
                {isEditing ? 'Edit Block Range' : 'Block Year Range'}
              </h3>
              {isEditing && (
                <button 
                  onClick={resetForm}
                  className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors"
                  title="Cancel Edit"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <form onSubmit={handleBlock} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">Select Villa</label>
                <select 
                  value={selectedVilla}
                  onChange={(e) => setSelectedVilla(e.target.value)}
                  required
                  disabled={isEditing} // Cannot change villa when editing
                  className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-bronze/20 transition-all outline-none disabled:opacity-50"
                >
                  <option value="">Choose a villa...</option>
                  {villas.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">Start Year</label>
                  <select 
                    value={startYear}
                    onChange={(e) => setStartYear(parseInt(e.target.value))}
                    required
                    className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-4 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                  >
                    {[...Array(11).keys()].map(offset => {
                      const year = (isEditing ? Math.min(startYear, new Date().getFullYear()) : new Date().getFullYear()) + offset - (isEditing ? 2 : 0);
                      if (year < 2020) return null; // Reasonable floor
                      return <option key={year} value={year}>{year}</option>
                    }).filter(Boolean)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">Until Year</label>
                  <select 
                    value={endYear}
                    onChange={(e) => setEndYear(parseInt(e.target.value))}
                    required
                    className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-4 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                  >
                    {[0,1,2,3,4,5,6,7,8,9,10].map(offset => {
                      const year = startYear + offset;
                      return <option key={year} value={year}>{year}</option>
                    })}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-charcoal/40 ml-1">Note (Optional)</label>
                <input 
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. 3 Years Contract"
                  className="w-full bg-[#F9F9F8] dark:bg-white/5 border-none px-6 py-4 rounded-2xl text-sm font-bold text-charcoal dark:text-white focus:ring-2 focus:ring-bronze/20 transition-all outline-none"
                />
              </div>

              {message && (
                <div className={`p-4 rounded-xl flex items-center gap-3 text-xs font-bold ${
                  message.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                }`}>
                  {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                  {message.text}
                </div>
              )}

              <div className="flex gap-3">
                {isEditing && (
                  <button 
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-charcoal/5 dark:bg-white/5 text-charcoal dark:text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-charcoal/10 transition-all"
                  >
                    Cancel
                  </button>
                )}
                <button 
                  type="submit"
                  disabled={submitting}
                  className={`flex-[2] py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 ${
                    isEditing ? 'bg-bronze text-white' : 'bg-charcoal dark:bg-bronze text-white'
                  }`}
                >
                  {submitting ? <Loader2 className="animate-spin" size={16} /> : (isEditing ? 'Update Range' : 'Save Block Range')}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bookings List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-charcoal rounded-[2.5rem] border border-charcoal/5 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="p-8 border-b border-charcoal/5 dark:border-white/5 bg-[#F9F9F8] dark:bg-[#151515]">
              <h3 className="text-sm font-black uppercase tracking-widest text-charcoal dark:text-white">Active Lease Periods</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-charcoal/5 dark:border-white/5">
                    <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-charcoal/30">Villa Name</th>
                    <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-charcoal/30">Lease Range</th>
                    <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-charcoal/30 text-center">Duration</th>
                    <th className="px-8 py-6 text-[9px] font-black uppercase tracking-widest text-charcoal/30 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-charcoal/5 dark:divide-white/5">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-8 py-20 text-center text-[10px] font-bold uppercase tracking-[0.3em] opacity-20">No data found</td>
                    </tr>
                  ) : (
                    bookings.map(booking => {
                      const sYear = new Date(booking.start_date).getFullYear();
                      const eYear = new Date(booking.end_date).getFullYear();
                      return (
                        <tr key={booking.id} className="hover:bg-cream/20 dark:hover:bg-white/5 transition-colors">
                          <td className="px-8 py-6">
                            <p className="text-sm font-black text-charcoal dark:text-white">{booking.villa?.name || 'Unknown Villa'}</p>
                            {booking.note && <p className="text-[10px] text-charcoal/40 dark:text-white/40 font-medium">{booking.note}</p>}
                          </td>
                          <td className="px-8 py-6">
                            <p className="text-xs font-bold text-charcoal/60 dark:text-white/60">
                              {sYear === eYear ? `Year ${sYear}` : `${sYear} - ${eYear}`}
                            </p>
                          </td>
                          <td className="px-8 py-6 text-center">
                            <p className="text-xs font-bold text-charcoal dark:text-white">{eYear - sYear + 1} Yrs</p>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleEdit(booking)}
                                className="p-2.5 rounded-xl bg-bronze/10 text-bronze hover:bg-bronze hover:text-white transition-all"
                                title="Edit"
                              >
                                <Edit2 size={14} />
                              </button>
                              <button 
                                onClick={() => handleDelete(booking.id)}
                                className="p-2.5 rounded-xl bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
                                title="Delete"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarManager;
