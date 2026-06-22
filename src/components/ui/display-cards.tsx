"use client"

import type { ReactNode } from "react"
import { Sparkles } from "lucide-react"

import { cn } from "@/lib/utils"

export type DisplayCardProps = {
  className?: string
  icon?: ReactNode
  title?: string
  description?: string
  date?: string
  iconClassName?: string
  titleClassName?: string
}

function DisplayCard({
  className,
  icon = <Sparkles />,
  title = "Web capability",
  description = "A practical skill in progress",
  date = "Learning by building",
  iconClassName,
  titleClassName,
}: DisplayCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-40 w-[min(23rem,calc(100vw-3rem))] -skew-y-[6deg] select-none flex-col justify-between overflow-hidden rounded-2xl border border-white/12 bg-[#1b1c1f]/92 px-5 py-4 text-left shadow-2xl backdrop-blur-md transition duration-500 after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:bg-gradient-to-l after:from-[#141516] after:to-transparent after:content-[''] hover:-translate-y-2 hover:border-[#ff5a36]/55 hover:bg-[#202124] motion-reduce:transform-none motion-reduce:transition-none",
        className,
      )}
    >
      <div className="relative z-10 flex items-center gap-3">
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-xl bg-[#ff5a36]/12 text-[#ff7655] [&_svg]:size-4",
            iconClassName,
          )}
        >
          {icon}
        </span>
        <h3 className={cn("text-lg font-medium", titleClassName)}>{title}</h3>
      </div>
      <p className="relative z-10 max-w-[18rem] text-base text-[#f2efe8]">
        {description}
      </p>
      <p className="relative z-10 font-mono text-xs text-[#9f9d98]">{date}</p>
    </article>
  )
}

type DisplayCardsProps = {
  cards?: DisplayCardProps[]
}

const defaultCards: DisplayCardProps[] = [
  {
    className: "[grid-area:stack] hover:-translate-y-12",
  },
  {
    className:
      "[grid-area:stack] translate-x-8 translate-y-12 hover:translate-x-8 hover:-translate-y-1 md:translate-x-14 md:hover:translate-x-14",
  },
  {
    className:
      "[grid-area:stack] translate-x-16 translate-y-24 hover:translate-x-16 hover:translate-y-14 md:translate-x-28 md:hover:translate-x-28",
  },
]

export default function DisplayCards({ cards = defaultCards }: DisplayCardsProps) {
  return (
    <div className="grid min-h-[22rem] [grid-template-areas:'stack'] place-items-center py-10 opacity-100 animate-in fade-in-0 duration-700">
      {cards.map((cardProps, index) => (
        <DisplayCard key={`${cardProps.title ?? "card"}-${index}`} {...cardProps} />
      ))}
    </div>
  )
}
