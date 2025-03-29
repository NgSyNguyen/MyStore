import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Bell pepper',
      price: 35.1,
      originalPrice: 45.68,
      quantity: 1,
      image: '/images/products/bell-pepper.jpg',
      soldBy: 'Fresho',
      weight: '500 g',
      savings: 20.68,
    },
    {
      id: 2,
      name: 'Eggplant',
      price: 52.95,
      originalPrice: 68.49,
      quantity: 1,
      image: '/images/products/eggplant.jpg',
      soldBy: 'Nesto',
      weight: '250 g',
      savings: 15.14,
    },
    {
      id: 3,
      name: 'Onion',
      price: 67.36,
      originalPrice: 96.58,
      quantity: 1,
      image: '/images/products/onion.jpg',
      soldBy: 'Basket',
      weight: '750 g',
      savings: 29.22,
    },
  ]);

  const [couponCode, setCouponCode] = useState('');

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + change;
          if (newQuantity >= 0) {
            return { ...item, quantity: newQuantity };
          }
        }
        return item;
      }),
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 ? 0 : 6.9;
  const total = subtotal + shipping;

  return (
    <div className="cart">
      <div className="cart-content">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="sold-by">Sold By: {item.soldBy}</p>
                <p className="weight">Quantity - {item.weight}</p>
                <div className="price-info">
                  <div className="current-price">${item.price.toFixed(2)}</div>
                  <div className="original-price">${item.originalPrice.toFixed(2)}</div>
                  <div className="savings">You Save : ${item.savings.toFixed(2)}</div>
                </div>
              </div>
              <div className="item-actions">
                <div className="qty-section">
                  <label>Qty</label>
                  <div className="qty-controls">
                    <button onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 0}>
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, 1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <div className="total-section">
                  <label>Total</label>
                  <div className="total-price">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div className="action-buttons">
                  <button className="save-btn">Save for later</button>
                  <button className="remove-btn" onClick={() => handleRemoveItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Cart Total</h2>
          <div className="coupon-section">
            <div className="coupon-header">Coupon Apply</div>
            <div className="coupon-input">
              <input
                type="text"
                placeholder="Enter Coupon Code Here..."
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
              <button className="apply-btn">Apply</button>
            </div>
          </div>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="summary-row total">
              <span>Total (USD)</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button className="checkout-btn">Process To Checkout</button>
          <Link to="/products" className="continue-shopping">
            <FontAwesomeIcon icon={faArrowLeft} className="btn-icon" />
            Return To Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
