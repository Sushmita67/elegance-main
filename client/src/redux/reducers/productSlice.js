import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunks
export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, thunkAPI) => {
    try {
      let res = await axios.get('/api/products/');
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getProductsByCollection = createAsyncThunk(
  'product/getProductsByCollection',
  async (collection, thunkAPI) => {
    try {
      let res = await axios.get(`/api/products/?collection=${collection}`);
      return Array.isArray(res.data) ? res.data : [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    filteredProducts: [],
    images: [],
    curIndex: 0,
    slideIndex: 0,
    productId: 0,
    product: null, // Changed to null to handle no product case
    loading: true,
    error: false,
    errMsg: '',
    filter: { company: '', color: '' },
    containFilters: [],
    sort: 'newest',
    colors: [],
    brands: [],
    collection: []
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.products;
      state.loading = false;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.payload.err;
    },
    getFilteredProducts: (state, action) => {
      state.filteredProducts = state.products.filter((item) =>
        item.categories?.at(-1)?.gender?.includes(action.payload.gender) || false
      );
    },
    changeImage: (state, action) => {
      state.curIndex = action.payload.index;
    },
    prevPreview: (state) => {
      state.curIndex = Math.max(state.curIndex - 1, 0);
    },
    nextPreview: (state) => {
      state.curIndex = Math.min(state.curIndex + 1, state.images.length - 1);
    },
    prevSlide: (state) => {
      state.slideIndex = Math.max(state.slideIndex - 1, 0);
    },
    nextSlide: (state) => {
      state.slideIndex = Math.min(
        state.slideIndex + 1,
        (state.images.length - 1)
      );
    },
    getProductItem: (state, action) => {
      const product = state.products.find((item) => item._id === action.payload.productId);
      state.productId = action.payload.productId;
      state.product = product || null;
      state.images = product ? product.img : [];
    },
    getFilters: (state) => {
      const productsToFilter = state.filteredProducts.length > 0 ? state.filteredProducts : state.products;
      state.colors = Array.from(new Set(productsToFilter.flatMap(item => item.categories?.at(-1)?.color || []))).sort();
      state.brands = Array.from(new Set(productsToFilter.flatMap(item => item.company || []))).sort();
    },
    selectFilters: (state, action) => {
      state.filter = action.payload.filter;
      const productsToFilter = state.filteredProducts.length < 1 ? state.products : state.filteredProducts;
      if (!state.filter.color && !state.filter.company) {
        state.containFilters = productsToFilter.map(() => true);
      } else if (state.filter.company && !state.filter.color) {
        state.containFilters = productsToFilter.map(item =>
          Object.entries(state.filter).every(([key, value]) => item.company.includes(value))
        );
      } else {
        state.containFilters = productsToFilter.map(item =>
          Object.entries(state.filter).every(([key, value]) => (item.categories?.at(-1)?.[key] || item[key])?.includes(value))
        );
      }
    },
    selectSort: (state, action) => {
      state.sort = action.payload.sort;
      let items = state.filteredProducts.length < 1 ? state.products : state.filteredProducts;
      switch (action.payload.sort) {
        case 'newest':
          items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'asc':
          items = items.sort((a, b) => a.discountPrice - b.discountPrice);
          break;
        case 'desc':
          items = items.sort((a, b) => b.discountPrice - a.discountPrice);
          break;
        default:
          items = items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
      }
      state.products = items;
    }
  },
  extraReducers: {
    [getAllProducts.pending]: (state) => {
      state.loading = true;
    },
    [getAllProducts.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload;
      state.containFilters = state.products.map(() => true);
    },
    [getAllProducts.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.payload || action.error.message;
    },
    [getProductsByCollection.pending]: (state) => {
      state.loading = true;
    },
    [getProductsByCollection.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.collection = payload;
    },
    [getProductsByCollection.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
      state.errMsg = action.payload || action.error.message;
    }
  }
});

export const { getProducts, setError, getFilteredProducts, changeImage, prevPreview, nextPreview, prevSlide, nextSlide, getProductItem, selectFilters, selectSort, getFilters } = productSlice.actions;
export default productSlice.reducer;
