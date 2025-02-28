
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    id: null, // Added default value to prevent errors
    company: '',
    title: '',
    desc: '',
    img: null,
    alt: '',
    categories: [{ category: [], gender: [] }],
    size: [],
    price: '',
    discountPrice: ''
  });

  const [errors, setErrors] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      img: e.target.files[0]
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

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', product.company);
    formData.append('title', product.title);
    formData.append('desc', product.desc);
    formData.append('picture', product.img);
    formData.append('alt', product.alt);
    formData.append('size', JSON.stringify(product.size));
    formData.append('price', product.price);
    formData.append('discountPrice', product.discountPrice);
    formData.append('categories', JSON.stringify(product.categories));
    formData.append('slug', generateSlug(product.title));

    try {
      await axios.post('/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product added successfully');
      setProduct({
        id: null,
        company: '',
        title: '',
        desc: '',
        img: null,
        alt: '',
        categories: [{ category: [], gender: [] }],
        size: [],
        price: '',
        discountPrice: ''
      });
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error adding product');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
  <h1 className="text-3xl font-bold text-gray-900 mb-8">Add New Product</h1>
  <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
    {errors && (
      <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded-lg">
        {errors.map((error, index) => (
          <p key={index}>{error.msg}</p>
        ))}
      </div>
    )}

    {/* Company & Title */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block font-medium text-gray-800">Company</label>
        <input type="text" name="company" value={product.company} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
      </div>
      <div>
        <label className="block font-medium text-gray-800">Title</label>
        <input type="text" name="title" value={product.title} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
      </div>
    </div>

    {/* Description */}
    <div>
      <label className="block font-medium text-gray-800">Description</label>
      <textarea name="desc" value={product.desc} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
    </div>

    {/* Image Upload */}
    <div>
      <label className="block font-medium text-gray-800">Upload Image</label>
      <input type="file" name="picture" onChange={handleFileChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" accept="image/*" required />
    </div>

    {/* Alternative Text & Size */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block font-medium text-gray-800">Alternative Text</label>
        <input type="text" name="alt" value={product.alt} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
      </div>
      <div>
        <label className="block font-medium text-gray-800">Size</label>
        <input type="text" name="size" value={product.size} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" />
      </div>
    </div>

    {/* Categories & Gender */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block font-medium text-gray-800">Categories</label>
        <select name="type" multiple onChange={handleSelectChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full">
          <option value="earrings">Earrings</option>
          <option value="necklace">Necklace</option>
          <option value="bracelets">Bracelets</option>
          <option value="rings">Rings</option>
          <option value="diamond_set">Diamond Set</option>
          <option value="gold_chain">Gold Chain</option>
          <option value="pendants">Pendants</option>
          <option value="bangles">Bangles</option>
          <option value="anklets">Anklets</option>
        </select>
      </div>
      <div>
        <label className="block font-medium text-gray-800">Gender/Type</label>
        <select name="gender" multiple onChange={handleSelectChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full">
          <option value="men">Men</option>
          <option value="women">Women</option>
        </select>
      </div>
    </div>

    {/* Price & Discount Price */}
    <div className="grid grid-cols-2 gap-6">
      <div>
        <label className="block font-medium text-gray-800">Price</label>
        <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
      </div>
      <div>
        <label className="block font-medium text-gray-800">Discount Price</label>
        <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} className="mt-2 py-3 px-4 border border-gray-300 rounded-lg w-full" required />
      </div>
    </div>

    {/* Submit Button */}
    <button type="submit" className="w-full bg-black text-white p-4 rounded-xl mt-6 hover:bg-gray-800 transition-all duration-300">
      Add Product
    </button>
  </form>
</div>

  );
};

export default AddProduct;
