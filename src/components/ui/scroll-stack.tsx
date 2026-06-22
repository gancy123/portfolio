"use client"

import * as React from "react"
import Lenis from "lenis"

import { cn } from "@/lib/utils"

type ScrollStackProps = {
  children: React.ReactNode
  className?: string
  itemDistance?: number
  itemScale?: number
  itemStackDistance?: number
  stackPosition?: string | number
  scaleEndPosition?: string | number
  baseScale?: number
  scaleDuration?: number
  rotationAmount?: number
  blurAmount?: number
  useWindowScroll?: boolean
  disabled?: boolean
  disableBelow?: number
  onActiveIndexChange?: (index: number) => void
  onStackComplete?: () => void
}

type ScrollStackItemProps = {
  children: React.ReactNode
  className?: string
}

type CardTransform = {
  translateY: number
  scale: number
  rotation: number
  blur: number
}

export function ScrollStackItem({
  children,
  className,
}: ScrollStackItemProps) {
  return <div className={cn("scroll-stack-card", className)}>{children}</div>
}

function parseOffset(value: string | number, height: number) {
  if (typeof value === "string" && value.includes("%")) {
    return (Number.parseFloat(value) / 100) * height
  }

  return Number.parseFloat(String(value))
}

function progressBetween(value: number, start: number, end: number) {
  if (value <= start) return 0
  if (value >= end) return 1
  return (value - start) / Math.max(1, end - start)
}

