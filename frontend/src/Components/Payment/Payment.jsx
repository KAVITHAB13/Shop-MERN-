import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import qrCode from '../Assests/qr_code.png'; // Import the QR code image
import './Payment.css';

const Payment = () => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const navigate = useNavigate();
  const { getTotalCartAmount } = useContext(ShopContext);
  
  const total = getTotalCartAmount();
  const codFee = 49;
  const finalAmount = selectedMethod === 'cod' ? total + codFee : total;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      const message =
        selectedMethod === 'cod'
          ? 'Order placed successfully!'
          : 'Payment successful! Order placed.';
      
      setSuccessMessage(message); // Set the success message

      if (selectedMethod !== 'cod') {
        // For card and UPI payments, redirect to home after showing message
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    }, 2000);
  };

  return (
    <div className="payment-container">
      {successMessage && ( // Conditional rendering for success message
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <span>{successMessage}</span>
        </div>
      )}

      <div className="payment-methods">
        <h2>Select Payment Method</h2>
        
        <div className="payment-tabs">
          <button 
            className={`payment-tab ${selectedMethod === 'card' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('card')}
          >
            <i className="fas fa-credit-card"></i>
            Card Payment
          </button>
          
          <button 
            className={`payment-tab ${selectedMethod === 'upi' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('upi')}
          >
            <i className="fas fa-mobile-alt"></i>
            UPI / GPay
          </button>
          
          <button 
            className={`payment-tab ${selectedMethod === 'cod' ? 'active' : ''}`}
            onClick={() => setSelectedMethod('cod')}
          >
            <i className="fas fa-truck"></i>
            Cash on Delivery
          </button>
        </div>

        <div className="payment-content">
          {selectedMethod === 'card' && (
            <form onSubmit={handlePayment} className="payment-form">
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  pattern="[0-9]{16}"
                  required
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    pattern="[0-9]{3,4}"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  placeholder="Name on card"
                  required
                />
              </div>

              <button 
                type="submit" 
                className="pay-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${total}`}
              </button>
            </form>
          )}

          {selectedMethod === 'upi' && (
            <div className="upi-section">
              <div className="qr-code">
                <img src={qrCode} alt="QR Code" /> {/* Use the imported QR code image */}
              </div>
              <p>Scan QR code using any UPI app to pay</p>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Enter UPI ID (e.g., name@upi)"
                />
              </div>
              <button 
                onClick={handlePayment}
                className="pay-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Pay ₹${total} with UPI`}
              </button>
            </div>
          )}

          {selectedMethod === 'cod' && (
            <div className="cod-section">
              <div className="cod-info">
                <i className="fas fa-info-circle"></i>
                <p>Pay with cash when your order is delivered.</p>
                <p>Additional fee of ₹{codFee} applies for Cash on Delivery.</p>
              </div>
              <div className="cod-breakdown">
                <div className="breakdown-item">
                  <span>Order Total:</span>
                  <span>₹{total}</span>
                </div>
                <div className="breakdown-item">
                  <span>COD Fee:</span>
                  <span>₹{codFee}</span>
                </div>
                <div className="breakdown-item total">
                  <span>Final Amount:</span>
                  <span>₹{finalAmount}</span>
                </div>
              </div>
              <button 
                onClick={handlePayment}
                className="pay-button"
                disabled={loading}
              >
                {loading ? 'Processing...' : `Place Order (₹${finalAmount})`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
