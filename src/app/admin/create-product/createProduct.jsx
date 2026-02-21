"use client";

import MultiSelect from "@/components/common/Multi Select/MultiSelect";
import { colorOptions, sizeOptions } from "@/constant/colorAndSizeOptions";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    quantity: 0,
    discountedPrice: 0,
    size: [],
    color: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleColorChange = (selected) => {
    setProductData({ ...productData, color: selected });
  };

  const handleSizeChange = (selected) => {
    setProductData({ ...productData, size: selected });
  };

  const handleInputChange = (e) => {
    // console.log(e.target?.files);
    setProductData({
      ...productData,
      [e.target.name]: e.target.files ? e.target.files[0] : e.target.value,
    });
  };

  //   console.log("productData", productData);

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("image", productData.image);
      formData.append("category", productData.category);
      formData.append("quantity", productData.quantity);
      formData.append("discountedPrice", productData.discountedPrice);
      formData.append(
        "size",
        productData.size.map((s) => s.value.toUpperCase()),
      );
      formData.append(
        "color",
        productData.color.map((c) => c.value),
      );

      //   console.log(formData);

      const response = await axios.post("/api/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Product created successfully");
        router.push("/admin");
      }
      //   console.log(response);
    } catch (error) {
      //   console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="  p-4">
      <div className="py-8 bg-white dark:bg-gray-800 px-4 rounded-lg mx-auto max-w-2xl lg:py-12">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a new product
        </h2>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 overflow-hidden"
                >
                  {productData.image ? (
                    <Image
                      src={URL.createObjectURL(productData.image)}
                      alt="product image"
                      className="object-cover w-full h-full rounded-lg"
                      width={400}
                      height={400}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG
                      </p>
                    </div>
                  )}
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleInputChange}
                    accept="image/*"
                    required
                    name="image"
                  />
                </label>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={productData.title}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type product name"
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="price"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$2999"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="discountedPrice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Discount Price
              </label>
              <input
                type="number"
                name="discountedPrice"
                id="discountedPrice"
                value={productData.discountedPrice}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="stock"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Stock
              </label>
              <input
                type="number"
                name="quantity"
                id="stock"
                value={productData.quantity}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label
                htmlFor="color"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Color
              </label>
              <MultiSelect
                key="example_id"
                options={colorOptions}
                onChange={handleColorChange}
                value={productData.color}
                isSelectAll={true}
                menuPlacement={"bottom"}
              />
            </div>
            <div>
              <label
                htmlFor="size"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Size
              </label>
              <MultiSelect
                key="example_id"
                options={sizeOptions}
                onChange={handleSizeChange}
                value={productData.size}
                isSelectAll={true}
                menuPlacement={"bottom"}
              />
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                value={productData.category}
                name="category"
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value={""}>Select category</option>

                <option value="Shoes">Backpacks</option>
                <option value="Shoes">Shoes</option>
                <option value="T-Shirts">T-Shirts</option>
                <option value="Jackets">Jackets</option>
                <option value="Laptop">Laptop</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={8}
                value={productData.description}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Your description here"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-rose-500 hover:bg-red-700 duration-300  rounded-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="ml-2">Please wait...</span>
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProduct;
