"use client";
import { useEffect, useState } from "react";
//@ts-ignore
import axios from "../../backendService";
import AddProductModal from "./AdminProductsAddModel";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  flowers: string;
};

type Props = {};

const AdminProducts = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchData = async () => {
    const response = await axios.get("/api/products");
    setProducts(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleAddProduct = async (newProduct: Product) => {
    await axios.post("/api/products", newProduct);
    fetchData();
    closeAddModal();
  };

  return (
    <div className="container mx-auto px-28 py-8">
       <div className="flex items-center justify-between">
        <h2 className="mb-6 text-3xl font-semibold text-purple-600">Products</h2>
        <button
          className="rounded-xl bg-purple-600 px-4 py-2 text-white"
          onClick={openAddModal}
        >
          Add New +
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-purple-600 text-white">
              <th className="px-4 py-2">Sr. No.</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              {/* <th className="px-4 py-2">Flowers</th> */}
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">
                  <img
                    src={`data:image/jpeg;base64,${product.image}`}
                    alt={product.name}
                    className="mx-auto h-20 w-20 object-cover"
                  />
                </td>
                <td className="border px-4 py-2 text-center">${product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{product.description}</td>
                {/* <td className="border px-4 py-2">{product.flowers}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
};

export default AdminProducts;