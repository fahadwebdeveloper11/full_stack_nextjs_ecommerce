import { Rating } from "@mui/material";
import Image from "next/image";

const ReviewCard = ({ avatar, name, comment, rating }) => {
  return (
    <div className="py-6 flex gap-4 border-b border-b-gray-300">
      <div className="text-center flex flex-col gap-1.5 items-center">
        {avatar ? (
          <Image
            src={avatar}
            width={100}
            height={100}
            alt={"image"}
            className={
              "rounded-full w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] object-cover"
            }
          />
        ) : (
          <div className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] bg-gray-300 dark:bg-gray-500 rounded-full uppercase text-xl flex items-center justify-center font-semibold">
            {name[0]}
          </div>
        )}
        <h1 className="text-sm sm:text-base whitespace-nowrap font-semibold dark:text-white text-[#202938] ">
          {name}
        </h1>
        <Rating
          size={window.innerWidth < 768 ? "small" : "medium"}
          name="read-only"
          value={rating}
          readOnly
        />
      </div>
      <div>
        <p className="text-[#515968] dark:text-gray-300 sm:text-base text-sm w-full sm:w-[90%]">
          {comment}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
