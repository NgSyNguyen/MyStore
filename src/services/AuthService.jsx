import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from '@redux/authSlice.jsx';

const API_URL = import.meta.env.VITE_API_URL || 'https://jinstore-api.onrender.com';
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const login = async (user, dispatch, navigate, accounts) => {
  dispatch(loginStart());
  try {
    // Tìm tài khoản trong danh sách tài khoản được truyền vào
    const foundUser = accounts.find(
      (account) =>
        (account.username === user.usernameOrEmail || account.email === user.usernameOrEmail) &&
        account.password === user.password,
    );

    if (!foundUser) {
      throw new Error('Invalid username/email or password');
    }

    // Đăng nhập thành công
    dispatch(loginSuccess(foundUser));
  } catch (err) {
    dispatch(loginFailed(err.message || 'Đăng nhập thất bại'));
    throw new Error(err.message || 'Đăng nhập thất bại');
  }
};

export const logOut = async (dispatch, navigate) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
    navigate('/login');
    // eslint-disable-next-line no-unused-vars
  } catch (err) {
    dispatch(logoutFailed());
    throw new Error('Đăng xuất thất bại');
  }
};

export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    // Giả lập đăng ký
    console.log('Registered user:', user);
    dispatch(registerSuccess());
    navigate('/login');
  } catch (err) {
    dispatch(registerFailed(err.message || 'Đăng ký thất bại'));
    throw new Error(err.message || 'Đăng ký thất bại');
  }
};
export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || 'Không thể tải danh mục');
  }
};

export const getProducts = async (params = {}) => {
  try {
    const response = await axiosInstance.get('/products', { params });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || 'Không thể tải sản phẩm');
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await axiosInstance.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.response?.data.message || 'Không thể thêm sản phẩm');
  }
};

export const deleteProduct = async (id) => {
  try {
    await axiosInstance.delete(`/products/${id}`);
  } catch (err) {
    throw new Error(err.response?.data.message || 'Không thể xóa sản phẩm');
  }
};
