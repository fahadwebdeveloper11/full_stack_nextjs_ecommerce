import { addToCart } from "@/redux/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetails = ({ product }) => {
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [size, setSize] = useState("");

  const addCart = () => {
    const item = { ...product, color: selectedColor, size };
    dispatch(addToCart(item));
  };

  return (
    <>
      {!product?.color?.includes('') && product?.color?.length > 0 && (
        <div className="mb-4">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Select Color:
          </span>
          <div className="flex items-center mt-2">
            {product.color.map((c) => (
              <div
                key={c}
                onClick={() => setSelectedColor(c)}
                className={`w-6 h-6 rounded-full shadow-sm mr-2 cursor-pointer ${
                  selectedColor === c ? "ring-2 ring-black" : ""
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      )}
      {product?.size?.length > 0 && (
        <div className="mb-4">
          <span className="font-bold text-gray-700 dark:text-gray-300">
            Select Size:
          </span>
          <div className="flex items-center mt-2">
            {product.size.map((s) => (
              <div
                key={s}
                className={`bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white p-2 w-10 h-10 text-center rounded-full font-bold mr-2 hover:cursor-pointer ${
                  size === s ? "ring-2 ring-black" : ""
                }`}
                onClick={() => setSize(s)}
              >
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex -mx-2 mb-4">
        <div className="w-1/2 px-2">
          <button
            onClick={addCart}
            className="w-full bg-rose-600 text-white py-2 px-4 rounded-full font-bold hover:bg-rose-700"
          >
            Add to Cart
          </button>
        </div>
        {/* <div className="w-1/2 px-2">
          <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
            Add to Wishlist
          </button>
        </div> */}
      </div>
    </>
  );
};

export default ProductDetails;
