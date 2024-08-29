import Toolbar from "@/components/Toolbar";
import { ToolbarProvider } from "@/components/ToolbarContext";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading() {
    return (
      <div className="grid h-[100px] grid-cols-3 gap-4">
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
        <Skeleton></Skeleton>
      </div>
    );
  },
});

const page = async () => {
  return (
    <ToolbarProvider>
      <div className="relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="sticky top-0 h-[56px] bg-background/30 backdrop-blur">
          <div className="container flex h-full items-center justify-between">
            <div>demo</div>
            <div>
              <Toolbar></Toolbar>
            </div>
            <div></div>
          </div>
        </div>
        <div className="container">
          <Grid></Grid>
        </div>
      </div>
    </ToolbarProvider>
  );
};

export default page;
