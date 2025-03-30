import Home from '@pages/user/Home';
import Contact from '@pages/user/Contact';
import Login from '@pages/user/Login';
import Register from '@pages/user/Register';
import NotFound from '@pages/user/NotFound';
import Shop from '@pages/user/Shop';
import Cart from '@pages/user/Cart';
import Wishlist from '@pages/user/Wishlist';
import AdminLayout from '@pages/admin/AdminLayout';
import Dashboard from '@pages/admin/Dashboard';
import Products from '@pages/admin/Products';
import AddProduct from '@pages/admin/AddProduct';
import EditProduct from '@pages/admin/EditProduct';
import Orders from '@pages/admin/Orders';
import OrdersDetail from '@pages/admin/OrdersDetail';
import Users from '@pages/admin/Users';
import Categories from '@pages/admin/Categories';
import ProductReviews from '@pages/admin/ProductReviews';
import ProductList from '@/pages/user/ProductList';
import AddCategory from '@/pages/admin/AddCategory';
import ProductDetails from '@/pages/user/ProductDetails';
import Blog from '@/pages/user/Blog';

const routes = [
  { path: '/', page: Home },
  { path: '/login', page: Login },
  { path: '/register', page: Register },
  { path: '/contact', page: Contact },
  { path: '/login', page: Login, isPublic: true },
  { path: '/register', page: Register, isPublic: true },
  { path: '/shop', page: Shop },
  { path: '/cart', page: Cart },
  { path: '/wishlist', page: Wishlist },
  { path: '/product', page: ProductList },
  { path: '/product/:id', page: ProductDetails },
  { path: '/blog', page: Blog },
  { path: '/blog/:id', page: Blog },
  {
    path: '/admin',
    page: AdminLayout,
    isProtected: true,
    role: 'Admin',
    children: [
      { path: '', page: Dashboard },
      { path: 'products', page: Products },
      { path: 'products/add', page: AddProduct },
      { path: 'products/edit/:id', page: EditProduct },
      { path: 'product-reviews', page: ProductReviews },

      { path: 'orders', page: Orders },
      { path: 'orders/:id', page: OrdersDetail },

      { path: 'categories', page: Categories },
      { path: 'categories/add', page: AddCategory },

      { path: 'users', page: Users },
    ],
  },
  { path: '*', page: NotFound },
];

export default routes;
// import Home from '@pages/user/Home';
// import Contact from '@pages/user/Contact';
// import Login from '@pages/user/Login';
// import Register from '@pages/user/Register';
// import NotFound from '@pages/user/NotFound';
// import Shop from '@pages/user/Shop';
// import Cart from '@pages/user/Cart';
// import Wishlist from '@pages/user/Wishlist';
// import AdminLayout from '@pages/admin/AdminLayout';
// import Dashboard from '@pages/admin/Dashboard';
// import Products from '@pages/admin/Products';
// import Orders from '@pages/admin/Orders';
// import Users from '@pages/admin/Users';

// const routes = [
//   { path: '/', page: Home }, // Sử dụng '/' thay vì '' để rõ ràng
//   { path: '/contact', page: Contact },
//   { path: '/login', page: Login, isPublic: true },
//   { path: '/register', page: Register, isPublic: true },
//   { path: '/shop', page: Shop },
//   { path: '/cart', page: Cart },
//   { path: '/wishlist', page: Wishlist },
//   {
//     path: '/admin',
//     page: AdminLayout,
//     children: [
//       { path: '', page: Dashboard },
//       { path: 'products', page: Products },
//       { path: 'orders', page: Orders },
//       { path: 'users', page: Users },
//     ],
//   },
//   { path: '*', page: NotFound }, // Sử dụng '*' thay vì '/*' để bắt tất cả route không khớp
// ];

// export default routes;
