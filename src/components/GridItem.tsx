import useToolbar from "@/hooks/useToolbar";
import { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { inferRouterOutputs } from "@trpc/server";
import { useBoolean, useDebounceFn } from "ahooks";
import { Grip, Trash } from "lucide-react";
import { toast } from "sonner";
import IFrame from "./IFrame";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

const GridItem = ({
  item,
}: {
  item: inferRouterOutputs<AppRouter>["layout"]["list"][number];
}) => {
  const [show, showAc] = useBoolean(true);
  const { componentList, readonly, layoutList, noLayoutComponentList } =
    useToolbar();

  const component = componentList?.data?.find(
    (component) => component.id === item.i,
  );

  const deleteMutation = api.layout.delete.useMutation({
    onSuccess: () => {
      toast.success("Delete Success");
      layoutList?.refetch?.();
      noLayoutComponentList?.refetch?.();
    },
    onMutate() {
      toast.loading("Deleting...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  const { run: setShow } = useDebounceFn(
    (value: boolean) => {
      showAc.set(value);
    },
    {
      wait: 300,
    },
  );

  return (
    <div className="flex h-full w-full flex-col p-2 [&>*]:shrink-0">
      {!readonly && (
        <>
          <Toolbar.Root className="mb-2 flex space-x-1">
            <Label>{component?.name}</Label>
            <div className="flex-1"></div>
            <Dialog>
              <DialogTrigger asChild>
                <Toolbar.Button>
                  <Trash className="size-4" />
                </Toolbar.Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Delete Component</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this component?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        deleteMutation.mutate({
                          id: item.id,
                        });
                      }}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Toolbar.Button className="grid-item-drag">
              <Grip className="size-4" />
            </Toolbar.Button>
          </Toolbar.Root>
        </>
      )}
      <div
        className="relative h-0 flex-1"
        onMouseEnter={() => {
          setShow(false);
        }}
        onMouseLeave={() => {
          setShow(true);
        }}
      >
        {show && (
          <div className="z-1 absolute inset-0 bg-gray-50 bg-opacity-10"></div>
        )}
        {component?.type === "iframe" && (
          <IFrame data={component.data as any} />
        )}
      </div>
    </div>
  );
};

export default GridItem;
