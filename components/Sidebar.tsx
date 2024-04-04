"use client";

import React, { useState } from "react";
import { Nav } from "./ui/nav";

type Props = {};

import {
  ShoppingCart,
  UsersRound,
  LayoutDashboard,
  Settings,
  ChevronRight,
  FolderOpen,
  Layers3
} from "lucide-react";
import { Button } from "./ui/button";

import { useWindowWidth } from "@react-hook/window-size";
export default function Sidenavbar({}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const onlyWidth = useWindowWidth();
  const mobilewidth = onlyWidth < 768;

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }
  return (
    <div className="relative min-w-[80px] border-r px-3 pb-10 pt-24">
     {!mobilewidth && (
      <div className="absolute right-[-20px] top-7">
        <Button
          onClick={toggleSidebar}
          variant="secondary"
          className=" rounded-full p-2"
        >
          <ChevronRight />
        </Button>
      </div>
     )} 
      <Nav
        isCollapsed={mobilewidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Members",
            href: "/users",
            icon: UsersRound,
            variant: "ghost",
          },
          {
            title: "Projects",
            href: "/orders",
            icon: FolderOpen ,
            variant: "ghost",
          },
          {
            title: "Category",
            href: "/viewCategory",
            icon: Layers3,
            variant: "ghost",
          },
          {
            title: "Settings",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
}
