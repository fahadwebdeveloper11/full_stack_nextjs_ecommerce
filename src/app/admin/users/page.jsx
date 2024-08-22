"use client";
import DeleteProductModal from "@/components/Admin Components/Delete Product Modal/DeleteProductModal";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import { ColorRing } from "react-loader-spinner";
const fetcher = (url) => axios.get(url).then((res) => res.data);

const Users = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [userId, setUserId] = useState("");
  const [search, setSesrch] = useState("");

  const onDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const onDeleteOpen = (id) => {
    setUserId(id);
    setIsDeleteOpen(true);
  };

  const { data, isLoading, isError } = useSWR(
    `/api/users/all-users?search=${search}`,
    fetcher
  );

  const users = data?.users;

  console.log(users);
  return (
    <section className="px-1 py-5  sm:py-10 sm:px-4 ">
      <div className="relative  overflow-x-auto shadow-md rounded-lg">
        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 px-3 bg-white dark:bg-gray-800">
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
              onChange={(e) => setSesrch(e.target.value)}
              value={search}
            />
          </div>
        </div>
        {isLoading ? (
          <div
            style={{
              width: "100%",
              height: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 999999,
            }}
            className="dark:bg-gray-800 bg-[rgba(255, 255, 255, 0.9)]"
          >
            <ColorRing
              visible={true}
              height="80"
              width="80"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </div>
        ) : (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>

                <th scope="col" className="px-6 py-3">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={user.avatar}
                      alt="Jese image"
                    />
                    <div className="ps-3">
                      <div className="text-base font-semibold">{user.name}</div>
                      <div className="font-normal text-gray-500">
                        {user.email}
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 capitalize">{user.username}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {user.isAdmin ? "Admin" : "User"}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {/* Modal toggle */}
                    <button
                      type="button"
                      onClick={() => onDeleteOpen(user._id)}
                      className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 -ml-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              <DeleteProductModal
                id={userId}
                isDeleteOpen={isDeleteOpen}
                onDeleteClose={onDeleteClose}
                isUserDelete={true}
              />
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
};

export default Users;
