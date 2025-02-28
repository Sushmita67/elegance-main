import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../redux/reducers/authSlice'; // Adjust the import based on your file structure
import Home from '../pages/Home/Home';
import About from '../pages/About';
import Collections from '../pages/Collections';
import Contact from '../pages/Contact';
import Men from '../pages/Men';
import Women from '../pages/Women';
import Login from '../pages/User/Login';
import Register from '../pages/User/Register';
import Layout from '../components/layout/Layout';
import Products from '../pages/Products';
import ProductPage from '../pages/ProductPage';
import NotFound from '../pages/NotFound';
import Checkout from '../pages/Checkout';
import UserProfile from '../pages/User/UserProfile';
import Settings from '../pages/User/Profile/Settings';
import MyAccount from '../pages/User/Profile/MyAccount';
import MyOrders from '../pages/User/Profile/MyOrders';
import MyAddress from '../pages/User/Profile/MyAddress';
import Notifications from '../pages/User/Profile/Notifications';
import Password from '../pages/User/Profile/Password';
import PaymentSuccessful from '../components/PaymentSuccessful';
import AddProduct from '../components/AddProductPage';
import OrdersPage from '../components/OrdersPage';
import AdminPage from '../pages/Admin';
import ProductList from '../components/ProductListPage';
import AdminLayout from '../components/AdminLayout';
import UsersPage from '../pages/UsersPage';
import EditProduct from '../components/EditProductPage';
import KhaltiPayment from '../pages/Khalti';

const MyRoutes = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token && !userInfo) {
      // Set credentials with the token only
      dispatch(setCredentials({ token }));
    }
  }, [dispatch, userInfo]);

  return (
      <Layout>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:collection" element={<Collections />} />
          <Route path="/products/" element={<Products />} />
          <Route path="/products/men" element={<Men />} />
          <Route path="/products/women" element={<Women />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route
              path="/login"
              element={userInfo ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
              path="/register"
              element={userInfo ? <Navigate to="/" replace /> : <Register />}
          />

          {/* User Profile Routes */}
          <Route path="/user-profile" element={userInfo ? <UserProfile /> : <Navigate to="/login" replace />}>
            <Route index element={<MyAccount />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="addresses" element={<MyAddress />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="password" element={<Password />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Checkout and Payment Routes */}
          <Route path="/checkout" element={userInfo ? <Checkout /> : <Navigate to="/login" replace />} />
          <Route path="/khalti" element={userInfo ? <KhaltiPayment /> : <Navigate to="/login" replace />} />
          <Route path="/payment" element={<PaymentSuccessful />} />

          {/* Admin Routes */}
          <Route path="/admin" element={userInfo?.isAdmin ? <AdminLayout /> : <Navigate to="/" replace />}>
            <Route index element={<AdminPage />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/orders" element={<OrdersPage />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/edit-product/:id" element={<EditProduct />} />
            <Route path="/admin/users" element={<UsersPage />} />
          </Route>
        </Routes>
      </Layout>
  );
};

export default MyRoutes;