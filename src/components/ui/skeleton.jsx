import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md dark:bg-gray-700 bg-[#c9cbcd]", className)} {...props} />);
}

export { Skeleton }
