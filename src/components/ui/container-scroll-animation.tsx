"use client"

import * as React from "react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"

import { BorderGlow } from "@/components/ui/border-glow"
import { cn } from "@/lib/utils"

type ContainerScrollProps = {
  titleComponent: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function ContainerScroll({
  titleComponent,
  children,
  className,
}: ContainerScrollProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = React.useState(false)
  const shouldReduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)")
    const updateViewport = () => setIsMobile(mediaQuery.matches)

    updateViewport()
    mediaQuery.addEventListener("change", updateViewport)

    return () => mediaQuery.removeEventListener("change", updateViewport)
  }, [])

  const rotate = useTransform(scrollYProgress, [0.12, 0.55], [18, 0])
  const scale = useTransform(
    scrollYProgress,
    [0.12, 0.55],
    isMobile ? [0.86, 0.96] : [1.03, 1]
  )
  const translate = useTransform(scrollYProgress, [0.05, 0.52], [30, -40])

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative flex min-h-[58rem] items-center justify-center px-4 pt-24 pb-24 md:min-h-[72rem] md:px-10 md:pt-32",
        className
      )}
    >
      <div className="relative w-full [perspective:1200px]">
        <ScrollHeader
          translate={translate}
          reduceMotion={Boolean(shouldReduceMotion)}
        >
          {titleComponent}
        </ScrollHeader>
        <ScrollCard
          rotate={rotate}
          scale={scale}
          reduceMotion={Boolean(shouldReduceMotion)}
        >
          {children}
        </ScrollCard>
      </div>
    </section>
  )
}

type ScrollHeaderProps = {
  translate: MotionValue<number>
  reduceMotion: boolean
  children: React.ReactNode
}

function ScrollHeader({
  translate,
  reduceMotion,
  children,
}: ScrollHeaderProps) {
  return (
    <motion.div
      style={{ translateY: reduceMotion ? 0 : translate }}
      className="mx-auto max-w-5xl text-center"
    >
      {children}
    </motion.div>
  )
}

type ScrollCardProps = {
  rotate: MotionValue<number>
  scale: MotionValue<number>
  reduceMotion: boolean
  children: React.ReactNode
}

function ScrollCard({
  rotate,
  scale,
  reduceMotion,
  children,
}: ScrollCardProps) {
  return (
    <motion.div
      style={{
        rotateX: reduceMotion ? 0 : rotate,
        scale: reduceMotion ? 1 : scale,
        boxShadow:
          "0 12px 20px rgb(0 0 0 / 0.28), 0 40px 60px rgb(0 0 0 / 0.24), 0 90px 100px rgb(0 0 0 / 0.16)",
      }}
      className="mx-auto mt-10 h-[32rem] w-full max-w-4xl rounded-[1.75rem] border border-white/14 bg-[#202124] p-2 shadow-2xl md:h-[42rem] md:p-4"
    >
      <BorderGlow
        className="size-full"
        glowColor="255 90 54"
        backgroundColor="#0f1012"
        borderRadius={22}
        glowRadius={190}
        glowIntensity={0.82}
      >
        {children}
      </BorderGlow>
    </motion.div>
  )
}
