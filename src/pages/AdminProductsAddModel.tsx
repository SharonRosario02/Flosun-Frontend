import { useState } from "react";

type Product = {
  _id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  flowers: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (newProduct: Product) => void;
};

const AddProductModal = ({ isOpen, onClose, onAddProduct }: Props) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [flowers, setFlowers] = useState("");
  const [image, setImage] = useState("");

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    const newProduct: Product = {
      _id: "",
      name,
      price,
      description,
      flowers,
      image,
    };
    onAddProduct(newProduct);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-96 rounded bg-white p-8">
        <h2 className="mb-4 text-2xl font-semibold">Add New Product</h2>
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="mb-1 block">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="mb-1 block">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded border border-gray-300 px-2 py-1"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="flowers" className="mb-1 block">
            Flowers:
          </label>
          <input
            type="text"
            id="flowers"
            value={flowers}
            onChange={(e) => setFlowers(e.target.value)}
            className="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="image"
            className="mb-1 block cursor-pointer rounded border border-dashed border-gray-300 p-4 text-center"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {image ? (
              <img src={image} alt="Product" className="mx-auto h-40 w-40 object-cover" />
            ) : (
              <span>Drag and drop an image here or click to select a file</span>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 rounded bg-gray-300 px-4 py-2 text-gray-700"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded bg-purple-600 px-4 py-2 text-white"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;