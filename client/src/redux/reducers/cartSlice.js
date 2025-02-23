import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Create User Cart Thunk
export const createUserCart = createAsyncThunk(
  'cart/createUserCart',
  async ({ products, _id }, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem('userToken') || null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userToken,
        },
      };

      // GET THE USER'S CART
      const res = await axios.get(`/api/cart/${_id}`, config);

      // CHECK IF THE USER HAS A CART IN DB
      if (!res.data || !res.data.products) {
        // IF NO CART, CREATE CART
        await axios.post(`/api/cart/`, { products, _id }, config);
        return products; // Return the products sent in the request
      } else {
        return res.data.products; // Return existing cart products
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Update User Cart Thunk
export const updateUserCart = createAsyncThunk(
  'cart/updateUserCart',
  async ({ products, _id }, { rejectWithValue }) => {
    try {
      const userToken = localStorage.getItem('userToken') || null;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userToken,
        },
      };

      // Get the current cart (optional)
      await axios.get(`/api/cart/${_id}`, config);

      // UPDATE USER'S CART
      const res = await axios.put(`/api/cart/${_id}`, { products }, config);
      return res.data.products;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Cart Slice
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    showCart: false,
    quantity: 0,
    total: 0,
    itemTotal: 0,
    cartItems: [],
    amountTotal: 0,
    loading: false,
    error: false,
    success: false,
    errMsg: '',
    userCartItems: [],
  },
  reducers: {
    cartDisplay: (state, action) => {
      state.showCart = action.payload;
    },
    quantityCount: (state, action) => {
      switch (action.payload) {
        case '':
          state.quantity = 0;
          break;
        case 'decrease':
          state.quantity = Math.max(state.quantity - 1, 0);
          break;
        case 'increase':
          state.quantity = Math.min(state.quantity + 1, 100);
          break;
        default:
          state.quantity = Math.min(parseInt(action.payload, 10), 100);
          break;
      }
    },
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const productIndex = state.cartItems.findIndex(item => item.id === product._id);
      
      if (productIndex >= 0) {
        // Update existing item in cart
        state.cartItems[productIndex].quantity += quantity;
        state.cartItems[productIndex].itemTotal += (product.discountPrice * quantity);
      } else {
        // Add new item to cart
        state.cartItems.push({
          id: product._id,
          product,
          quantity,
          itemTotal: product.discountPrice * quantity,
        });
      }
      // Update totals
      state.quantity = Math.max(quantity, 1); // Ensure quantity is at least 1
    },
    deleteItem: (state, action) => {
      const itemTitle = action.payload.toLowerCase();
      state.cartItems = state.cartItems.filter(item => item.product.title.toLowerCase() !== itemTitle);
    },
    setTotals: (state) => {
      state.total = state.cartItems.reduce((acc, item) => acc + item.quantity, 0);
      state.amountTotal = state.cartItems.reduce((acc, item) => acc + item.itemTotal, 0);
    },
    emptyCartOnLogout: (state) => {
      state.cartItems = [];
      state.userCartItems = [];
    },
    emptyCart: (state) => {
      state.cartItems = [];
      state.userCartItems = [];
    }
  },
  extraReducers: {
    [createUserCart.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createUserCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true;
      state.errMsg = '';
      state.userCartItems = payload;
    },
    [createUserCart.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMsg = payload.msg || payload;
    },
    [updateUserCart.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [updateUserCart.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userCartItems = payload;
      state.errMsg = '';
    },
    [updateUserCart.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.errMsg = payload.msg || payload;
    },
  }
});

export const {
  cartDisplay,
  addToCart,
  quantityCount,
  deleteItem,
  setTotals,
  emptyCartOnLogout,
  emptyCart
} = cartSlice.actions;
export default cartSlice.reducer;
