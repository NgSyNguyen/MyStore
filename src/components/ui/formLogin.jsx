import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '@services/AuthService'; // Import hàm login từ AuthService
import Button from '@components/ui/Button';

// eslint-disable-next-line react/prop-types
function FormLogin({ accounts, setError: setParentError }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (usernameOrEmail.length < 3) {
      setError('Username hoặc email phải dài ít nhất 3 ký tự.');
      setParentError('Username hoặc email phải dài ít nhất 3 ký tự.');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu phải dài ít nhất 6 ký tự.');
      setParentError('Mật khẩu phải dài ít nhất 6 ký tự.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setParentError(null);

    try {
      // Gọi hàm login từ AuthService
      await login({ usernameOrEmail, password }, dispatch, navigate, accounts);
    } catch (err) {
      setError(err.message);
      setParentError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="login-field">
          <label>Username or Email *</label>
          <input
            type="text"
            name="usernameOrEmail"
            placeholder="Username hoặc Email"
            value={usernameOrEmail}
            onChange={(e) => setUsernameOrEmail(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <div className="login-field">
          <label>Password *</label>
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
          />
        </div>
        <Button type="submit" className="btn login-button" disabled={isLoading}>
          {isLoading ? 'Đang đăng nhập...' : 'Login'}
        </Button>
      </form>
    </Fragment>
  );
}

export default FormLogin;
