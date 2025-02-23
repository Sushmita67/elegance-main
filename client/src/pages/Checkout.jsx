import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { cartDisplay } from "../redux/reducers/cartSlice";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import axios from "axios";

const Checkout = () => {
  document.title = "Checkout Page";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userCartItems = [], amountTotal } = useSelector((state) => state.cart);
  const { userInfo, error, userErrorMsg, userToken, loading } = useSelector((state) => state.auth);
  const { addresses = [] } = useSelector((state) => state.address);
  const [formData, setFormData] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    dispatch(cartDisplay(false));
  }, [dispatch]);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const submitForm = async (data) => {
    try {
      setFormData(data);
      setDisabled(true);

      const selectedAddress = addresses.find(address => address.checked) || addresses[0];

      const orderData = {
        user: userInfo._id, // Assuming you have user info stored in the state
        products: userCartItems.map(item => ({
          productId: item._id ?? "60f7b1b3b3b3b3b3b3b3b3b3",
        
          quantity: item.quantity,
        })),
        amount: amountTotal,
        address: selectedAddress,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post("/api/orders", orderData, config);
      if (response.status === 200) {
        // Redirect to order confirmation page
        navigate("/khalti");
      } else {
        console.error("Failed to create order");
        navigate("/khalti");
      }
    } catch (err) {
      console.error("Error placing order: ", err);
      alert("Error placing order. Please try again.");
    } finally {
      setDisabled(false);
    }
  };

  const renderAddress = () => {
    if (addresses.length === 0) {
      return (
        <Link to="/user-profile/addresses">
          <p className="w-fit mt-8 mb-6 text-very-dark-blue border-b border-b-orange hover:border-b-transparent transition-all">
            Please Add An Address
          </p>
        </Link>
      );
    }

    const defaultAddress = addresses.find(address => address.checked) || addresses[0];

    return (
      <div className="text-dark-grayish-blue mt-6">
        <p className="text-very-dark-blue">
          {defaultAddress.firstname} {defaultAddress.lastname}
        </p>
        <p>{defaultAddress.streetAddress}</p>
        <p>{defaultAddress.city}, {defaultAddress.state}</p>
        <p>{defaultAddress.country}</p>
        <p>{defaultAddress.phone}</p>
      </div>
    );
  };

  return (
    <div className="bg-[#f9f9f9]">
      <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto lg:max-w-none">
          <h2 className="sr-only">Checkout</h2>

          <div className="relative flex flex-col lg:flex-row lg:gap-x-12 xl:gap-x-16">
            <div className="order-2 lg:order-1 bg-white mt-4 border border-gray-200 rounded-lg shadow-sm p-6 lg:w-3/5 py-16 h-fit">
              {userToken && (error ? (
                <p className="absolute text-sm text-center text-red-500 -top-4 left-0">
                  {userErrorMsg}. Please reload the page
                </p>
              ) : loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loading />
                </div>
              ) : null)}
              <h3 className="text-2xl font-bold text-dark-grayish-blue">Delivery Information</h3>
              {renderAddress()}
              <Link to="/user-profile/addresses">
                <p className="w-fit mt-4 text-orange border-b border-b-orange hover:border-b-transparent transition-all">
                  Change Address
                </p>
              </Link>

              <form onSubmit={handleSubmit(submitForm)}>
                {/* Form Fields (same as before) */}
                {/* Ensure you include fields for user input */}

                {!disabled && (
                  <div className="mt-8 py-6 flex">
                    <button
                      type="submit"
                      className="w-full lg:w-60 lg:ml-auto bg-orange border border-transparent rounded-md py-3 px-4 text-base font-medium text-black shadow-[inset_0_0_0_0_#ffede1] hover:shadow-[inset_0_-4rem_0_0_#ffede1] hover:text-orange transition-all duration-300"
                    >
                      Proceed to Payment
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary (same as before) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
