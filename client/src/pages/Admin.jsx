import React from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  document.title = "Admin Dashboard";

  return (
    <div className="flex justify-center mt-6">
      <div className="w-[90%] md:w-[700px] h-[620px] bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage your application from here.
        </p>
        <hr className="border-b border-gray-300 my-4" />

        {/* Dashboard Links */}
        <div className="flex flex-col space-y-3">
          <Link
            to="/admin/add-product"
            className="flex items-center gap-3 p-4 bg-blue-500 text-black font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            <span className="text-lg">➕</span> Add Product
          </Link>
          <Link
            to="/admin/products"
            className="flex items-center gap-3 p-4 bg-green-500 text-black font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
          >
            <span className="text-lg">📦</span> View Products
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center gap-3 p-4 bg-purple-500 text-black font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            <span className="text-lg">📜</span> View Orders
          </Link>
          <Link
            to="/admin/users"
            className="flex items-center gap-3 p-4 bg-purple-500 text-black font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            <span className="text-lg">👥</span> View Users
          </Link>
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 p-4 bg-gray-600 text-black font-semibold rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            <span className="text-lg">⚙️</span> Settings
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
