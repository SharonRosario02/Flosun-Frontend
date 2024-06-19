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
    address: string;
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
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();

    // Close the dropdown when clicking outside
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        selectedOrderId &&
        !(event.target as HTMLElement).closest(".dropdown-container")
      ) {
        setSelectedOrderId(null);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [selectedOrderId]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get<OrderData[]>("http://localhost:9000/api/product-orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    try {
      await axios.put(`http://localhost:9000/api/product-orders/${orderId}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const toggleDropdown = (orderId: string) => {
    setSelectedOrderId((prevOrderId) => (prevOrderId === orderId ? null : orderId));
  };

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h2 className="text-3xl font-bold text-purple-600 mb-6">All Orders</h2>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-purple-600 text-white text-center">
              <th className="px-6 py-3 text-left w-[140px]">Order ID</th>
              <th className="px-6 py-3 text-left">Customer</th>
              <th className="px-6 py-3 text-left">Address</th>
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
                        {order.customerId?.username || "Deleted User"}
                      </td>
                    )}
                    {productIndex === 0 && (
                      <td className="px-6 py-4 w-[20%] font-medium" rowSpan={order.products.length}>
                        {order.customerId?.address || "N/A"}
                      </td>
                    )}
                    <td className="px-6 py-4 flex items-center">
                      {product.productId ? (
                        <>
                          <img
                            src={product.productId.img}
                            alt={product.productId.name}
                            className="w-12 h-12 object-cover rounded-full mr-4"
                          />
                          <span className="font-medium">{product.productId.name}</span>
                        </>
                      ) : (
                        <span className="font-medium">Deleted Product</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {product.productId ? `₹${product.productId.price}` : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">{product.quantity}</td>
                    {productIndex === 0 && (
                      <td className="px-6 py-4 text-center relative" rowSpan={order.products.length}>
                        <div className="dropdown-container inline-block text-left">
                          <div>
                            <button
                              type="button"
                              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                              id={`status-menu-${order._id}`}
                              aria-haspopup="true"
                              aria-expanded={selectedOrderId === order._id}
                              onClick={() => toggleDropdown(order._id)}
                            >
                              {order.status}
                              <svg
                                className="-mr-1 ml-2 h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>

                          {selectedOrderId === order._id && (
                            <div
                              className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby={`status-menu-${order._id}`}
                            >
                              <div className="py-1" role="none">
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleStatusChange(order._id, "pending")}
                                >
                                  Pending
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleStatusChange(order._id, "processing")}
                                >
                                  Processing
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleStatusChange(order._id, "shipped")}
                                >
                                  Shipped
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleStatusChange(order._id, "delivered")}
                                >
                                  Delivered
                                </button>
                                <button
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                  role="menuitem"
                                  onClick={() => handleStatusChange(order._id, "cancelled")}
                                >
                                  Cancelled
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
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