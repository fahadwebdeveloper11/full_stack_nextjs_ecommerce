"use client";

import MultiSelect from "@/components/common/Multi Select/MultiSelect";
import { colorOptions, sizeOptions } from "@/constant/colorAndSizeOptions";
import axios from "axios";
import { memo, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const UpdateModal = ({ product, isOpen, onClose = () => {} }) => {
  // console.log(product);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    price: "",
    image: null,
    category: "",
    quantity: "",
    discountedPrice: "",
    size: [],
    color: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // console.log("productFormData", productData);
  // console.log("product", product);

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
      formData.append("imagePublicId", productData.imagePublicId);
      formData.append(
        "size",
        productData.size.map((s) => s.value.toUpperCase())
      );
      formData.append(
        "color",
        productData.color.map((c) => c.value)
      );

      // console.log(formData);

      const response = await axios.put(
        `/api/product/update/${product._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      onClose();
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setProductData({
      title: product?.title,
      description: product?.description,
      price: product?.price,
      image: null,
      category: product?.category?.title,
      quantity: product?.quantity,
      discountedPrice: product?.discountedPrice,
      size: product?.size?.map((s) => ({ label: s, value: s })),
      color: product?.color?.map((c) => ({ label: c, value: c })),
      imagePublicId: product?.image?.public_id,
    });
  }, [product]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Product</Button>
      </DialogTrigger> */}
      <DialogContent className=" h-screen overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 overflow-hidden"
                >
                  <Image
                    src={
                      productData.image
                        ? URL.createObjectURL(productData.image)
                        : product?.image?.url
                    }
                    width={400}
                    height={400}
                    alt="product image"
                    className="object-cover w-full h-full rounded-lg"
                  />

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleInputChange}
                    accept="image/*"
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
                htmlFor="brand"
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
                name="category"
                onChange={handleInputChange}
                value={productData.category}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              >
                <option value={""}>Select category</option>

                <option value="Shoes">Shoes</option>
                <option value="Backpacks">Backpacks</option>
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
                <span className="ml-2">Updating...</span>
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
        {/* <DialogFooter>
          <Button type="submit" onClick={onClose}>
            Save changes
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default memo(UpdateModal);
