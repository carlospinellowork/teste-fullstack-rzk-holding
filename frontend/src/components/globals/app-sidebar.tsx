"use client";

import { ArrowDownCircle, ArrowUpCircle, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from "@/components/ui/sidebar";

const navItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Contas a Pagar",
    url: "/payable",
    icon: ArrowDownCircle,
  },
  {
    title: "Contas a Receber",
    url: "/receivable",
    icon: ArrowUpCircle,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-slate-200"
      {...props}
    >
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-slate-100">
        <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center w-full">
          <span className="font-bold text-slate-800 text-lg group-data-[collapsible=icon]:hidden">
            RZK Holding
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 font-medium px-4 py-2 mt-4 group-data-[collapsible=icon]:hidden">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-2 gap-1">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    tooltip={item.title}
                    className="hover:bg-slate-100 transition-colors"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center gap-3 py-6"
                    >
                      <item.icon
                        className={`h-5 w-5 ${pathname === item.url ? "text-blue-600" : "text-slate-500"}`}
                      />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
