// Shopping Cart
let cart = [];

// Add To Cart
export const addToCart = (product) => {
    cart.push(product);
    return `${product} added to cart.`;
};

// Remove From Cart
export const removeFromCart = (product) => {
    cart = cart.filter((item) => item !== product);
    return `${product} removed from cart.`;
};

// Get Cart
export const getCart = () => {
    return cart;
};
