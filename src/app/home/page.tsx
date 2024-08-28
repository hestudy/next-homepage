import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

const page = async () => {
  return (
    <div className="relative h-full overflow-y-auto [&::-webkit-scrollbar]:hidden">
      <div className="bg-background/30 sticky top-0 h-[56px] backdrop-blur">
        <div className="container flex h-full items-center justify-between">
          <div>demo</div>
          <Popover>
            <PopoverTrigger>Components</PopoverTrigger>
            <PopoverContent className="w-[600px]">
              <div className="grid grid-cols-2 gap-4">
                <div className="hover:bg-accent hover:text-accent-foreground cursor-pointer gap-2 rounded p-4">
                  <div className="mb-2 text-sm font-medium leading-none">
                    IFrame
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Embed any website or web app into your app.
                  </p>
                </div>
                <div className="hover:bg-accent hover:text-accent-foreground cursor-pointer gap-2 rounded p-4">
                  <div className="mb-2 text-sm font-medium leading-none">
                    RSS
                  </div>
                  <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                    Fetch and display the latest content updates from any RSS
                    feed.
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="container">
        <ResizablePanelGroup direction="vertical">
          {/* <ResizableHandle></ResizableHandle> */}
          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
              {/* <ResizableHandle></ResizableHandle> */}
              <ResizablePanel>demo</ResizablePanel>
              <ResizableHandle></ResizableHandle>
              <ResizablePanel>demo</ResizablePanel>
              <ResizableHandle></ResizableHandle>
              <ResizablePanel defaultSize={0}></ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          <ResizableHandle></ResizableHandle>
          <ResizablePanel>
            <ResizablePanelGroup direction="horizontal">
              {/* <ResizableHandle></ResizableHandle> */}
              <ResizablePanel>demo</ResizablePanel>
              <ResizableHandle></ResizableHandle>
              <ResizablePanel>demo</ResizablePanel>
              {/* <ResizableHandle></ResizableHandle> */}
            </ResizablePanelGroup>
          </ResizablePanel>
          {/* <ResizableHandle></ResizableHandle> */}
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default page;
