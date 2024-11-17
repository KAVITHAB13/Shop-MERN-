import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index <= 300; index++) {
        cart[index] = { quantity: 0, selectedSize: null };
    }
    return cart;
};

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch("http://localhost:4000/allproducts")
            .then((response) => response.json())
            .then((data) => setAll_Product(data))
            .catch((error) => console.error("Error fetching products:", error));

        const authToken = localStorage.getItem('auth-token');
        if (authToken) {
            fetch('http://localhost:4000/getcart', {
                method: 'POST',
                headers: {
                    'auth-token': authToken,
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((data) => {
                const updatedCart = getDefaultCart();
                for (const item in data) {
                    if (data[item] > 0) {
                        updatedCart[item] = { quantity: data[item], selectedSize: null };
                    }
                }
                setCartItems(updatedCart);
            })
            .catch((error) => console.error("Error fetching cart:", error));
        }
    }, []);

    const addToCart = (itemId, size) => {
        const authToken = localStorage.getItem("auth-token");

        if (authToken) {
            fetch("http://localhost:4000/addtocart", {
                method: "POST",
                headers: {
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then(() => {
                setCartItems((prev) => ({
                    ...prev,
                    [itemId]: {
                        quantity: prev[itemId].quantity + 1,
                        selectedSize: size, // Save the selected size here
                    },
                }));
            })
            .catch((error) => console.error("Error adding to cart:", error));
        } else {
            console.warn("No auth-token found. User is not authenticated.");
        }
    };

    const removeFromCart = (itemId, size) => {
        const authToken = localStorage.getItem("auth-token");

        if (authToken) {
            fetch("http://localhost:4000/removefromcart", {
                method: "POST",
                headers: {
                    "auth-token": authToken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ itemId }),
            })
            .then((response) => response.json())
            .then(() => {
                setCartItems((prev) => {
                    const currentItem = prev[itemId];
                    if (currentItem.quantity > 0) {
                        return {
                            ...prev,
                            [itemId]: {
                                ...currentItem, // Keep the selected size when reducing quantity
                                quantity: currentItem.quantity - 1,
                            },
                        };
                    }
                    return prev;
                });
            })
            .catch((error) => console.error("Error removing from cart:", error));
        } else {
            console.warn("No auth-token found. User is not authenticated.");
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            const itemQuantity = cartItems[item].quantity;
            if (itemQuantity > 0) {
                const itemInfo = all_product.find((product) => product.id === Number(item));
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * itemQuantity;
                }
            }
        }
        return totalAmount;
    };

    const getTotalCartItems = () => {
        return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
    };

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
