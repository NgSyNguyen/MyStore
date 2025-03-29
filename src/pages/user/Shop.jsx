import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '@services/AuthService';
import { addToCart } from '@redux/cartSlice';
import { addToWishlist } from '@redux/wishlistSlice';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        const search = params.get('search');
        const data = await getProducts({ category, search });
        setProducts(data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError('Không thể tải sản phẩm.');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [location.search]);

  const handleAddToCart = (product) => {
    if (!cartItems.some((item) => item.id === product.id)) {
      dispatch(addToCart(product));
    }
  };

  const handleAddToWishlist = (product) => {
    if (!wishlistItems.some((item) => item.id === product.id)) {
      dispatch(addToWishlist(product));
    }
  };

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="shop">
      <h1 className="shop__title">Shop</h1>
      <div className="shop__products">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="shop__product-card">
              <img src={product.image} alt={product.name} style={{ maxWidth: '200px' }} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>
                ${product.price.toFixed(2)} {product.discount > 0 && <span>(-{product.discount}%)</span>}
              </p>
              <button
                onClick={() => handleAddToCart(product)}
                disabled={cartItems.some((item) => item.id === product.id)}
              >
                {cartItems.some((item) => item.id === product.id) ? 'Đã thêm vào giỏ' : 'Thêm vào giỏ hàng'}
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
                disabled={wishlistItems.some((item) => item.id === product.id)}
              >
                {wishlistItems.some((item) => item.id === product.id) ? 'Đã yêu thích' : 'Thêm vào yêu thích'}
              </button>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </section>
  );
};

export default Shop;
