"use client"

import { TreesIcon as Tree, Users, BarChart3 } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export function AppSidebar() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  const routes = [
    {
      title: "Skill Tree",
      icon: Tree,
      href: "/skill-tree",
    },
    {
      title: "Contribute",
      icon: Users,
      href: "/contribute",
    },
    {
      title: "Dashboard",
      icon: BarChart3,
      href: "/dashboard",
    },
  ]

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="flex items-center justify-end p-4">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton asChild isActive={pathname === route.href} tooltip={route.title}>
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className={cn("p-4", isCollapsed ? "justify-center" : "")}>
        <div className={cn("flex items-center gap-2", isCollapsed ? "flex-col" : "")}>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", isCollapsed ? "hidden" : "")}>
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground">Maker</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

