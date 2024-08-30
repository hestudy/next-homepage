"use client";

import useDialog from "@/hooks/useDialog";
import useToolbar from "@/hooks/useToolbar";
import { api } from "@/trpc/react";
import { Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import IFrameForm from "./IFrameForm";
import { Badge } from "./ui/badge";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Toggle } from "./ui/toggle";

const Toolbar = () => {
  const { readonly, setReadOnly, noLayoutComponentList, layoutList } =
    useToolbar();
  const { el, dialog } = useDialog();
  const [open, setOpen] = useState(false);

  const layoutCreateMutation = api.layout.create.useMutation({
    onSuccess() {
      noLayoutComponentList?.refetch?.();
      setOpen(false);
      toast.success("Created");
      layoutList?.refetch?.();
    },
    onMutate() {
      toast.loading("Creating...");
    },
    onSettled() {
      toast.dismiss();
    },
  });

  return (
    <Menubar>
      {el}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput></CommandInput>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Components">
            {noLayoutComponentList?.data?.map((item) => {
              return (
                <CommandItem
                  key={item.id}
                  className="space-x-2"
                  onSelect={() => {
                    layoutCreateMutation.mutate({
                      i: item.id,
                      w: 4,
                      h: 10,
                      x: 0,
                      y: 0,
                    });
                  }}
                >
                  <Badge>{item.type}</Badge>
                  <span>{item.name}</span>
                </CommandItem>
              );
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
      <MenubarMenu>
        <Toggle
          className="h-8"
          pressed={!readonly}
          onPressedChange={(v) => {
            setReadOnly?.(!v);
          }}
        >
          <Wrench className="size-4" />
        </Toggle>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Components</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              dialog.open(() => {
                return (
                  <IFrameForm
                    onSuccess={() => {
                      dialog.close();
                    }}
                  ></IFrameForm>
                );
              });
            }}
          >
            IFrame
          </MenubarItem>
          <MenubarItem>RSS</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          <MenubarItem
            onClick={() => {
              setOpen(true);
            }}
          >
            My Components
          </MenubarItem>
          <MenubarSeparator></MenubarSeparator>
          <Link href={"/api/auth/signout"}>
            <MenubarItem>Logout</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Toolbar;
