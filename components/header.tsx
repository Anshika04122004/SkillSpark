"use client"

import { Button } from "@/components/ui/button"
import { Menu, Sparkles } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SkillSpark
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Features
            </a>
            <a href="#feed" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Explore
            </a>
            <Link href="/creator" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
              For Creators
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-sm">
              Sign In
            </Button>
            <Link href="/learner">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-muted rounded-lg transition">
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 space-y-3 pb-4">
            <a
              href="#features"
              className="block text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              Features
            </a>
            <a href="#feed" className="block text-sm font-medium text-foreground/70 hover:text-foreground transition">
              Explore
            </a>
            <Link
              href="/creator"
              className="block text-sm font-medium text-foreground/70 hover:text-foreground transition"
            >
              For Creators
            </Link>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" className="flex-1 text-sm">
                Sign In
              </Button>
              <Link href="/learner" className="flex-1">
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
