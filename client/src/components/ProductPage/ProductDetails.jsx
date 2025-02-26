import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, quantityCount } from "../../redux/reducers/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const quantity = useSelector((state) => state.cart.quantity);
  const cartItems = useSelector((state) => state.cart.cartItems);

  // Set document title if product is available
  useEffect(() => {
    if (product && product.title) {
      document.title = `${product.title}`;
    }
  }, [product]);

  useEffect(() => {
    dispatch(quantityCount(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems]);

  if (!product) {
    return <div>Loading...</div>; // Render loading state or handle absence of product
  }

  const calculateDiscount = () => {
    if (product.price && product.discountPrice) {
      return Math.floor(
        ((product.price - product.discountPrice) / product.price) * 100
      );
    }
    return 0;
  };

  return (
    <>
      <h2 className="company uppercase text-black font-bold text-sm sm:text-md tracking-wider pb-3 sm:pb-5">
        {product.company}
      </h2>
      <h3 className="product capitalize text-very-dark-blue font-bold text-3xl sm:text-4xl sm:leading-none pb-3">
        {product.title}
      </h3>
      <p className="text-dark-grayish-blue pb-6 lg:py-7 lg:leading-6">
        {product.desc}
      </p>
      <div className="amount font-bold flex items-center justify-between lg:flex-col lg:items-start mb-6">
        <div className="discount-price items-center flex lg:w-1/3 justify-between">
          <div className="price text-3xl">${product.discountPrice}</div>
          <div className="discount text-black bg-pale-black w-max px-2 rounded mx-5 h-6 lg:mr-0">
            {calculateDiscount()}%
          </div>
        </div>
        <div className="original-price text-grayish-blue line-through lg:mt-2">
          ${product.price}
        </div>
      </div>
      <div className="sm:flex lg:mt-8 w-full">
        <div className="quantity-container w-full bg-light-grayish-blue rounded-lg h-14 mb-4 flex items-center justify-between px-6 lg:px-3 font-bold sm:mr-3 lg:mr-5 lg:w-1/3">
          <button
            onClick={() => dispatch(quantityCount("decrease"))}
            className="text-black text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            -
          </button>
          <input
            min={0}
            max={100}
            onChange={(e) => dispatch(quantityCount(e.target.value))}
            className="quantity focus:outline-none text-dark-blue bg-light-grayish-blue font-bold flex text-center w-full"
            type="number"
            name="quantity"
            value={quantity}
            aria-label="quantity of products"
          />
          <button
            onClick={() => dispatch(quantityCount("increase"))}
            className="text-black text-2xl leading-none font-bold mb-1 lg:mb-2 lg:text-3xl hover:opacity-60"
          >
            +
          </button>
        </div>

        <button
          onClick={() => dispatch(addToCart({ product, quantity }))}
          className="cart w-full h-14 bg-black rounded-lg lg:rounded-xl mb-2 shadow-[0px_10px_30px_#f5f5dc] text-white flex items-center justify-center lg:w-3/5 hover:opacity-60"
        >
          <i className="cursor-pointer text-white text-xl leading-0 pr-3">
            <ion-icon name="cart-outline"></ion-icon>
          </i>
          Add to cart
        </button>
      </div>
    </>
  );
};

export default ProductDetails;
