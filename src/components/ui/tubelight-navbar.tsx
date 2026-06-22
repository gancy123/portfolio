"use client"

import * as React from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export type TubelightNavItem = {
  name: string
  url: `#${string}`
  icon: LucideIcon
}

type TubelightNavbarProps = {
  items: TubelightNavItem[]
  className?: string
}

export function TubelightNavbar({ items, className }: TubelightNavbarProps) {
  const [activeTab, setActiveTab] = React.useState(items[0]?.name ?? "")

  React.useEffect(() => {
    const sections = items
      .map((item) => document.querySelector<HTMLElement>(item.url))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (!visible) return
        const item = items.find(
          (candidate) => candidate.url === `#${visible.target.id}`
        )
        if (item) setActiveTab(item.name)
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.1, 0.35, 0.6] }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [items])

  return (
    <nav
      className={cn(
        "fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:top-2 md:bottom-auto",
        className
      )}
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-[#141516]/88 p-1.5 shadow-[0_16px_50px_rgb(0_0_0/0.42)] backdrop-blur-xl md:bg-white/[0.035] md:shadow-none">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative flex size-10 items-center justify-center rounded-full text-white/48 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-[#ff7655]/50 focus-visible:outline-none md:h-9 md:w-auto md:px-3.5",
                isActive && "text-white"
              )}
              aria-current={isActive ? "location" : undefined}
              aria-label={item.name}
            >
              <Icon className="size-4 md:hidden" aria-hidden="true" />
              <span className="hidden text-sm md:inline">{item.name}</span>
              {isActive ? (
                <motion.span
                  layoutId="tubelight-active"
                  className="absolute inset-0 -z-10 rounded-full bg-[#ff7655]/9"
                  transition={{ type: "spring", stiffness: 320, damping: 30 }}
                  aria-hidden="true"
                >
                  <span className="absolute -top-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#ff7655] shadow-[0_0_12px_2px_rgb(255_90_54/0.6)]" />
                </motion.span>
              ) : null}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
