"use client";

import useDialog from "@/hooks/useDialog";
import useToolbar from "@/hooks/useToolbar";
import { Wrench } from "lucide-react";
import Link from "next/link";
import IFrameForm from "./IFrameForm";
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
  const { readonly, setReadOnly } = useToolbar();
  const { el, dialog } = useDialog();

  return (
    <Menubar>
      {el}
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
          <MenubarItem>My Components</MenubarItem>
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
