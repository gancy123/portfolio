"use client"

import * as React from "react"
import gsap from "gsap"
import { useReducedMotion } from "framer-motion"

import { cn } from "@/lib/utils"

type CardSwapProps = {
  children: React.ReactNode
  className?: string
  width?: number | string
  height?: number | string
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  skewAmount?: number
  pauseOnHover?: boolean
}

function makeSlot(
  index: number,
  distanceX: number,
  distanceY: number,
  total: number
) {
  return {
    x: index * distanceX,
    y: -index * distanceY,
    z: -index * distanceX * 1.25,
    zIndex: total - index,
  }
}

export function CardSwap({
  children,
  className,
  width = 430,
  height = 270,
  cardDistance = 28,
  verticalDistance = 24,
  delay = 2800,
  skewAmount = 3,
  pauseOnHover = true,
}: CardSwapProps) {
  const items = React.useMemo(
    () => React.Children.toArray(children),
    [children]
  )
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([])
  const orderRef = React.useRef(items.map((_, index) => index))
  const timelineRef = React.useRef<gsap.core.Timeline | null>(null)
  const pausedRef = React.useRef(false)
  const shouldReduceMotion = useReducedMotion()

  React.useEffect(() => {
    const cards = cardRefs.current.slice(0, items.length)
    const total = cards.length

    cards.forEach((card, index) => {
      if (!card) return
      const slot = makeSlot(index, cardDistance, verticalDistance, total)
      gsap.set(card, {
        ...slot,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        opacity: 1,
        force3D: true,
      })
    })

    if (shouldReduceMotion || total < 2) return

    const swap = () => {
      if (pausedRef.current || timelineRef.current?.isActive()) return

      const [front, ...rest] = orderRef.current
      const frontCard = cards[front]
      if (!frontCard) return

      const timeline = gsap.timeline()
      timelineRef.current = timeline
      timeline.to(frontCard, {
        y: "+=110",
        opacity: 0,
        duration: 0.48,
        ease: "power2.in",
      })
      timeline.addLabel("promote", "-=0.18")

      rest.forEach((cardIndex, index) => {
        const card = cards[cardIndex]
        if (!card) return
        const slot = makeSlot(index, cardDistance, verticalDistance, total)
        timeline.set(card, { zIndex: slot.zIndex }, "promote")
        timeline.to(
          card,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: 0.72,
            ease: "power3.out",
          },
          `promote+=${index * 0.08}`
        )
      })

      const backSlot = makeSlot(
        total - 1,
        cardDistance,
        verticalDistance,
        total
      )
      timeline.set(frontCard, { ...backSlot, opacity: 0 })
      timeline.to(frontCard, {
        opacity: 1,
        duration: 0.42,
        ease: "power2.out",
      })
      timeline.call(() => {
        orderRef.current = [...rest, front]
      })
    }

    const interval = window.setInterval(swap, delay)

    return () => {
      window.clearInterval(interval)
      timelineRef.current?.kill()
    }
  }, [
    cardDistance,
    delay,
    items.length,
    shouldReduceMotion,
    skewAmount,
    verticalDistance,
  ])

  const pause = () => {
    if (!pauseOnHover) return
    pausedRef.current = true
    timelineRef.current?.pause()
  }

  const resume = () => {
    if (!pauseOnHover) return
    pausedRef.current = false
    timelineRef.current?.resume()
  }

  return (
    <div
      className={cn("card-swap-container", className)}
      style={{ width, height }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocusCapture={pause}
      onBlurCapture={resume}
      aria-label="Capabilities"
    >
      {items.map((item, index) => (
        <div
          key={index}
          ref={(node) => {
            cardRefs.current[index] = node
          }}
          className="card-swap-card"
          style={{ width, height }}
          tabIndex={0}
        >
          {item}
        </div>
      ))}
    </div>
  )
}
