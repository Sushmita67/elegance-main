import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    company: '',
    title: '',
    desc: '',
    img: '',
    alt: '',
    categories: [{ color: [], gender: [] }],
    size: [],
    price: '',
    discountPrice: ''
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleSelectChange = (e) => {
    const { name, options } = e.target;
    const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);

    setProduct({
      ...product,
      categories: product.categories.map(category =>
        ({ ...category, [name]: selectedOptions })
      )
    });
  };

  const handleImageUrlChange = (e) => {
    const { value } = e.target;
    setProduct({
      ...product,
      img: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`/api/products/${id}`, product, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Product updated successfully');
      navigate('/products');
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error updating product');
      }
    }
  };

  // Ensure categories is defined before accessing its properties
  const categories = product.categories && product.categories[0] ? product.categories[0] : { color: [], gender: [] };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error.msg}</p>
            ))}
          </div>
        )}
        <div>
          <label className="block text-gray-700">Company</label>
          <input
            type="text"
            name="company"
            value={product.company}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="desc"
            value={product.desc}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="img"
            onChange={handleImageUrlChange}
            value={product.img}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Alternative Text</label>
          <input
            type="text"
            name="alt"
            value={product.alt}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Categories</label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700">Colors</label>
              <select
                name="color"
                multiple
                onChange={handleSelectChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={categories.color}
              >
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Gender/Type</label>
              <select
                name="gender"
                multiple
                onChange={handleSelectChange}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={categories.gender}
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Size</label>
          <input
            type="text"
            name="size"
            value={product.size}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={product.discountPrice}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
