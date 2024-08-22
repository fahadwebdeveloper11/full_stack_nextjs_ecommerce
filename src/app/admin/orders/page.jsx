"use client";
import Link from "next/link";
import { memo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteProductModal from "@/components/Admin Components/Delete Product Modal/DeleteProductModal";
import { Delete, Pencil } from "lucide-react";
import ManageOrder from "@/components/Admin Components/Manage Order/ManageOrder";

const AdminOrders = () => {
  const deleteOrderHanlder = async (id) => {};

  const orders = [
    {
      customer: { name: "test" },
      _id: 1,
      name: "test",
      orderStatus: "Pending",
      amount: 100,
      orderItems: [
        {
          quantity: 4,
          price: 100,
        },
      ],
    },
  ];

  return (
    <div className="">
      <section className="   dark:bg-gray-900 p-3 sm:p-5 antialiased">
        <div className="mx-auto pt-6 max-w-screen-xl ">
          <div className="bg-white min-h-[20rem]  dark:bg-gray-800 relative shadow-md rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="flex-1 flex items-center space-x-2">
                <h5>
                  <span className="text-gray-500">All Orders:</span>
                </h5>

                <div
                  id="results-tooltip"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Showing 1-100 of 436 results
                  <div className="tooltip-arrow" data-popper-arrow />
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 border-t dark:border-gray-700">
              <div className="w-full md:w-1/2"></div>
            </div>
            {orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        Customer
                      </th>
                      <th scope="col" className="p-4">
                        Quantity
                      </th>

                      <th scope="col" className="p-4">
                        Total
                      </th>

                      <th scope="col" className="p-4">
                        Status
                      </th>
                      <th scope="col" className="p-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  {orders?.map((order) => (
                    <tbody key={order._id}>
                      <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <td className="px-4 py-3">{order.customer.name}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <div className="h-4 w-4 rounded-full inline-block mr-2 bg-red-700" />
                            {order.orderItems.reduce((total, order) => {
                              const { quantity } = order;
                              total += quantity;
                              return total;
                            }, 0)}
                          </div>
                        </td>

                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          <div className="flex items-center">
                            <span className="text-gray-500 dark:text-gray-400 ml-1">
                              ${order.orderPrice}
                            </span>
                          </div>
                        </td>

                        <td
                          className="px-4 py-3"
                          style={{
                            color:
                              order.status === "PENDING"
                                ? "#FF9800"
                                : order.status === "DELIEVERED"
                                ? "#59CD89"
                                : order.status === "CANCELLED"
                                ? "red"
                                : "#474747",
                          }}
                        >
                          {order.status}
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {/* <div className="flex gap-5 items-center">
                            <Link href={`/dashboard/all-orders/${order._id}`}>
                              Manage
                            </Link>
                            <button
                              type="button"
                              data-modal-target="delete-modal"
                              data-modal-toggle="delete-modal"
                              onClick={() => setOpenModalId(order._id)}
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
                          </div> */}
                          <ActionsMenu />
                        </td>
                      </tr>
                    </tbody>
                  ))}
                </table>
              </div>
            ) : (
              <h1 className="absolute top-32 left-1/2">No orders</h1>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

const ActionsMenu = memo(() => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const onDeleteClose = () => {
    setIsDeleteOpen(false);
  };

  const onDeleteOpen = () => {
    setIsDeleteOpen(true);
  };

  const onOrderClose = () => {
    setIsOrderOpen(false);
  };

  const onOrderOpen = () => {
    setIsOrderOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            type="button"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 mr-4">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="cursor-pointer" onClick={onOrderOpen}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Manage</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer" onClick={onDeleteOpen}>
            <Delete className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteProductModal
        id={1}
        isDeleteOpen={isDeleteOpen}
        onDeleteClose={onDeleteClose}
        isOrderDelete={true}
      />
      <ManageOrder
        order={{}}
        isOrderOpen={isOrderOpen}
        onOrderClose={onOrderClose}
       
        />
    </>
  );
});

export default AdminOrders;
