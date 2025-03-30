import { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@components/ui/Button.jsx';
import { logOut } from '@services/AuthService.jsx';
import { useDispatch, useSelector } from 'react-redux';

import logoFull from '@assets/images/logo/logo-full.svg';
import iconLocation from '@assets/icons/iconlocation.svg';
import iconSearch from '@assets/icons/iconsearch.svg';
import iconCart from '@assets/icons/iconcart.svg';
import iconHeart from '@assets/icons/iconheart.svg';
import iconUser from '@assets/icons/iconuser.svg';

const Header = () => {
  const user = useSelector((state) => state.auth.login.currentUser);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const wishlistCount = useSelector((state) => state.wishlist?.items?.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logOut(dispatch, navigate);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header__account')) setIsOpen(false);
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <Fragment>
      <header className="header">
        <section className="header__main">
          <div className="header__main-content">
            <div className="header__logo">
              <Link to="/">
                <img src={logoFull} alt="JinStore Logo" />
              </Link>
            </div>
            <div className="header__location">
              <img src={iconLocation} alt="Location" />
              <span className="header__location-text">
                Deliver to
                <br />
                <strong>all</strong>
              </span>
            </div>
            <div className="header__search">
              <input
                type="text"
                placeholder="Search for products, categories or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} className="header__search-button">
                <img src={iconSearch} alt="Search" />
              </Button>
            </div>
            <div className="header__icons">
              <div className="header__account">
                <Button onClick={() => setIsOpen(!isOpen)} className="header__account-btn">
                  <img src={iconUser} alt="User" />
                  <strong>{user ? user.fullname?.trim() || user.username : 'Account'}</strong>
                </Button>
                {isOpen && (
                  <div className="dropdown-menu">
                    {user ? (
                      <>
                        <Link to="/account" onClick={() => setIsOpen(false)}>
                          Account
                        </Link>
                        <Link to="/login" onClick={handleLogout}>
                          Logout
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Link>
                        <Link to="/register" onClick={() => setIsOpen(false)}>
                          Create an Account
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
              <div className="header__wishlist">
                <Link to="/wishlist">
                  <img src={iconHeart} alt="Wishlist" />
                  <span className="header__count">{wishlistCount}</span>
                </Link>
              </div>
              <div className="header__cart">
                <Link to="/cart">
                  <img src={iconCart} alt="Cart" />
                  <span className="header__count">{cartCount}</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <nav className="header__nav">
          <div className="header__nav-content">
            <ul className="header__menu">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/categories/fruits-vegetables">Fruits & Vegetables</Link>
              </li>
              <li>
                <Link to="/categories/beverages">Beverages</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li className="nav-item">
                <Link to="/product">Sản phẩm</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </Fragment>
  );
};

export default Header;
