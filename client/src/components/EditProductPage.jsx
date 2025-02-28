import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    id: null,
    company: '',
    title: '',
    desc: '',
    img: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('company', product.company);
    formData.append('title', product.title);
    formData.append('desc', product.desc);
    if (product.img) {
      formData.append('picture', product.img);
    }
    formData.append('alt', product.alt);
    formData.append('size', JSON.stringify(product.size));
    formData.append('price', product.price);
    formData.append('discountPrice', product.discountPrice);
    formData.append('categories', JSON.stringify(product.categories));

    try {
     const response = await axios.patch(`/api/products/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status===200){
        alert('Product updated successfully');
        navigate('/products');
      }

    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error updating product');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error.msg}</p>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Company</label>
            <input type="text" name="company" value={product.company} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
          <div>
            <label className="block text-gray-700">Title</label>
            <input type="text" name="title" value={product.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea name="desc" value={product.desc} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" name="picture" onChange={handleFileChange} className="mt-1 p-2 border border-gray-300 rounded w-full" accept="image/*" />
        </div>
        <div>
          <label className="block text-gray-700">Alternative Text</label>
          <input type="text" name="alt" value={product.alt} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Categories</label>
            <select name="type" multiple onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
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
            <label className="block text-gray-700">Gender/Type</label>
            <select name="gender" multiple onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
              <option value="men">Men</option>
              <option value="women">Women</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Size</label>
          <input type="text" name="size" value={product.size} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
          <div>
            <label className="block text-gray-700">Discount Price</label>
            <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
          </div>
        </div>
        <button type="submit" className="w-full bg-black text-white p-3 rounded-lg mt-4 hover:bg-gray-800">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;