import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
      setMessage('Product deleted successfully!');

      setTimeout(() => {
        setMessage('');
      }, 3000);
      
    } catch (err) {
      console.error('Error deleting product', err);
      setMessage('Failed to delete product.');
    }
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-[1000px] bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Product List</h1>

        {/* Success Message */}
        {message && (
          <div className="mb-4 p-3 text-white bg-green-500 rounded-md">
            {message}
          </div>
        )}

        {/* Add Product Button */}
        <div className="mb-4 flex justify-end">
          <Link 
            to="/admin/add-product" 
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
          >
            Add New Product
          </Link>
        </div>

        {/* Scrollable Table with Fixed Header */}
        <div className="max-h-[450px] overflow-y-auto border rounded-lg shadow">
          <table className="min-w-full bg-white">
            {/* Fixed Header */}
            <thead className="sticky top-0 bg-gray-200 text-gray-700 shadow">
              <tr>
                <th className="px-6 py-3 text-left font-medium">Photo</th>
                <th className="px-6 py-3 text-left font-medium">Title</th>
                <th className="px-6 py-3 text-left font-medium">Price</th>
                <th className="px-6 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="flex-1 px-4 py-2 text-sm font-medium text-gray-900">
                    <img
                        src={`http://localhost:5000${product.img}`}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="px-6 py-4 text-gray-800">{product.title}</td>
                  <td className="px-6 py-4 text-gray-800">${product.price}</td>
                  <td className="px-6 py-4 flex items-center space-x-6">
                    <Link to={`/admin/edit-product/${product._id}`} className="text-blue-500 hover:text-blue-700 font-medium">
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDelete(product._id)} 
                      className="text-red-500 hover:text-red-700 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ProductList;
