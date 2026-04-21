import { useState, useEffect, useCallback, useMemo } from 'react';
import { useVillas } from './useVillas';
import { villaService } from '../services/villaService';
import { dashboardService } from '../services/dashboardService';
import { 
  DollarSign, 
  Home as HomeIcon, 
  Users, 
  TrendingUp 
} from 'lucide-react';

/**
 * Custom Hook: useDashboard
 * Encapsulates analytical logic for the admin dashboard.
 */
export const useDashboard = () => {
    const { villas, loading: villasLoading, error: villasError, refresh: refreshVillas } = useVillas();
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(true);
    const [bookingsError, setBookingsError] = useState(null);

    const fetchBookings = useCallback(async () => {
        try {
            setBookingsLoading(true);
            const data = await villaService.getBookings();
            setBookings(data || []);
        } catch (err) {
            setBookingsError('Failed to load bookings');
        } finally {
            setBookingsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const loading = villasLoading || bookingsLoading;
    const error = villasError || bookingsError;

    const refresh = useCallback(() => {
        refreshVillas();
        fetchBookings();
    }, [refreshVillas, fetchBookings]);

    const dashboardData = useMemo(() => {
        if (!villas || villas.length === 0) return {
            stats: [],
            chartData: [],
            rentedVillas: [],
            totalRevenue: 0
        };

        const rentedVillas = dashboardService.getRentedVillas(villas);
        const totalRevenue = dashboardService.calculateTotalRevenue(bookings);
        const chartData = dashboardService.getChartData(totalRevenue);
        const rawStats = dashboardService.getDashboardStats(totalRevenue, rentedVillas.length, villas.length);

        // Map raw stats to include UI specific properties (icons, colors)
        const stats = rawStats.map(stat => {
            switch(stat.type) {
                case 'revenue':
                    return { ...stat, icon: <DollarSign size={20} className="text-bronze" />, color: 'bg-bronze/10' };
                case 'total':
                    return { ...stat, icon: <HomeIcon size={20} className="text-purple-500" />, color: 'bg-purple-500/10' };
                case 'rented':
                    return { ...stat, icon: <Users size={20} className="text-blue-500" />, color: 'bg-blue-500/10' };
                case 'conversion':
                    return { ...stat, icon: <TrendingUp size={20} className="text-green-500" />, color: 'bg-green-500/10' };
                default:
                    return stat;
            }
        });

        return {
            stats,
            chartData,
            rentedVillas,
            totalRevenue
        };
    }, [villas, bookings]);

    return {
        villas,
        ...dashboardData,
        loading,
        error,
        refresh
    };
};