export function ScrollStack({
  children,
  className,
  itemDistance = 64,
  itemScale = 0.02,
  itemStackDistance = 22,
  stackPosition = "16%",
  scaleEndPosition = "8%",
  baseScale = 0.92,
  scaleDuration = 0.22,
  rotationAmount = 0,
  blurAmount = 0,
  useWindowScroll = true,
  disabled = false,
  disableBelow = 900,
  onActiveIndexChange,
  onStackComplete,
}: ScrollStackProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const frameRef = React.useRef<number | null>(null)
  const lenisRef = React.useRef<Lenis | null>(null)
  const transformsRef = React.useRef(new Map<number, CardTransform>())
  const activeIndexRef = React.useRef(0)
  const completedRef = React.useRef(false)
  const [motionDisabled, setMotionDisabled] = React.useState(true)

  React.useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const compactViewport = window.matchMedia(`(max-width: ${disableBelow - 1}px)`)

    const update = () => {
      setMotionDisabled(
        disabled || reducedMotion.matches || compactViewport.matches,
      )
    }

    update()
    reducedMotion.addEventListener("change", update)
    compactViewport.addEventListener("change", update)

    return () => {
      reducedMotion.removeEventListener("change", update)
      compactViewport.removeEventListener("change", update)
    }
  }, [disableBelow, disabled])

  React.useLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return
    const transformsCache = transformsRef.current

    const cards = Array.from(
      root.querySelectorAll<HTMLElement>(".scroll-stack-card"),
    )
    const endMarker = root.querySelector<HTMLElement>(".scroll-stack-end")

    cards.forEach((card, index) => {
      card.style.marginBottom = index < cards.length - 1 ? `${itemDistance}px` : "0"
      card.style.transformOrigin = "top center"
      card.style.transition = motionDisabled
        ? "none"
        : `filter ${scaleDuration}s ease-out`
      card.style.willChange = motionDisabled ? "auto" : "transform, filter"
      card.style.transform = ""
      card.style.filter = ""
    })

    if (motionDisabled || cards.length < 2 || !endMarker) {
      activeIndexRef.current = 0
      onActiveIndexChange?.(0)
      return
    }

    const getScrollTop = () =>
      useWindowScroll ? window.scrollY : root.scrollTop
    const getViewportHeight = () =>
      useWindowScroll ? window.innerHeight : root.clientHeight
    const getOffsetTop = (element: HTMLElement) => {
      if (useWindowScroll) {
        return element.getBoundingClientRect().top + window.scrollY
      }
      return element.offsetTop
    }

    const updateTransforms = () => {
      const scrollTop = getScrollTop()
      const viewportHeight = getViewportHeight()
      const stackPositionPx = parseOffset(stackPosition, viewportHeight)
      const scaleEndPx = parseOffset(scaleEndPosition, viewportHeight)
      const endTop = getOffsetTop(endMarker)
      let activeIndex = 0

      cards.forEach((card, index) => {
        const cardTop = getOffsetTop(card)
        const triggerStart =
          cardTop - stackPositionPx - itemStackDistance * index
        const triggerEnd = cardTop - scaleEndPx
        const pinEnd = endTop - viewportHeight * 0.52
        const scaleProgress = progressBetween(
          scrollTop,
          triggerStart,
          triggerEnd,
        )
        const targetScale = baseScale + index * itemScale
        const scale = 1 - scaleProgress * (1 - targetScale)
        const rotation = index * rotationAmount * scaleProgress
        const isPinned = scrollTop >= triggerStart && scrollTop <= pinEnd
        const translateY = isPinned
          ? scrollTop - cardTop + stackPositionPx + itemStackDistance * index
          : scrollTop > pinEnd
            ? pinEnd - cardTop + stackPositionPx + itemStackDistance * index
            : 0

        if (scrollTop >= triggerStart) activeIndex = index

        const blur =
          blurAmount > 0 && index < activeIndex
            ? (activeIndex - index) * blurAmount
            : 0
        const nextTransform: CardTransform = {
          translateY: Math.round(translateY * 100) / 100,
          scale: Math.round(scale * 1000) / 1000,
          rotation: Math.round(rotation * 100) / 100,
          blur: Math.round(blur * 100) / 100,
        }
        const previous = transformsCache.get(index)
        const changed =
          !previous ||
          Math.abs(previous.translateY - nextTransform.translateY) > 0.1 ||
          Math.abs(previous.scale - nextTransform.scale) > 0.001 ||
          Math.abs(previous.rotation - nextTransform.rotation) > 0.1 ||
          Math.abs(previous.blur - nextTransform.blur) > 0.1

        if (changed) {
          card.style.transform = `translate3d(0, ${nextTransform.translateY}px, 0) scale(${nextTransform.scale}) rotate(${nextTransform.rotation}deg)`
          card.style.filter = nextTransform.blur
            ? `blur(${nextTransform.blur}px)`
            : ""
          card.style.zIndex = String(index + 1)
          transformsCache.set(index, nextTransform)
        }
      })

      if (activeIndex !== activeIndexRef.current) {
        activeIndexRef.current = activeIndex
        onActiveIndexChange?.(activeIndex)
      }

      const finalCardTop = getOffsetTop(cards[cards.length - 1])
      const finalTrigger =
        finalCardTop - stackPositionPx - itemStackDistance * (cards.length - 1)
      const complete = scrollTop >= finalTrigger
      if (complete && !completedRef.current) {
        completedRef.current = true
        onStackComplete?.()
      } else if (!complete) {
        completedRef.current = false
      }
    }

    if (useWindowScroll) {
      const lenis = new Lenis({
        duration: 1.05,
        smoothWheel: true,
        syncTouch: false,
        wheelMultiplier: 1,
        lerp: 0.12,
      })
      lenis.on("scroll", updateTransforms)
      lenisRef.current = lenis

      const animate = (time: number) => {
        lenis.raf(time)
        frameRef.current = window.requestAnimationFrame(animate)
      }
      frameRef.current = window.requestAnimationFrame(animate)
    } else {
      root.addEventListener("scroll", updateTransforms, { passive: true })
    }

    window.addEventListener("resize", updateTransforms)
    updateTransforms()

    return () => {
      window.removeEventListener("resize", updateTransforms)
      root.removeEventListener("scroll", updateTransforms)
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current)
      lenisRef.current?.destroy()
      lenisRef.current = null
      transformsCache.clear()
      cards.forEach((card) => {
        card.style.transform = ""
        card.style.filter = ""
        card.style.willChange = "auto"
      })
    }
  }, [
    baseScale,
    blurAmount,
    itemDistance,
    itemScale,
    itemStackDistance,
    motionDisabled,
    onActiveIndexChange,
    onStackComplete,
    rotationAmount,
    scaleDuration,
    scaleEndPosition,
    stackPosition,
    useWindowScroll,
  ])

  return (
    <div
      ref={rootRef}
      className={cn("scroll-stack", className)}
      data-disabled={motionDisabled || undefined}
      data-window-scroll={useWindowScroll || undefined}
    >
      <div className="scroll-stack-inner">
        {children}
        <div className="scroll-stack-end" aria-hidden="true" />
      </div>
    </div>
  )
}
