import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MyOrders = () => {
  document.title = "My Orders";

  const { orders = [] } = useSelector((state) => state.order || {}); // Provide a default empty array if orders is null/undefined
  const { userInfo } = useSelector((state) => state.auth || {}); // Handle potential null/undefined for userInfo

  return (
    <div>
      <h3 className="text-xl leading-6 font-bold text-very-dark-blue">
        My Orders
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-dark-grayish-blue">
        Order history details
      </p>
      <hr className="border-b border-grayish-blue mt-3 mb-8" />

      <div>
        {userInfo && orders.length > 0 ? (
          <>
            {orders.map((order, index) => (
              <div key={order._id || index} className="mb-8">
                <div className="flex items-center p-4 border-b border-t border-grayish-blue sm:p-6 w-full">
                  <dl className="flex flex-col lg:flex-row justify-between w-full text-sm relative">
                    <div className="absolute bg-light-grayish-blue -inset-x-4 -top-6 -bottom-6 my-2"></div>
                    <div className="flex flex-col lg:flex-row relative">
                      <div className="lg:px-2 xl:px-6 flex lg:flex-col flex-row justify-between py-1 lg:py-0 h-fit">
                        <dt className="font-bold text-very-dark-blue">
                          Order number
                        </dt>
                        <dd className="mt-1 text-dark-grayish-blue uppercase flex-wrap text-[0.5rem] sm:[0.6rem]">
                          {order.paymentID ? order.paymentID.slice(3) : "N/A"}
                        </dd>
                      </div>
                      <div className="lg:px-2 xl:px-6 flex lg:flex-col flex-row justify-between py-1 lg:py-0 h-fit hidden sm:flex">
                        <dt className="font-bold text-very-dark-blue">
                          Date placed
                        </dt>
                        <dd className="mt-1 text-dark-grayish-blue">
                          <time dateTime={`${order.createdAt?.slice(0, 10)}`}>
                            {order.createdAt
                              ? new Date(order.createdAt.slice(0, 10))
                                  .toDateString()
                                  .slice(3)
                              : "N/A"}
                          </time>
                        </dd>
                      </div>
                      <div className="lg:px-2 xl:px-6 flex lg:flex-col flex-row justify-between py-1 lg:py-0 h-fit">
                        <dt className="font-bold text-very-dark-blue">
                          Total amount
                        </dt>
                        <dd className="mt-1 font-medium text-very-dark-blue">
                          $ {order.amount ? order.amount.toFixed(2) : "0.00"}
                        </dd>
                      </div>
                    </div>
                    {/* <div className="flex lg:flex-col flex-row relative justify-between py-1 lg:py-0 h-fit lg:min-w-[20%]">
                      <dt className="font-bold text-very-dark-blue">
                        Delivery Details
                      </dt>
                      <dd className="mt-1 font-medium text-very-dark-blue text-end lg:text-start text-xs">
                        <address className="not-italic text-very-dark-blue w-full">
                          <p className="fullname mb-2">
                            {order.address?.firstname || "N/A"}{" "}
                            {order.address?.lastname || ""}
                          </p>
                          <p className="location text-dark-grayish-blue">
                            {order.address?.streetAddress || "N/A"}
                          </p>
                          <p className="city-state mb-2 text-dark-grayish-blue">
                            {order.address?.city || "N/A"},{" "}
                            {order.address?.state || "N/A"}
                          </p>
                          <p className="telephone text-dark-grayish-blue mb-3">
                            {order.address?.phone || "N/A"}
                          </p>
                        </address>
                      </dd>
                    </div> */}
                  </dl>
                </div>

                <div className="orders flex flex-col lg:-mx-3 mt-7 mb-16">
                  {order.products && order.products.length > 0 ? (
                    order.products.map((item, idx) => (
                      <div key={idx} className="">
                        <Link
                          to={`/products/${item[0]?.product?._id || "#"}`}
                          className="cursor-pointer hover:opacity-70 transition"
                        >
                          <div className="w-full h-full rounded-md relative my-2 lg:mx-3 lg:my-3 flex ">
                            <div className="flex flex-row">
                              {/* <img
                                className="w-22 h-22 hover:opacity-80 object-cover"
                                src={item[0]?.product?.img[0] || ""}
                                alt="order-img"
                              /> */}
                              <div className="flex flex-col">
                                <div className="flex flex-row text-sm lg:text-base">
                                  <p className="ml-4 mr-2">
                                    {item[0]?.product?.title || "N/A"}
                                  </p>
                                  X<p className="ml-2">
                                    {item[0]?.quantity || "0"}
                                  </p>
                                </div>
                                {/* <div className="amount ml-4 mt-2 text-dark-grayish-blue">
                                  ${item[0]?.itemTotal || "0.00"}
                                </div> */}
                              </div>
                            </div>
                          </div>
                          <hr className="text-gray-200" />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-dark-grayish-blue">
                      No products in this order.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-xl">No Orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
