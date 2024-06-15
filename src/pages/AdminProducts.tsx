"use client";
import { useEffect, useState } from "react";
//@ts-ignore
import axios from "../../backendService";
import AddModel from "../components/adminProducts/addModel";
import EditModel from "../components/adminProducts/editModel";
import { FaEdit, FaTrash } from "react-icons/fa";
import DeleteModel from "../components/adminProducts/deleteModel";

type Product = {
  _id: string;
  name: string;
  img: string;
  price: number;
  description: string;
  flowers: string;
};

type Props = {};

const AdminProducts = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

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

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setSelectedProduct(null);
    setIsEditModalOpen(false);
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    await axios.put(`/api/products/₹{updatedProduct._id}`, updatedProduct);
    fetchData();
    closeEditModal();
  };

  const openDeleteModal = (productId: string) => {
    setSelectedProductId(productId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setSelectedProductId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteProduct = async () => {
    if (selectedProductId) {
      await axios.delete(`/api/products/${selectedProductId}`);
      fetchData();
      closeDeleteModal();
    }
  };

  if(products) console.log(products)

  return (
    <div className="container mx-auto px-28 py-8">
      <div className="flex items-center justify-between">
        <h2 className="mb-6 text-3xl font-semibold text-purple-600">
          Products
        </h2>
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
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={product._id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="mx-auto h-20 w-20 object-cover"
                  />
                </td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2 text-center">
                 ₹ {product.price.toFixed(2)}
                </td>
                <td className="border px-4 py-2">{product.description}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-700"
                    onClick={() => openEditModal(product)}
                  >
                    <FaEdit size={25}/>
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => openDeleteModal(product._id)}
                    
                  >
                    <FaTrash size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddModel
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        onAddProduct={handleAddProduct}
        fetchData={fetchData}
      />
      <EditModel
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        onEditProduct={handleEditProduct}
        product={selectedProduct}
        fetchData={fetchData}
      />
      <DeleteModel
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteProduct}
        itemName={products.find((product) => product._id === selectedProductId)?.name || ""}
      />
    </div>
  );
};

export default AdminProducts;