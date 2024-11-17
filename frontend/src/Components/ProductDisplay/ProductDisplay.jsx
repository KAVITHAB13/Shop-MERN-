import React, { useContext, useState } from 'react';
import './ProductDisplay.css';
import star_icon from "../Assests/star_icon.png";
import star_dull_icon from "../Assests/star_dull_icon.png";
import { ShopContext } from '../../Context/ShopContext';

const ProductDisplay = (props) => {
    const { product } = props;

    const { addToCart } = useContext(ShopContext);

    const [isWishlisted, setIsWishlisted] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);
    const [notificationMessage, setNotificationMessage] = useState("");
    const [notificationColor, setNotificationColor] = useState("");

    const handleWishlistToggle = () => {
        setIsWishlisted(!isWishlisted);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = () => {
        if (!selectedSize) {
            setNotificationMessage("Please select a size");
            setNotificationColor("orange");
            setTimeout(() => setNotificationMessage(""), 3000); // Hide after 3 seconds
            return;
        }
        addToCart(product.id, selectedSize);
        setNotificationMessage("Added to Cart");
        setNotificationColor("green");
        setTimeout(() => setNotificationMessage(""), 3000); // Hide after 3 seconds
    };

    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">₹{product.old_price}</div>
                    <div className="productdisplay-right-price-new">₹{product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    A lightweight, usually knitted, pullover shirt with a close-fitting, round neckline and short sleeves, worn as an undershirt.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <div
                                key={size}
                                className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                                onClick={() => handleSizeSelect(size)}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="productdisplay-wishlist-cart">
                    <span
                        className={`heart-icon ${isWishlisted ? 'wishlisted' : ''}`}
                        onClick={handleWishlistToggle}
                    >
                        {isWishlisted ? '❤️' : '🤍'}
                    </span>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
                {notificationMessage && (
                    <div className="notification" style={{ backgroundColor: notificationColor }}>
                        <p>{notificationMessage}</p>
                    </div>
                )}
                <p className='productdisplay-right-category'><span>Category :</span> Women, T-shirt, Crop Top</p>
                <p className='productdisplay-right-category'><span>Tags :</span> Modern, latest</p>
            </div>
        </div>
    );
};

export default ProductDisplay;
