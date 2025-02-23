import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto flex items-center justify-between p-4">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <div className="space-x-4">
            <Link to="/admin/products" className="hover:text-gray-400">Products</Link>
            <Link to="/admin/users" className="hover:text-gray-400">Users</Link>
            <Link to="/admin/orders" className="hover:text-gray-400">Orders</Link>
            <Link to="/admin/settings" className="hover:text-gray-400">Settings</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPage;
