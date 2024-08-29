"use client";

import useToolbar from "@/hooks/useToolbar";
import { Wrench } from "lucide-react";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Toggle } from "./ui/toggle";

const Toolbar = () => {
  const { readonly, setReadOnly } = useToolbar();

  return (
    <Menubar>
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
          <MenubarItem>IFrame</MenubarItem>
          <MenubarItem>RSS</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Settings</MenubarTrigger>
        <MenubarContent>
          {/* <MenubarItem>Appearance</MenubarItem> */}
          {/* <MenubarSeparator></MenubarSeparator> */}
          <Link href={"/api/auth/signout"}>
            <MenubarItem>Logout</MenubarItem>
          </Link>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Toolbar;
