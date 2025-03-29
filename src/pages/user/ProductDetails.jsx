import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faHeart,
  faShareNodes,
  faCodeCompare,
  faShieldHalved,
  faCreditCard,
  faPlus,
  faMinus,
  faHome,
  faChevronRight,
  faCheck,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 0,
  });
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Sample product data
  const product = {
    name: 'Organic Mountain Honey',
    rating: 4.8,
    reviews: 245,
    sku: 'SKU-0025',
    description:
      '100% pure mountain honey harvested from the pristine heights of the Alps. Rich in natural enzymes and antioxidants.',
    currentPrice: 29.99,
    originalPrice: 39.99,
    discount: 25,
    isOrganic: true,
    stock: 15,
    images: ['/images/honey-1.jpg', '/images/honey-2.jpg', '/images/honey-3.jpg', '/images/honey-4.jpg'],
    category: 'Honey & Sweeteners',
    longDescription: `Quisque varius diam vel metus mattis, id aliquam diam rhoncus. Proin vitae magna in dui finibus malesuada et at nulla. Morbi elit ex, viverra vitae ante vel, blandit feugiat ligula. Fusce fermentum iaculis nibh, at sodales leo maximus a. Nullam ultricies sodales nunc, in pellentesque lorem mattis quis. Cras imperdiet est in nunc tristique lacinia. Nullam aliquam mauris eu accumsan tincidunt. Suspendisse velit eu, aliquet vel ornare vel, dignissim a tortor.`,
  };

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleQuantityChange = (type) => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // TODO: Implement add to cart functionality
    console.log('Adding to cart:', { product, quantity });
  };

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log('Buying now:', { product, quantity });
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <div className="product-details">
      {/* Breadcrumb Navigation */}
      <div className="user__breadcrumb">
        <Link to="/">
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
        <Link to="/product">Products</Link>
        <FontAwesomeIcon icon={faChevronRight} className="breadcrumb-separator" />
        <span>{product.name}</span>
      </div>

      <div className="product-details__container">
        <div className="product-details__images">
          <div className="product-details__badges">
            {product.discount > 0 && (
              <span className="product-details__badge product-details__badge--sale">-{product.discount}% OFF</span>
            )}
            {product.isOrganic && (
              <span className="product-details__badge product-details__badge--organic">ORGANIC</span>
            )}
          </div>
          <div className="product-details__main-image">
            <img src={product.images[selectedImage]} alt={product.name} />
          </div>
          <div className="product-details__thumbnails">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`product-details__thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} thumbnail ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-details__info">
          <h1 className="product-details__title">{product.name}</h1>

          <div className="product-details__rating">
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  key={index}
                  icon={faStar}
                  className={index < Math.floor(product.rating) ? 'filled' : ''}
                />
              ))}
              <span>{product.rating}</span>
            </div>
            <span className="divider">|</span>
            <span>{product.reviews} Reviews</span>
            <span className="divider">|</span>
            <span>SKU: {product.sku}</span>
          </div>

          <p className="product-details__description">{product.description}</p>

          <div className="product-details__price">
            <span className="current-price">${product.currentPrice}</span>
            {product.originalPrice > product.currentPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>

          <div className="product-details__special-offer">
            <h3>Special Offer Ends In:</h3>
            <div className="timer">
              <div className="timer-block">
                <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                <label>Hours</label>
              </div>
              <div className="timer-block">
                <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                <label>Minutes</label>
              </div>
              <div className="timer-block">
                <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                <label>Seconds</label>
              </div>
              <div className="timer-block">
                <label>* Limited time offer. While stocks last.</label>
              </div>
            </div>
          </div>

          <div className="product-details__actions">
            <div className="quantity-selector">
              <button onClick={() => handleQuantityChange('decrease')} disabled={quantity === 1}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input type="number" value={quantity} readOnly />
              <button onClick={() => handleQuantityChange('increase')} disabled={quantity === product.stock}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <button className="add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>

          <div className="product-details__additional-actions">
            <button onClick={toggleFavorite}>
              <FontAwesomeIcon icon={faHeart} style={{ color: isFavorite ? '#e74c3c' : 'currentColor' }} />
              Add to Wishlist
            </button>
            <button>
              <FontAwesomeIcon icon={faShareNodes} />
              Share
            </button>
            <button>
              <FontAwesomeIcon icon={faCodeCompare} />
              Compare
            </button>
          </div>

          <div className="product-details__info-blocks">
            <div className="info-block">
              <FontAwesomeIcon icon={faShieldHalved} />
              <div className="content">
                <h4>Warranty</h4>
                <p>1 Year Manufacturer Warranty</p>
              </div>
            </div>
            <div className="info-block">
              <FontAwesomeIcon icon={faCreditCard} />
              <div className="content">
                <h4>Secure Payment</h4>
                <p>100% Secure Payment with SSL Encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description Tabs */}
      <div className="product-details__tabs">
        <div className="product-details__tab-headers">
          <button
            className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({product.reviews})
          </button>
        </div>

        <div className="product-details__tab-content">
          {activeTab === 'description' && (
            <div className="tab-pane">
              <p>{product.longDescription}</p>
              <p>
                Morbi ut sapien vitae odio accumsan gravida. Morbi vitae erat aucto, eliefend nunc a, lobortis neque.
                Praesent aliquam dignissim viverra. Maecenas luctus odio, faugiat eu nunc sit amet, maximus sagittis
                dolor. Vivamus nisi sapien, elementum sit amet eros sit amet, ultricies cursus ipsum. Sed consequat
                luctus ligula. Curabitur laoreet moncus blandit. Aenean vel diam ut arcu pharetra dignissim ut sed leo.
                Vivamus faucibus, ipsum in vestibulum vulputate, lorem orci convallis quam, sit amet consequat nulla
                felis pharetra lacus. Duis semper erat mauris, sed egestas purus commodo vel.
              </p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane">
              <p>Customer reviews will be displayed here.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products section */}
      <div className="related-products">
        <h3 className="related-products__title">Related products</h3>
        <div className="related-products__grid">
          {/* Sample related products */}
          <div className="user__product-card">
            <div className="user__product-card-inner">
              <div className="user__product-badge">-15% OFF</div>
              <button className="user__product-favorite">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <div className="user__product-image-container">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff"
                  alt="Large Garden Spinach & Herb Wrap Tortillas"
                  className="user__product-image"
                />
              </div>
              <div className="user__product-info">
                <div className="user__product-category">Vegetables</div>
                <h3 className="user__product-name">Large Garden Spinach & Herb Wrap Tortillas</h3>
                <div className="user__product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">4.0 (128 reviews)</span>
                </div>
                <div className="user__product-price">
                  <span className="current-price">$27.90</span>
                  <span className="original-price">$32.99</span>
                </div>
                <div className="user__product-footer">
                  <div className="user__product-stock">
                    <FontAwesomeIcon icon={faCheck} />
                    IN STOCK
                  </div>
                  <button className="user__add-to-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="user__product-card">
            <div className="user__product-card-inner">
              <div className="user__product-badge">-34% OFF</div>
              <button className="user__product-favorite">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <div className="user__product-image-container">
                <img
                  src="https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9"
                  alt="Peach"
                  className="user__product-image"
                />
              </div>
              <div className="user__product-info">
                <div className="user__product-category">Fruits</div>
                <h3 className="user__product-name">Peach - each</h3>
                <div className="user__product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">4.0 (3 reviews)</span>
                </div>
                <div className="user__product-price">
                  <span className="current-price">$0.75</span>
                  <span className="original-price">$1.75</span>
                </div>
                <div className="user__product-footer">
                  <div className="user__product-stock">
                    <FontAwesomeIcon icon={faCheck} />
                    IN STOCK
                  </div>
                  <button className="user__add-to-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="user__product-card">
            <div className="user__product-card-inner">
              <div className="user__product-badge">-75% OFF</div>
              <button className="user__product-favorite">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <div className="user__product-image-container">
                <img
                  src="https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31"
                  alt="Yellow Potatoes"
                  className="user__product-image"
                />
              </div>
              <div className="user__product-info">
                <div className="user__product-category">Vegetables</div>
                <h3 className="user__product-name">Yellow Potatoes Whole Fresh, 5lb Bag</h3>
                <div className="user__product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">4.0 (1 review)</span>
                </div>
                <div className="user__product-price">
                  <span className="current-price">$0.50</span>
                  <span className="original-price">$1.99</span>
                </div>
                <div className="user__product-footer">
                  <div className="user__product-stock">
                    <FontAwesomeIcon icon={faCheck} />
                    IN STOCK
                  </div>
                  <button className="user__add-to-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="user__product-card">
            <div className="user__product-card-inner">
              <div className="user__product-badge">-14% OFF</div>
              <button className="user__product-favorite">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <div className="user__product-image-container">
                <img
                  src="https://images.unsplash.com/photo-1584615467033-75627d04bc5d"
                  alt="Fresh Cauliflower"
                  className="user__product-image"
                />
              </div>
              <div className="user__product-info">
                <div className="user__product-category">Vegetables</div>
                <h3 className="user__product-name">Fresh Cauliflower, Each</h3>
                <div className="user__product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">4.0 (2 reviews)</span>
                </div>
                <div className="user__product-price">
                  <span className="current-price">$12.79</span>
                  <span className="original-price">$14.79</span>
                </div>
                <div className="user__product-footer">
                  <div className="user__product-stock">
                    <FontAwesomeIcon icon={faCheck} />
                    IN STOCK
                  </div>
                  <button className="user__add-to-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="user__product-card">
            <div className="user__product-card-inner">
              <div className="user__product-badge">-34% OFF</div>
              <button className="user__product-favorite">
                <FontAwesomeIcon icon={faHeart} />
              </button>
              <div className="user__product-image-container">
                <img
                  src="https://images.unsplash.com/photo-1594282486552-05a4providedLink"
                  alt="Fresh Broccoli Crowns"
                  className="user__product-image"
                />
              </div>
              <div className="user__product-info">
                <div className="user__product-category">Vegetables</div>
                <h3 className="user__product-name">Fresh Broccoli Crowns, Each</h3>
                <div className="user__product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon key={i} icon={faStar} className={i < 4 ? 'filled' : ''} />
                    ))}
                  </div>
                  <span className="rating-text">4.0 (1 review)</span>
                </div>
                <div className="user__product-price">
                  <span className="current-price">$11.54</span>
                  <span className="original-price">$17.88</span>
                </div>
                <div className="user__product-footer">
                  <div className="user__product-stock">
                    <FontAwesomeIcon icon={faCheck} />
                    IN STOCK
                  </div>
                  <button className="user__add-to-cart">
                    <FontAwesomeIcon icon={faCartPlus} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
