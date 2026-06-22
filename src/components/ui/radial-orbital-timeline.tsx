"use client"

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import {
  BriefcaseBusiness,
  GraduationCap,
  School,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import type { JourneyItem } from "@/content/portfolio"

type RadialOrbitalTimelineProps = { items: JourneyItem[] }
type OrbitStyle = React.CSSProperties & {
  "--orbit-angle": string
  "--orbit-counter-angle": string
}

const journeyIcons: LucideIcon[] = [GraduationCap, BriefcaseBusiness, School]

export function RadialOrbitalTimeline({ items }: RadialOrbitalTimelineProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div>
      <div
        className={cn(
          "orbital-journey relative hidden min-h-[32rem] items-center justify-center lg:flex",
          shouldReduceMotion && "orbital-reduce"
        )}
        aria-label="Interactive journey timeline"
      >
        <div className="orbit-ring orbit-ring-outer" aria-hidden="true" />
        <div className="orbit-core" aria-hidden="true">
          <span className="orbit-core-pulse orbit-core-pulse-one" />
          <span className="orbit-core-pulse orbit-core-pulse-two" />
          <Sparkles className="relative z-10 size-5" />
        </div>

        <div className="orbit-track">
          {items.map((item, index) => {
            const angle = (index / items.length) * 360 - 90
            const Icon = journeyIcons[index] ?? GraduationCap
            const isActive = activeIndex === index
            const style: OrbitStyle = {
              "--orbit-angle": `${angle}deg`,
              "--orbit-counter-angle": `${-angle}deg`,
            }

            return (
              <div
                key={`${item.period}-${item.title}`}
                className="orbit-node-position"
                style={style}
              >
                <div className="orbit-node-counter">
                  <button
                    type="button"
                    className={cn(
                      "orbit-node",
                      isActive && "orbit-node-active"
                    )}
                    onClick={() =>
                      setActiveIndex((current) =>
                        current === index ? null : index
                      )
                    }
                    aria-expanded={isActive}
                    aria-label={`${isActive ? "Hide" : "Show"} ${item.label} journey details`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </button>
                  <span
                    className={cn("orbit-node-label", isActive && "text-white")}
                  >
                    {item.label}
                  </span>

                  <AnimatePresence>
                    {isActive ? (
                      <motion.div
                        className="orbit-node-card"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { opacity: 0, y: -8, scale: 0.96 }
                        }
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.28 }}
                      >
                        <div
                          className="orbit-node-card-line"
                          aria-hidden="true"
                        />
                        <div className="flex items-center justify-between gap-4">
                          <span className="rounded-full border border-[#ff7655]/30 bg-[#ff7655]/8 px-2 py-1 font-mono text-[0.58rem] text-[#ff7655] uppercase">
                            {index === 0 ? "Current" : "Completed"}
                          </span>
                          <span className="font-mono text-[0.62rem] text-white/38">
                            {item.period}
                          </span>
                        </div>
                        <h3 className="mt-4 text-base leading-tight font-medium">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-xs text-white/48">
                          {item.place}
                        </p>
                        {item.description ? (
                          <p className="mt-4 border-t border-white/8 pt-4 text-xs leading-relaxed text-white/38">
                            {item.description}
                          </p>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="relative space-y-0 pl-8 lg:hidden">
        <span
          className="absolute top-3 bottom-3 left-[0.42rem] w-px bg-gradient-to-b from-[#ff7655] via-[#ff7655]/35 to-white/8"
          aria-hidden="true"
        />
        {items.map((item, index) => {
          const Icon = journeyIcons[index] ?? GraduationCap
          return (
            <motion.article
              key={`${item.period}-${item.title}`}
              initial={shouldReduceMotion ? false : { opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="relative border-b border-white/10 py-7 first:pt-0"
            >
              <span className="absolute top-8 -left-8 flex size-3.5 items-center justify-center rounded-full border border-[#ff7655]/70 bg-[#18191b] first:top-1">
                <span className="size-1 rounded-full bg-[#ff7655]" />
              </span>
              <div className="flex items-start gap-4">
                <span className="mt-1 flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.025] text-[#ff7655]">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-mono text-xs text-[#ff7655]">
                    {item.period}
                  </p>
                  <h3 className="mt-2 text-xl font-medium">{item.title}</h3>
                  <p className="mt-2 text-sm text-white/48">{item.place}</p>
                  {item.description ? (
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/38">
                      {item.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>
    </div>
  )
}
