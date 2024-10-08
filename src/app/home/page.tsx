import GridLoading from "@/components/GridLoading";
import Toolbar from "@/components/Toolbar";
import { ToolbarProvider } from "@/components/ToolbarContext";
import dynamic from "next/dynamic";

const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading() {
    return <GridLoading></GridLoading>;
  },
});

const page = async () => {
  return (
    <ToolbarProvider>
      <div className="relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="sticky top-0 z-10 h-[56px] bg-background/30 backdrop-blur">
          <div className="container grid h-full grid-cols-3">
            <div className="flex items-center text-2xl [&]:[font-family:'Anton',sans-serif]">
              Next HomePage
            </div>
            <div className="flex items-center justify-center">
              <Toolbar></Toolbar>
            </div>
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
