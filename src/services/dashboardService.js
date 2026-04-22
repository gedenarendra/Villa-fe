/**
 * Dashboard Service
 * Handles data transformation and logic for the Admin Dashboard.
 * This separates business logic from the UI components.
 */

export const dashboardService = {
  /**
   * Filters villas that are currently rented (not available)
   */
  getRentedVillas: (villas) => {
    if (!Array.isArray(villas)) return [];
    return villas.filter(v => {
      const status = v.current_availability?.toLowerCase() || v.status?.toLowerCase();
      // Logic for determining if a villa is "rented"
      return status && status !== 'available' && status !== 'tersedia';
    });
  },

  /**
   * Calculates total revenue from bookings
   * Formula: Villa Price * Duration (Years)
   */
  calculateTotalRevenue: (bookings) => {
    if (!Array.isArray(bookings)) return 0;
    
    return bookings.reduce((acc, booking) => {
      const villa = booking.villa;
      if (!villa) return acc;

      const price = typeof villa.price_per_year === 'number' 
        ? villa.price_per_year 
        : parseFloat(villa.price_per_year || 0);

      // Calculate duration in years
      const startYear = new Date(booking.start_date).getFullYear();
      const endYear = new Date(booking.end_date).getFullYear();
      const duration = (endYear - startYear) + 1;

      return acc + (price * duration);
    }, 0);
  },

  /**
   * Generates mock chart data based on total revenue
   * In a real app, this might fetch from an /analytics endpoint
   */
  getChartData: (totalRevenue) => {
    return [
      { name: '2021', revenue: Math.floor(totalRevenue * 0.35) },
      { name: '2022', revenue: Math.floor(totalRevenue * 0.52) },
      { name: '2023', revenue: Math.floor(totalRevenue * 0.68) },
      { name: '2024', revenue: Math.floor(totalRevenue * 0.85) },
      { name: '2025', revenue: totalRevenue },
    ];
  },

  /**
   * Formats stats for the dashboard cards
   */
  getDashboardStats: (totalRevenue, rentedVillasCount, totalVillasCount) => {
    const conversionRate = totalVillasCount > 0 
      ? ((rentedVillasCount / totalVillasCount) * 100).toFixed(1) 
      : 0;

    return [
      {
        label: 'Total Revenue',
        value: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
        trend: 'Yearly',
        isUp: true,
        type: 'revenue'
      },
      {
        label: 'Total Properties',
        value: totalVillasCount,
        trend: `Active`,
        isUp: true,
        type: 'total'
      },
      {
        label: 'Rented Villas',
        value: rentedVillasCount,
        trend: 'Occupied',
        isUp: true,
        type: 'rented'
      },
      {
        label: 'Conversion Rate',
        value: `${conversionRate}%`,
        trend: 'Occupancy',
        isUp: true,
        type: 'conversion'
      }
    ];
  }
};
