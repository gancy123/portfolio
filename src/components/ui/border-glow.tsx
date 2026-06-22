"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

type BorderGlowProps = {
  children: React.ReactNode
  className?: string
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
}

type GlowStyle = React.CSSProperties & {
  "--border-glow-color": string
  "--border-glow-bg": string
  "--border-glow-radius": string
  "--border-glow-size": string
  "--border-glow-intensity": number
  "--border-glow-x": string
  "--border-glow-y": string
  "--border-glow-opacity": number
}

export function BorderGlow({
  children,
  className,
  glowColor = "255 90 54",
  backgroundColor = "#0f1012",
  borderRadius = 22,
  glowRadius = 180,
  glowIntensity = 0.9,
}: BorderGlowProps) {
  const cardRef = React.useRef<HTMLDivElement>(null)

  const setGlowOpacity = (opacity: number) => {
    cardRef.current?.style.setProperty("--border-glow-opacity", `${opacity}`)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const bounds = card.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width) * 100
    const y = ((event.clientY - bounds.top) / bounds.height) * 100

    card.style.setProperty("--border-glow-x", `${x.toFixed(2)}%`)
    card.style.setProperty("--border-glow-y", `${y.toFixed(2)}%`)
    setGlowOpacity(1)
  }

  const style: GlowStyle = {
    "--border-glow-color": glowColor,
    "--border-glow-bg": backgroundColor,
    "--border-glow-radius": `${borderRadius}px`,
    "--border-glow-size": `${glowRadius}px`,
    "--border-glow-intensity": glowIntensity,
    "--border-glow-x": "50%",
    "--border-glow-y": "50%",
    "--border-glow-opacity": 0,
  }

  return (
    <div
      ref={cardRef}
      data-border-glow="true"
      className={cn("border-glow-card", className)}
      style={style}
      onPointerEnter={() => setGlowOpacity(1)}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setGlowOpacity(0)}
    >
      <div className="border-glow-inner">{children}</div>
    </div>
  )
}
