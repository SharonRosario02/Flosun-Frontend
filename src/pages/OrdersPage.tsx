import React, { useState, useEffect } from "react";
import axios from "../../backendService";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  img: string;
}

interface OrderData {
  _id: string;
  customerId: {
    _id: string;
    username: string;
    email: string;
    phone: string;
    confirmPassword: string;
    __v: number;
  };
  products: {
    productId: Product;
    quantity: number;
    _id: string;
  }[];
  totalPrice: number;
  status: string;
  orderId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/product-orders");
        const allOrders = response.data;

        const userDataString = localStorage.getItem("user");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const customerId = userData?._id || "";

        const filteredOrders = allOrders.filter(
          (order: OrderData) => order.customerId._id === customerId
        );
        setOrders(filteredOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    const fetchUserAddress = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        const userData = userDataString ? JSON.parse(userDataString) : null;
        const userId = userData?._id || "";

        const response = await axios.get(`/api/user/${userId}`);
        const user = response.data;
        setAddress(user.address || "");
      } catch (error) {
        console.error("Error fetching user address:", error);
      }
    };

    fetchOrders();
    fetchUserAddress();
  }, []);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSaveAddress = async () => {
    try {
      const userDataString = localStorage.getItem("user");
      const userData = userDataString ? JSON.parse(userDataString) : null;
      const userId = userData?._id || "";

      await axios.put(`/api/user/${userId}`, { address });
      console.log("Address updated successfully");
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">Your Orders</h2>
      <div className="mb-6">
        <label
          htmlFor="address"
          className="block text-lg font-medium text-gray-700"
        >
          My Address:
        </label>
        <div className="flex">
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            placeholder="For ex: 123 Main St, Anytown, USA 12345"
            onChange={handleAddressChange}
            className="mt-1 block w-full border py-2 border-gray-300 rounded-md shadow-sm px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          />
          <button
            onClick={handleSaveAddress}
            className="mt-1 ml-4 inline-flex items-center px-4 w-[13%] border py-2 border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Save Address
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-600 text-white text-center">
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Flower</th>
              <th className="px-6 py-3 text-center">Price</th>
              <th className="px-6 py-3 text-center">Quantity</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, orderIndex) => (
              <React.Fragment key={order._id}>
                {order.products.map((product, productIndex) => (
                  <tr
                    key={`${order._id}-${product._id}`}
                    className={`${
                      orderIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                    } hover:bg-gray-200 transition-colors duration-300`}
                  >
                    {productIndex === 0 && (
                      <td
                        className="px-6 py-4 font-medium"
                        rowSpan={order.products.length}
                      >
                        {order.orderId}
                      </td>
                    )}
                    <td className="px-6 py-4 flex items-center">
                      <img
                        src={product.productId.img}
                        alt={product.productId.name}
                        className="w-12 h-12 object-cover rounded-full mr-4"
                      />
                      <span className="font-medium">
                        {product.productId.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      ₹{product.productId.price}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.quantity}
                    </td>
                    {productIndex === 0 && (
                      <td
                        className="px-6 py-4 text-center"
                        rowSpan={order.products.length}
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            order.status === "pending"
                              ? "bg-yellow-200 text-yellow-800"
                              : order.status === "delivered"
                              ? "bg-green-200 text-green-800"
                              : order.status === "cancelled"
                              ? "bg-red-500 text-white"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    )}
                    {productIndex === 0 && (
                      <td
                        className="px-6 py-4 text-center font-medium"
                        rowSpan={order.products.length}
                      >
                        ₹{order.totalPrice}
                      </td>
                    )}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
