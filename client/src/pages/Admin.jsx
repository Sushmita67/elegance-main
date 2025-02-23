import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  document.title = "Admin Dashboard";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-very-dark-blue">Admin Dashboard</h1>
      <p className="mt-1 max-w-2xl text-sm text-dark-grayish-blue">
        Manage your application from here.
      </p>
      <hr className="border-b border-grayish-blue mt-3 mb-8" />

      <div className="flex flex-col space-y-4">
        <Link
          to="/admin/add-product"
          className="p-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
        >
          Add Product
              </Link>
              <Link
          to="/admin/products"
          className="p-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          View Products
        </Link>
        <Link
          to="/admin/orders"
          className="p-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
        >
          View Orders
        </Link>
        <Link
          to="/admin/users"
          className="p-4 bg-yellow-500 text-white rounded-md shadow-md hover:bg-yellow-600 transition"
        >
          View Users
              </Link>
              
        <Link
          to="/admin/settings"
          className="p-4 bg-gray-500 text-white rounded-md shadow-md hover:bg-gray-600 transition"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
