// Capitalize Function
export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Currency Format Function
export const currencyFormat = (amount) => {
    return `₹${amount.toLocaleString("en-IN")}`;
};

// Date Format Function
export const dateFormat = (date) => {
    return new Date(date).toLocaleDateString("en-IN");
};