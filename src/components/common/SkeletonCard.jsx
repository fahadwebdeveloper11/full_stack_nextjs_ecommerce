import { Skeleton } from "../ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3 w-full">
      <Skeleton className="h-[300px] w-full rounded-xl" />
      <div className="space-y-2 flex items-center flex-col">
        <Skeleton className="h-6 w-[90%] " />
        <div className="flex justify-center gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-5 w-5" />
        </div>
        <Skeleton className="h-3 w-[100px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
