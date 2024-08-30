import { Skeleton } from "./ui/skeleton";

const GridLoading = () => {
  return (
    <div className="grid h-[100px] grid-cols-3 gap-4">
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
      <Skeleton></Skeleton>
    </div>
  );
};

export default GridLoading;
