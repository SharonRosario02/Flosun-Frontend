"use client";
import IconEdit from "../icons/icon-edit";
import IconTrashLines from "../icons/icon-trash-lines";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import axios from "../../backendService";
import { useEffect, useState } from "react";
import { DataTable } from "mantine-datatable";
import { MantineProvider } from "@mantine/core";
// import DeleteModal from './components/deleteModal';

type User = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  createdAt: string;
  blocked: boolean;
};

type Props = {};

const UserMaster = (props: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [userId, setUserId] = useState("");

  const fetchData = async () => {
    const response = await axios.get("/api/user");
    setUsers(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteModal = (id: string) => {
    setUserId(id);
    setDeleteModal(true);
  };

  return (
    <MantineProvider>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        <div className="panel h-full w-full">
          <div className="mb-5 flex items-center justify-between">
            <h5 className="text-lg font-semibold dark:text-white-light">
              Users
            </h5>
          </div>
          <div className="table-responsive">
            <DataTable
              noRecordsText="No users found"
              highlightOnHover
              className="table-hover whitespace-nowrap"
              records={users}
              columns={[
                {
                  accessor: "",
                  title: (
                    <div className="flex items-center justify-end">
                      <div className="ml-auto">Sr. No.</div>
                    </div>
                  ),
                  width: "80px",
                  render: (user: User, index: number) => (
                    <span
                      key={index}
                      className="flex w-full items-center justify-center"
                    >
                      {index + 1}
                    </span>
                  ),
                },
                { accessor: "username", title: "Username" },
                { accessor: "email", title: "Email" },
                { accessor: "phone", title: "Phone" },
                {
                  accessor: "createdAt",
                  title: "Logged In Date",
                  render: (user: User) => (
                    <div>{new Date(user.createdAt).toLocaleString()}</div>
                  ),
                },
                {
                  accessor: "blocked",
                  title: "Blocked",
                  render: (user: User) => (
                    <div>{user.blocked ? "Yes" : "No"}</div>
                  ),
                },
                {
                  accessor: "action",
                  title: (
                    <div className="flex items-center justify-end">
                      <div className="ml-auto">Action</div>
                    </div>
                  ),
                  render: (user: User) => (
                    <div className="flex flex-wrap items-center justify-end gap-6">
                      <div className="cursor-pointer">
                        <Tippy content="Delete user" placement="top">
                          <span onClick={() => handleDeleteModal(user._id)}>
                            <IconTrashLines className="text-red-600" />
                          </span>
                        </Tippy>
                      </div>
                    </div>
                  ),
                },
              ]}
              totalRecords={users.length}
              recordsPerPage={pageSize}
              page={page}
              onPageChange={setPage}
              recordsPerPageOptions={PAGE_SIZES}
              onRecordsPerPageChange={setPageSize}
              minHeight={200}
              paginationText={({ from, to, totalRecords }) =>
                `Showing ${from} to ${to} of ${totalRecords} entries`
              }
            />
          </div>
        </div>
        {/* <DeleteModal deleteModal={deleteModal} setDeleteModal={setDeleteModal} userId={userId} fetchData={fetchData} /> */}
      </div>
    </MantineProvider>
  );
};

export default UserMaster;
