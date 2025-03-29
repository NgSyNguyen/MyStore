import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '@redux/wishlistSlice'; // Sử dụng alias @redux

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <section className="wishlist">
      <h1>Danh sách yêu thích</h1>
      {wishlistItems.length > 0 ? (
        <div>
          {wishlistItems.map((item) => (
            <div key={item.id} className="wishlist__item">
              <img src={item.image} alt={item.name} style={{ maxWidth: '100px' }} />
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button onClick={() => dispatch(removeFromWishlist(item.id))}>Xóa</button>
            </div>
          ))}
        </div>
      ) : (
        <p>Danh sách yêu thích trống.</p>
      )}
    </section>
  );
};

export default Wishlist;
