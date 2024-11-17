import React, { useContext } from 'react';
import './Cartitems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assests/cart_cross_icon.png';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Cartitems = () => {
    const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const navigate = useNavigate(); // Initialize navigate

    // Calculate subtotal
    const subtotal = all_product.reduce((acc, e) => {
        if (cartItems[e.id]?.quantity > 0) {
            return acc + (e.new_price * cartItems[e.id].quantity);
        }
        return acc;
    }, 0);

    const handleProceedToCheckout = () => {
        navigate('/payment'); // Redirect to payment process page
    };

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id]?.quantity > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format">
                                <img src={e.image} alt="" className='carticon-product-icon' />
                                <p>{e.name}</p>
                                <p>₹{e.new_price}</p>
                                <p>{cartItems[e.id].selectedSize}</p>
                                <button className='cartitems-quantity'>{cartItems[e.id].quantity}</button>
                                <p>₹{e.new_price * cartItems[e.id].quantity}</p>
                                <img 
                                    className='cartitems-remove-icon'
                                    src={remove_icon} 
                                    onClick={() => removeFromCart(e.id)} 
                                    alt="Remove" 
                                />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}

            <div className="cart-bottom-wrapper">
                <div className="cart-totals">
                    <h3>Cart Totals</h3>
                    <div className="totals-wrapper">
                        <div className="subtotal-row">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>
                        <hr />
                        <div className="shipping-row">
                            <span>Shipping Fee</span>
                            <span>Free</span>
                        </div>
                        <hr />
                        <div className="total-row">
                            <span>Total</span>
                            <span>₹{subtotal}</span>
                        </div>
                    </div>
                    <button className="proceed-btn" onClick={handleProceedToCheckout}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>

                <div className="promo-section">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="promo-input">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cartitems;
