import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload_area.svg';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [errors, setErrors] = useState({
        name: "",
        old_price: "",
        new_price: "",
        image: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
        setErrors({ ...errors, image: "" }); // Clear error when image is selected
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear error when field is changed
    };

    const validateInputs = () => {
        let errorMessages = {};
        let valid = true;

        if (!productDetails.name) {
            errorMessages.name = "Product title is required";
            valid = false;
        }

        if (!productDetails.old_price) {
            errorMessages.old_price = "Old price is required";
            valid = false;
        }

        if (!productDetails.new_price) {
            errorMessages.new_price = "Offer price is required";
            valid = false;
        }

        if (!image) {
            errorMessages.image = "Product image is required";
            valid = false;
        }

        setErrors(errorMessages);
        return valid;
    };

    const Add_Product = async () => {
        if (!validateInputs()) return;

        let formData = new FormData();
        formData.append('product', image);

        try {
            const response = await fetch('http://localhost:4000/upload', {
                method: 'POST',
                body: formData,
            });
            const responseData = await response.json();

            if (responseData.success) {
                const updatedProduct = { ...productDetails, image: responseData.image_url };

                const addProductResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                });

                const addProductData = await addProductResponse.json();

                if (addProductData.success) {
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 3000);
                    setProductDetails({
                        name: "",
                        image: "",
                        category: "women",
                        new_price: "",
                        old_price: ""
                    });
                    setImage(null);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input 
                    value={productDetails.name} 
                    onChange={changeHandler} 
                    type="text" 
                    name='name' 
                    placeholder='Type here' 
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="addproduct-price">
                <div className="addproduct-itemfield">
                    <p>Price</p>
                    <input 
                        value={productDetails.old_price} 
                        onChange={changeHandler} 
                        type="text" 
                        name="old_price" 
                        placeholder='Type here' 
                    />
                    {errors.old_price && <span className="error-message">{errors.old_price}</span>}
                </div>
                <div className="addproduct-itemfield">
                    <p>Offer Price</p>
                    <input 
                        value={productDetails.new_price} 
                        onChange={changeHandler} 
                        type="text" 
                        name="new_price" 
                        placeholder='Type here' 
                    />
                    {errors.new_price && <span className="error-message">{errors.new_price}</span>}
                </div>
            </div>
            <div className="addproduct-itemfield">
                <p>Product Category</p>
                <select 
                    value={productDetails.category} 
                    onChange={changeHandler} 
                    name="category" 
                    className='add-product-selector'
                >
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                    <img 
                        src={image ? URL.createObjectURL(image) : upload_area} 
                        className='addproduct-thumbnail-img' 
                        alt='' 
                    />
                </label>
                <input 
                    onChange={imageHandler} 
                    type="file" 
                    name='image' 
                    id='file-input' 
                    hidden 
                />
                {errors.image && <span className="error-message">{errors.image}</span>}
            </div>
            <button onClick={Add_Product} className='addproduct-btn'>ADD</button>

            {/* Success Message Box */}
            {showSuccessMessage && (
                <div className="success-message">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="success-icon"
                    >
                        <path d="M9 16.17L4.83 12a1 1 0 0 0-1.41 1.41l5 5a1 1 0 0 0 1.41 0l10-10a1 1 0 0 0-1.41-1.41L10 14.83l-2.59-2.59a1 1 0 0 0-1.41 1.41l4 4a1 1 0 0 0 1.41 0z"/>
                    </svg>
                    Product added successfully!
                </div>
            )}
        </div>
    );
};

export default AddProduct;
