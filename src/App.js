import ProductList from './pages/user/ProductList';
import ProductDetails from './pages/user/ProductDetails';
import Blog from './pages/user/Blog';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  );
}

export default App;
