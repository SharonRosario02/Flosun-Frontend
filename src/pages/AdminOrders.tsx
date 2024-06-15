import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  img: string;
  // Add any other necessary product properties
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

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:9000/api/product-orders");
        const allOrders = response.data;
        setOrders(allOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.put(`http://localhost:9000/api/product-orders/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status } : order))
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">Admin Orders</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-600 text-white text-center">
              <th className="px-6 py-3 text-left">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
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
                      <td className="px-6 py-4 font-medium" rowSpan={order.products.length}>
                        {order.orderId}
                      </td>
                    )}
                    {productIndex === 0 && (
                      <td className="px-6 py-4 font-medium" rowSpan={order.products.length}>
                        {order.customerId.username}
                      </td>
                    )}
                    <td className="px-6 py-4 flex items-center">
                      <img
                        src={product.productId.img}
                        alt={product.productId.name}
                        className="w-12 h-12 object-cover rounded-full mr-4"
                      />
                      <span className="font-medium">{product.productId.name}</span>
                    </td>
                    <td className="px-6 py-4 text-center">₹{product.productId.price}</td>
                    <td className="px-6 py-4 text-center">{product.quantity}</td>
                    {productIndex === 0 && (
                      <td className="px-6 py-4 text-center" rowSpan={order.products.length}>
                        <select
                          value={order.status}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                          className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
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

export default AdminOrders;