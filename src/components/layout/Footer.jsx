import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '@services/AuthService';

import appStore from '@assets/images/logo/button-appstore.svg';
import appGoogle from '@assets/images/logo/button-google.svg';
import iconEmail from '@assets/icons/iconemail.svg';
import iconTelephone from '@assets/icons/icontelephone.svg';
import iconFacebook from '@assets/icons/iconfacebook.svg';
import iconInstagram from '@assets/icons/iconinstagram.svg';
import iconLinkedIn from '@assets/icons/iconLinkedIn.svg';
import iconX from '@assets/icons/icon-X.svg';
import moneyKlarna from '@assets/images/payment/money-klarna.svg';
import moneyPaypal from '@assets/images/payment/money-PayPal.svg';
import moneyVISA from '@assets/images/payment/money-VISA.svg';
import moneyMaster from '@assets/images/payment/money-Master.svg';
import moneySkrill from '@assets/images/payment/money-Skrill.svg';

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Không thể tải danh mục.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <div className="footer__contact">
            <h4 className="footer__contact-title">Do You Need Help?</h4>
            <p className="footer__contact-subtext">
              We are a friendly bar serving a variety of cocktails, wines and beers.
            </p>
            <div className="footer__contact-phone">
              <img src={iconTelephone} alt="Telephone" />
              <p className="footer__contact-details">
                <h5>Monday-Friday: 08am-9pm</h5>
                <h1>0 800 300-353</h1>
              </p>
            </div>
            <div className="footer__contact-email">
              <img src={iconEmail} alt="Email" />
              <p className="footer__contact-details">
                <h5>Need help with your order?</h5>
                <a href="mailto:info@example.com">info@example.com</a>
              </p>
            </div>
          </div>

          <div className="footer__categories">
            <h4>Categories</h4>
            {loading ? (
              <p>Đang tải...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <ul>
                {categories.slice(0, 6).map((item) => (
                  <li key={item.id}>
                    <Link to={`/shop?category=${item.name}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="footer__useful-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer__help-center">
            <h4>Help Center</h4>
            <ul>
              <li>
                <Link to="/orders">Your Order</Link>
              </li>
              <li>
                <Link to="/account">Your Account</Link>
              </li>
              <li>
                <Link to="/track">Track Order</Link>
              </li>
              <li>
                <Link to="/wishlist">Your Wishlist</Link>
              </li>
              <li>
                <Link to="/search">Search</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          <div className="footer__app-links">
            <h4>Download our app</h4>
            <div className="download-app">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="btn google-play"
              >
                <img src={appGoogle} alt="Google Play" />
                <p>
                  Download App Get <br /> -10% Discount
                </p>
              </a>
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn app-store"
              >
                <img src={appStore} alt="App Store" />
                <p>
                  Download App Get <br /> -20% Discount
                </p>
              </a>
            </div>
            <div className="social-media">
              <h4>Follow us on social media:</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <img src={iconFacebook} alt="Facebook" />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <img src={iconInstagram} alt="Instagram" />
                </a>
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                  <img src={iconLinkedIn} alt="LinkedIn" />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <img src={iconX} alt="X" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <p>
            Copyright 2024 © Jinstore WooCommerce WordPress Theme. All rights reserved. Powered by
            <strong> BlackRise Themes</strong>.
          </p>
          <div className="content__right-pay">
            <img src={moneyKlarna} alt="Klarna" width="50" />
            <img src={moneyPaypal} alt="PayPal" width="50" />
            <img src={moneyVISA} alt="VISA" width="50" />
            <img src={moneyMaster} alt="MasterCard" width="50" />
            <img src={moneySkrill} alt="Skrill" width="50" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
