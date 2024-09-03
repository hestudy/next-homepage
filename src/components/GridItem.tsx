import useToolbar from "@/hooks/useToolbar";
import { AppRouter } from "@/server/api/root";
import { api } from "@/trpc/react";
import * as Toolbar from "@radix-ui/react-toolbar";
import { inferRouterOutputs } from "@trpc/server";
import { useBoolean } from "ahooks";
import { Grip, LockKeyhole, Trash } from "lucide-react";
import { toast } from "sonner";
import IFrame from "./IFrame";
import LinkComponent from "./LinkComponent";
import Rss from "./Rss";
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
import { AnimatePresence, motion } from "framer-motion";

const noLockTypes = ["link"];

const GridItem = ({
  item,
}: {
  item: inferRouterOutputs<AppRouter>["layout"]["list"][number];
}) => {
  const [cover, coverAc] = useBoolean(true);
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

  return (
    <div className="relative flex h-full w-full flex-col [&>*]:shrink-0">
      <AnimatePresence>
        {!readonly && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
            }}
            className="absolute left-0 top-0 z-20 w-full bg-background/30 backdrop-blur"
          >
            <Toolbar.Root className="flex w-full space-x-1 p-1">
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
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative h-0 flex-1">
        {!noLockTypes.includes(component?.type ?? "") && (
          <AnimatePresence>
            {cover && (
              <motion.div
                key={"cover"}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                }}
                className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center bg-gray-900/40"
                onClick={() => {
                  coverAc.set(false);
                }}
              >
                <LockKeyhole className="size-4" />
              </motion.div>
            )}
            {!cover && (
              <motion.div
                key={"unlock"}
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                className="absolute right-0 top-0 z-10 cursor-pointer rounded bg-background/10 p-1 backdrop-blur-sm"
                onClick={() => {
                  coverAc.set(true);
                }}
              >
                <LockKeyhole className="size-4" />
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {component?.type === "iframe" && (
          <IFrame data={component.data as any} />
        )}
        {component?.type === "rss" && (
          <Rss id={component.id} data={component.data as any} />
        )}
        {component?.type === "link" && (
          <LinkComponent data={component.data as any} />
        )}
      </div>
    </div>
  );
};

export default GridItem;
