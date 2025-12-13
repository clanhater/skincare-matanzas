export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('es-CO', { // Puedes cambiar 'es-CO' por tu país
        style: 'currency',
        currency: 'COP', // O tu moneda local (USD, MXN, etc.)
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};