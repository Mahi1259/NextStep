"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TreesIcon as Tree, Menu } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"

export function Navbar() {
  const isMobile = useIsMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1">
              <Tree className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">NextStep</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* User Profile */}
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* Mobile Menu Button - Only shown on mobile when sidebar isn't visible */}
          {isMobile && (
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <SheetHeader className="mb-4">
                  <SheetTitle>User Profile</SheetTitle>
                  <SheetDescription>Your account information</SheetDescription>
                </SheetHeader>
                <div className="flex items-center gap-3 mt-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">User Name</div>
                    <div className="text-xs text-muted-foreground">Maker</div>
                  </div>
                </div>
                <div className="mt-6 border-t pt-6">
                  <Button variant="outline" className="w-full">
                    Sign Out
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  )
}

