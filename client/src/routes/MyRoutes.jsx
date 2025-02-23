import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About";
import Collections from "../pages/Collections";
import Contact from "../pages/Contact";
import Men from "../pages/Men";
import Women from "../pages/Women";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import Layout from "../components/layout/Layout";
import Products from "../pages/Products";
import ProductPage from "../pages/ProductPage";
import NotFound from "../pages/NotFound";
import Checkout from "../pages/Checkout";
import { useSelector } from "react-redux";
import UserProfile from "../pages/User/UserProfile";
import Settings from "../pages/User/Profile/Settings";
import MyAccount from "../pages/User/Profile/MyAccount";
import MyOrders from "../pages/User/Profile/MyOrders";
import MyAddress from "../pages/User/Profile/MyAddress";
import Notifications from "../pages/User/Profile/Notifications";
import Password from "../pages/User/Profile/Password";
import PaymentSuccessful from "../components/PaymentSuccessful";
import AddProduct from "../components/AddProductPage";
import OrdersPage from "../components/OrdersPage";
import AdminPage from "../pages/Admin";
import ProductList from "../components/ProductListPage";
import AdminLayout from "../components/AdminLayout";
import UsersPage from "../pages/UsersPage";
import EditProduct from "../components/EditProductPage";
import KhaltiPayment from "../pages/Khalti";

const MyRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Layout>
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/collections/:collection" element={<Collections />} />
        <Route path="/products/" element={<Products />} />
        <Route path="/products/men" element={<Men />} />
        <Route path="/products/women" element={<Women />} />
        <Route path="/products/:id" element={<ProductPage />} />
        
        

        
        {/* <Route path="/admin/users" element={<UsersPage />} /> */}
        
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={userInfo ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/register" element={userInfo ? <Navigate to="/" replace /> : <Register />} />
        
        <Route path="/user-profile" element={<UserProfile />}>
          <Route index element={<MyAccount />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="addresses" element={<MyAddress />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="password" element={<Password />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="/checkout" element={<Checkout />} />
                <Route path="/khalti" element={<KhaltiPayment />} />


        <Route path="/payment" element={<PaymentSuccessful />} />
        {/* Admin Routes with AdminLayout */}
      <Route path="/admin" element={<AdminLayout/>}>
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
