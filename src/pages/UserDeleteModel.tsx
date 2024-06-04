// import IconX from "../icons/icon-x";
import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { toast } from "react-hot-toast";
import axios from "../../backendService.js";


type Props = {
  userId: string;
  deleteModal: boolean;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => void;
};

const UserDeleteModel = (props: Props) => {
  const { deleteModal, setDeleteModal, userId, fetchData } = props;

  const handleFormSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`/api/user/${userId}`);
    try {
      const response = await axios.delete(`/api/user/${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      toast.success("User deleted!");
      fetchData();
      setDeleteModal(false);
    } catch (error: any) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error(error.response.data);
    }
  };

  return (
    <Transition appear show={deleteModal} as={Fragment}>
      <Dialog as="div" open={deleteModal} onClose={() => setDeleteModal(false)}>
        <div className="fixed inset-0 z-[999] overflow-y-auto bg-[black]/60">
          <div className="flex min-h-screen items-start justify-center px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                as="div"
                className="panel my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark"
              >
                <div className="flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]">
                  <div className="text-lg font-bold capitalize">
                    Confirm delete
                  </div>
                  <button
                    type="button"
                    className="text-white-dark hover:text-dark"
                    onClick={() => setDeleteModal(false)}
                  >
                    {/* <IconX /> */} X
                  </button>
                </div>
                <div className="p-5">
                  <p>Are you sure you want to delete the user?</p>
                  <div className="mt-8 flex items-center justify-end">
                    <button
                      type="button"
                      className="btn btn-outline-info"
                      onClick={() => setDeleteModal(false)}
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ltr:ml-4 rtl:mr-4"
                      onClick={(e) => handleFormSubmit(e)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserDeleteModel;