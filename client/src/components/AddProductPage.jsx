// import React, { useState } from 'react';
// import axios from 'axios';

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     id:'',
//     company: '',
//     title: '',
//     desc: '',
//     img: '',
//     alt: '',
//     categories: [{ color: [], gender: [] }],
//     size: [],
//     price: '',
//     discountPrice: ''
//   });
//   const [errors, setErrors] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({
//       ...product,
//       [name]: value
//     });
//   };

//   const handleSelectChange = (e) => {
//     const { name, options } = e.target;
//     const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);

//     setProduct({
//       ...product,
//       categories: product.categories.map(category =>
//         ({ ...category, [name]: selectedOptions })
//       )
//     });
//   };

//   const handleImageUrlChange = (e) => {
//     const { value } = e.target;
//     setProduct({
//       ...product,
//       img: value // Assuming a single URL for simplicity
//     });
//   };

//   const generateSlug = (title) => {
//     return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Generate the slug
//     const slug = generateSlug(product.title);

//     try {
//       await axios.post('/api/products', { ...product, slug }, {
//         headers: {
//           'Authorization': `Bearer ${localStorage.getItem('token')}`
//         }
//       });
//       alert('Product added successfully');
//       setProduct({
//         company: '',
//         title: '',
//         desc: '',
//         img: '',
//         alt: '',
//         categories: [{ color: [], gender: [] }],
//         size: [],
//         price: '',
//         discountPrice: ''
//       });
//     } catch (err) {
//       if (err.response && err.response.data.errors) {
//         setErrors(err.response.data.errors);
//       } else {
//         alert('Error adding product');
//       }
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {errors && (
//           <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
//             {errors.map((error, index) => (
//               <p key={index}>{error.msg}</p>
//             ))}
//           </div>
//         )}
//         <div>
//           <label className="block text-gray-700">Company</label>
//           <input
//             type="text"
//             name="company"
//             value={product.company}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={product.title}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Description</label>
//           <textarea
//             name="desc"
//             value={product.desc}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Image URL</label>
//           <input
//             type="text"
//             name="img"
//             onChange={handleImageUrlChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Alternative Text</label>
//           <input
//             type="text"
//             name="alt"
//             value={product.alt}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Categories</label>
//           <div className="flex space-x-4">
//             <div>
//               <label className="block text-gray-700">Colors</label>
//               <select
//                 name="color"
//                 multiple
//                 onChange={handleSelectChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               >
//                 <option value="red">Red</option>
//                 <option value="blue">Blue</option>
//                 <option value="green">Green</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//             <div>
//               <label className="block text-gray-700">Gender/Type</label>
//               <select
//                 name="gender"
//                 multiple
//                 onChange={handleSelectChange}
//                 className="mt-1 p-2 border border-gray-300 rounded w-full"
//               >
//                 <option value="men">Men</option>
//                 <option value="women">Women</option>
//                 {/* Add more options as needed */}
//               </select>
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block text-gray-700">Size</label>
//           <input
//             type="text"
//             name="size"
//             value={product.size}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Price</label>
//           <input
//             type="number"
//             name="price"
//             value={product.price}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-gray-700">Discount Price</label>
//           <input
//             type="number"
//             name="discountPrice"
//             value={product.discountPrice}
//             onChange={handleChange}
//             className="mt-1 p-2 border border-gray-300 rounded w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600"
//         >
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    company: '',
    title: '',
    desc: '',
    img: null, // Changed from img string to file object
    alt: '',
    categories: [{ color: [], gender: [] }],
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
      img: e.target.files[0] // Store file object
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
    formData.append('picture', product.img); // Append file as "picture"
    formData.append('alt', product.alt);
    formData.append('size', JSON.stringify(product.size));
    formData.append('price', product.price);
    formData.append('discountPrice', product.discountPrice);
    formData.append('categories', JSON.stringify(product.categories));
    formData.append('slug', generateSlug(product.title));

    console.log('Form Data Payload:', Object.fromEntries(formData.entries())); // Log payload before sending

    try {
      await axios.post('/api/products', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Product added successfully');
      setProduct({
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
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert('Error adding product');
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        {errors && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-2 rounded">
            {errors.map((error, index) => (
              <p key={index}>{error.msg}</p>
            ))}
          </div>
        )}
        <div>
          <label className="block text-gray-700">Company</label>
          <input type="text" name="company" value={product.company} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Title</label>
          <input type="text" name="title" value={product.title} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea name="desc" value={product.desc} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" name="picture" onChange={handleFileChange} className="mt-1 p-2 border border-gray-300 rounded w-full" accept="image/*" required />
        </div>
        <div>
          <label className="block text-gray-700">Alternative Text</label>
          <input type="text" name="alt" value={product.alt} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Categories</label>
          <div className="flex space-x-4">
            <div>
              <label className="block text-gray-700">Colors</label>
              <select name="color" multiple onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded w-full">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
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
        </div>
        <div>
          <label className="block text-gray-700">Size</label>
          <input type="text" name="size" value={product.size} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <div>
          <label className="block text-gray-700">Discount Price</label>
          <input type="number" name="discountPrice" value={product.discountPrice} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
