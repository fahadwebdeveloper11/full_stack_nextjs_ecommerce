"use client";
import {
  calculateTotals,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from "@/redux/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { memo, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

console.log(
  "process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
function Cart() {
  const user = useSession()?.data?.user;
  // console.log("user", user);

  const [details, setDetails] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const { cartItems, cartTotal, cartQtyTotal } = useSelector(
    (state) => state?.cart
  );

  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login first to checkout");
      return;
    }

    if (!details.name || !details.phone || !details.address) {
      toast.error("Please fill all the fields");
      return;
    }
    setLoading(true);
    const stripe = await stripePromise;

    const response = await axios.post(
      "/api/checkout_sessions",
      {
        products: cartItems,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const session = response.data; // The Stripe response

    console.log("session", session);
    const result = await stripe.redirectToCheckout({
      sessionId: session.sessionId,
    });

    if (result.error) {
      alert(result.error.message);
    }

    setLoading(false);
  };

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQtyIncrease = (id) => {
    dispatch(increaseQty(id));
  };

  const handleQtyDecrease = (id) => {
    dispatch(decreaseQty(id));
  };

  // console.log("cartItems: ", cartItems);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);
  return (
    <>
      <div className=" mt-10 lg:max-w-screen-xl mx-auto">
        <div className="relative max-h-screen overflow-y-auto overflow-x-auto shadow-md mx-auto w-[90%] sm:rounded-lg">
          {cartItems.length > 0 ? (
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={item.image.url}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => handleQtyDecrease(item._id)}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>
                          <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            placeholder="1"
                            value={item.itemQty}
                            readOnly
                          />
                        </div>
                        <button
                          onClick={() => handleQtyIncrease(item._id)}
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      Rs {item.price}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      Rs {item.price * item.itemQty}
                    </td>
                    <td className="px-6 py-4">
                      <IoCloseCircleOutline
                        fontSize={"2rem"}
                        className="hover:cursor-pointer"
                        color="#be123c"
                        onClick={() => handleRemove(item._id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="min-h-[40vh] flex items-center justify-center flex-col shadow-md gap-1 rounded-sm">
              <h1>No Items</h1>
              <Link href={"/shop"} className="text-rose-500">
                Go to Shop
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex w-full flex-wrap justify-center md:justify-between sm:items-start  md:flex-nowrap gap-5 lg:px-24 px-5 my-10">
        <CartDetails details={details} handleChange={handleChange} />
        <div className="w-[90%] md:w-[50%]  lg:ml-auto lg:w-[30rem] my-10 md:my-0 bg-[#f9f9f9] dark:bg-gray-800 md:p-5 p-4 dark:border-gray-800  border-[1px] border-[#ebebeb] rounded-md">
          <div>
            <div className="before:w-full before:absolute relative before:left-0 before:bg-[#ebebeb] dark:before:bg-gray-700 before:h-[1px] before:bottom-1/4 ">
              <h1 className="text-xl font-medium mt-6 relative pr-2 bg-[#f9f9f9] dark:bg-gray-800 inline-block w-fit z-10">
                Cart Total
              </h1>
            </div>
            <div className="my-6">
              <div className="flex items-center justify-between">
                <h3>Total Products</h3>
                <h4 className="font-medium text-lg">{cartQtyTotal}</h4>
              </div>
              <div className="flex items-center justify-between my-5">
                <h3 className="font-semibold text-xl text-[#eb4343]">
                  Grand Total
                </h3>
                <h4 className="font-semibold text-xl text-[#eb4343]">
                  Rs {cartTotal}
                </h4>
              </div>
            </div>
            <button
              disabled={cartQtyTotal === 0}
              onClick={handleCheckout}
              className="uppercase px-4 lg:w-full whitespace-nowrap lg:text-lg text-sm lg:px-8 py-3 bg-rose-600 text-white rounded-full hover:bg-[#9b1919] duration-300"
            >
              proceed to checokout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const CartDetails = memo(function CartDetails({ details, handleChange }) {
  return (
    <div className=" bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex">
        <div className="flex-1 py-5 pl-5 overflow-hidden">
          <svg
            className="inline align-text-top"
            height="24px"
            viewBox="0 0 24 24"
            width="24px"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
          >
            <g>
              <path
                d="m4.88889,2.07407l14.22222,0l0,20l-14.22222,0l0,-20z"
                fill="none"
                id="svg_1"
                stroke="null"
              />
              <path
                d="m7.07935,0.05664c-3.87,0 -7,3.13 -7,7c0,5.25 7,13 7,13s7,-7.75 7,-13c0,-3.87 -3.13,-7 -7,-7zm-5,7c0,-2.76 2.24,-5 5,-5s5,2.24 5,5c0,2.88 -2.88,7.19 -5,9.88c-2.08,-2.67 -5,-7.03 -5,-9.88z"
                id="svg_2"
              />
              <circle cx="7.04807" cy="6.97256" r="2.5" id="svg_3" />
            </g>
          </svg>
          <h1 className="inline text-2xl font-semibold leading-none">
            Your Shipping Address
          </h1>
        </div>
      </div>
      <div className="px-5 pb-5">
        <label htmlFor="">Name</label>
        <input
          placeholder="Name"
          value={details.name}
          name="name"
          onChange={(e) => handleChange(e)}
          className=" text-black dark:text-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 dark:bg-gray-900  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400 mb-5"
        />

        <label htmlFor="">Address</label>
        <input
          placeholder="Address"
          className=" text-black dark:text-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 dark:bg-gray-900  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400 mb-5"
          value={details.address}
          onChange={(e) => handleChange(e)}
          name="address"
        />
        <div className="flex">
          <div className="flex-grow">
            <label htmlFor="">Phone</label>
            <input
              placeholder="Phone"
              value={details.phone}
              onChange={(e) => handleChange(e)}
              name="phone"
              className=" text-black dark:text-white placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent dark:bg-gray-900 rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

CartDetails.displayName = "CartDetails";

export default Cart;
