import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  itemName: string;
};

const DeleteConfirmationModal = ({ isOpen, onClose, onDelete, itemName }: Props) => {
  const handleDelete = () => {
    onDelete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50">
      <div className="w-80 rounded-3xl bg-white py-8 px-4 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold text-center">Confirm Delete</h2>
        <p className="mb-6 text-center px-2">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="mr-2 rounded-3xl bg-gray-200 px-5 py-2 font-semibold text-[18px] text-gray-700 hover:bg-gray-300"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-3xl bg-red-500 px-5 py-2 font-semibold text-[18px] text-white hover:bg-red-600"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;