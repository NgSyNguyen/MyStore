import { Fragment, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import FormLogin from '@components/ui/FormLogin.jsx';
import SocialAccount from '@components/ui/SocialAccount.jsx';

// Dữ liệu tài khoản tĩnh
const staticAccounts = [
  {
    id: 1,
    username: 'admin1',
    email: 'admin1@example.com',
    password: 'admin123',
    fullname: 'Admin One',
    role: 'Admin',
  },
  {
    id: 2,
    username: 'admin2',
    email: 'admin2@example.com',
    password: 'admin456',
    fullname: 'Admin Two',
    role: 'Admin',
  },
  {
    id: 3,
    username: 'user1',
    email: 'user1@example.com',
    password: 'user123',
    fullname: 'User One',
    role: 'User',
  },
  {
    id: 4,
    username: 'user2',
    email: 'user2@example.com',
    password: 'user456',
    fullname: 'User Two',
    role: 'User',
  },
];

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.login.currentUser);
  const [error, setError] = useState(null);

  // Nếu đã đăng nhập, điều hướng theo vai trò
  useEffect(() => {
    if (user) {
      if (user.role === 'Admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);

  // Lấy thông báo từ state (nếu có)
  const message = location.state?.message;

  return (
    <Fragment>
      <section>
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          {message && <p className="login-message">{message}</p>}
          {error && <p className="login-error">{error}</p>}
          <p className="login-subtext">If you have an account, sign in with your username or email address.</p>
          <FormLogin setError={setError} accounts={staticAccounts} />
          <div className="item-other">
            <span className="line-left"></span>
            <span className="text-or">OR</span>
            <span className="line-right"></span>
          </div>
          <SocialAccount />
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;
