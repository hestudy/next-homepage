import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createElement, FC, ReactNode, useState } from "react";

const useDialog = () => {
  const [children, setChildren] = useState<ReactNode>();
  const [open, setOpen] = useState(false);

  const el = (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger></DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );

  const openDialog = (fc: FC) => {
    setChildren(createElement(fc));
    setOpen(true);
  };

  const close = () => {
    setOpen(false);
  };

  return {
    el,
    dialog: {
      open: openDialog,
      close,
    },
  };
};

export default useDialog;
