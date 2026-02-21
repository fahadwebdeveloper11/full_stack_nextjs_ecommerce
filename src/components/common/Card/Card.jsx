import { Button } from "@/components/ui/button";
// import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/redux/cartSlice";
import { Rating } from "@mui/material";
import Link from "next/link";
import { memo } from "react";
import { useDispatch } from "react-redux";

const Card = ({ item }) => {
  const dispatch = useDispatch();

  const addCart = (item) => {
    dispatch(addToCart(item));
  };
  return (
    <div className="w-full sm:max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-auto xs:h-[380px] relative flex flex-col items-center group">
      <div className="relative overflow-hidden h-full xs:h-[390px] sm:h-[280px] self-start w-full ">
        <img
          className="p-1 h-full rounded-t-lg object-cover w-full"
          src={item?.image?.url}
          alt={item?.title}
        />
        <Button
          onClick={() => addCart(item)}
          className="capitalize text-white  hover:bg-rose-500 p-2 h-12 bg-[#222222] absolute bottom-0 lg:-bottom-14 opacity-100 lg:opacity-0 group-hover:bottom-0 lg:group-hover:opacity-100 duration-300 transition-all left-1/2 translate-x-[-50%] w-[95%] rounded-none z-30"
        >
          Add to cart
        </Button>
      </div>

      <div className="px-5 py-2">
        <Link href={`/product/${item?._id}`}>
          <h5 className="text-base text-center font-semibold tracking-tight text-gray-900 dark:text-white">
            {item?.title}
          </h5>
        </Link>

        <div className="flex items-center justify-center mt-2.5 mb-5">
          <Rating
            value={item?.rating}
            precision={0.5}
            name="read-only"
            readOnly
          />
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {item?.rating?.toFixed(1)}
          </span>
        </div>

        <div className="flex items-center justify-center gap-1">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            Rs {item?.price}
          </span>
          <span className="line-through text-[#777777] text-base">
            Rs {item?.discountedPrice}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(Card);
