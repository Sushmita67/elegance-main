import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilters,
  selectFilters,
  selectSort,
} from "../redux/reducers/productSlice";

const Filter = () => {
  const dispatch = useDispatch();

  // Get values from Redux state
  const filter = useSelector((state) => state.product.filter);
  const loading = useSelector((state) => state.product.loading);
  const brands = useSelector((state) => state.product.brands) || [];
  const categories = useSelector((state) => state.product.categories) || [];
  const filteredProducts = useSelector(
    (state) => state.product.filteredProducts
  );

  useEffect(() => {
    if (!loading) {
      dispatch(getFilters());
    }
  }, [dispatch, filteredProducts, loading]);

  // Handle filter selection
  const handleFilter = (e) => {
    dispatch(
      selectFilters({ filter: { ...filter, [e.target.name]: e.target.value } })
    );
  };

  // Handle sorting selection
  const handleSort = (e) => {
    dispatch(selectSort({ sort: e.target.value }));
    dispatch(selectFilters({ filter: { ...filter } }));
  };

  return (
    <div className="wrapper mt-28 lg:mt-40 flex flex-col sm:flex-row justify-between mx-auto sm">
      {/* FILTER PRODUCTS */}
      <div className="filter-container mb-4 sm:mb-0 flex items-center justify-between sm:mr-8">
        <span className="font-bold text-base md:text-xl mr-2 sm:mr-10">
          Filter Products:
        </span>
        <div className="flex">
          {/* Brand Filter */}
          <select
            className="appearance-none px-3 py-2 border border-solid transition ease-in-out m-0 focus:outline-none capitalize bg-white"
            name="company"
            onChange={handleFilter}
          >
            <option value="">Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            className="appearance-none px-3 py-2 border border-solid transition ease-in-out m-0 focus:outline-none capitalize bg-white ml-4"
            name="category"
            onChange={handleFilter}
          >
            <option value="">Category</option>
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option disabled>No Categories Available</option>
            )}
          </select>
        </div>
      </div>

      {/* SORT PRODUCTS */}
      <div className="sort-container flex items-center justify-between">
        <span className="font-bold md:text-xl mr-2 sm:mr-10">
          Sort Products:
        </span>
        <select
          className="appearance-none px-3 py-2 border border-solid transition ease-in-out m-0 focus:outline-none bg-white"
          name="sortBy"
          onChange={handleSort}
        >
          <option value="newest">Newest</option>
          <option value="asc">Price, low-high</option>
          <option value="desc">Price, high-low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
