import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`/api/order/${id}`);
        setOrders(orders.filter((order) => order._id !== id));
      } catch (error) {
        console.error("Error deleting order:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-start bg-gray-100 pt-10 pb-12">
      {/* Outer Fixed Container (No Extra Space Below) */}
      <div className="w-[80%] md:w-[60%] bg-white p-6 rounded-lg shadow-md h-[550px] flex flex-col">
        <h2 className="text-xl font-semibold text-center mb-4">Orders</h2>

        {/* Inner Scrollable Container */}
        <div className="overflow-y-auto flex-grow">
          <table className="w-full border-collapse">
            <thead className="bg-gray-200 sticky top-0">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>

            {/* Orders List */}
            <tbody className="divide-y">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id} className="border-b">
                    <td className="px-6 py-4">{order._id}</td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4">${order.amount}</td>
                    <td className="px-6 py-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    No orders available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
