/**
 * Business Logic Utilities for Villas
 * Contains pure functions for data transformation and business rules.
 */

export const villaUtils = {
    /**
     * Finds the first available year for a villa based on existing bookings.
     * @param {Array} bookings - List of confirmed bookings
     * @param {number} startFrom - Year to start checking from
     * @param {number} maxYears - How many years to look ahead
     * @returns {number} The first year found that is not fully occupied
     */
    findFirstAvailableYear: (bookings, startFrom = new Date().getFullYear(), maxYears = 10) => {
        if (!Array.isArray(bookings)) return startFrom;

        let year = startFrom;
        const limit = startFrom + maxYears;

        while (year < limit) {
            const isOccupied = bookings.some(booking => {
                const sYear = new Date(booking.start_date).getFullYear();
                const eYear = new Date(booking.end_date).getFullYear();
                return year >= sYear && year <= eYear && booking.status === 'confirmed';
            });

            if (!isOccupied) return year;
            year++;
        }

        return startFrom;
    },

    /**
     * Formats WhatsApp message for booking inquiry
     */
    generateWhatsAppMessage: (villaName, startYear, endYear) => {
        const duration = endYear - startYear + 1;
        return `Halo Nara Villa, saya tertarik untuk menyewa ${villaName} dari tahun ${startYear} sampai ${endYear} (Durasi: ${duration} Tahun). Apakah unit ini masih tersedia untuk periode tersebut?`;
    },

    /**
     * Validates lease duration
     */
    validateLeaseDuration: (startYear, endYear) => {
        if (endYear < startYear) {
            return { valid: false, message: "Tahun selesai tidak boleh lebih kecil dari tahun mulai!" };
        }
        return { valid: true };
    }
};
