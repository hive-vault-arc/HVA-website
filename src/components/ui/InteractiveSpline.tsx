'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SplineScene } from './spline'
import { useAnimationQuality } from '../../lib/animationQuality'

interface InteractiveSplineProps {
  sceneUrl: string
  className?: string
  children?: React.ReactNode
  cursorSensitivity?: number
}

export function InteractiveSpline({ 
  sceneUrl,
  className,
  children,
  cursorSensitivity = 0.15
}: InteractiveSplineProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(true)
  const [isPageVisible, setIsPageVisible] = useState(
    typeof document === 'undefined' ? true : document.visibilityState === 'visible'
  )
  const [isSceneMounted, setIsSceneMounted] = useState(true)

  const {
    splineEnabled,
    splineMouseSensitivity,
    splineMouseUpdateIntervalMs,
    splineInteractive
  } = useAnimationQuality()

  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 100 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)
  const isActive = isInView && isPageVisible

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return
    const onVisibilityChange = () => setIsPageVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  useEffect(() => {
    if (isActive && splineEnabled) {
      setIsSceneMounted(true)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setIsSceneMounted(false)
    }, 350)

    return () => window.clearTimeout(timeoutId)
  }, [isActive, splineEnabled])

  useEffect(() => {
    if (!isActive || !splineInteractive || !splineEnabled) {
      cursorX.set(0)
      cursorY.set(0)
      return
    }

    const pendingPosRef = { x: 0, y: 0, hasValue: false }
    let rafId: number | null = null
    let lastApplied = 0

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate position as percentage (-0.5 to 0.5)
      const x = ((clientX / innerWidth) - 0.5) * 2
      const y = ((clientY / innerHeight) - 0.5) * 2

      pendingPosRef.x = x
      pendingPosRef.y = y
      pendingPosRef.hasValue = true

      if (rafId !== null) return

      const flushMouse = (timestamp: number) => {
        const elapsed = timestamp - lastApplied
        if (elapsed < splineMouseUpdateIntervalMs) {
          rafId = requestAnimationFrame(flushMouse)
          return
        }

        lastApplied = timestamp
        rafId = null
        if (!pendingPosRef.hasValue) return

        const sensitivity = cursorSensitivity * splineMouseSensitivity
        cursorX.set(pendingPosRef.x * sensitivity * 50)
        cursorY.set(pendingPosRef.y * sensitivity * 50)
        pendingPosRef.hasValue = false
      }

      rafId = requestAnimationFrame(flushMouse)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [
    cursorSensitivity,
    cursorX,
    cursorY,
    isActive,
    splineInteractive,
    splineEnabled,
    splineMouseSensitivity,
    splineMouseUpdateIntervalMs
  ])

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative w-full h-screen overflow-hidden",
        "pointer-events-auto", // Ensure this element receives pointer events
        className
      )}
      style={{ position: 'relative', zIndex: 1 }} // Ensure proper stacking context
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{
          x: springX,
          y: springY,
          scale: 1.06,
          willChange: 'transform' // Optimize for animations
        }}
      >
        {isSceneMounted && splineEnabled ? (
          <SplineScene
            scene={sceneUrl}
            className="w-full h-full"
            renderOnDemand
          />
        ) : (
          <div className="w-full h-full bg-[linear-gradient(180deg,#F5F6FA_0%,#ECF5FD_100%)]" aria-hidden="true" />
        )}
        <div 
          className="absolute inset-0" 
          style={{
           
            pointerEvents: 'none' // Allow clicks to pass through the overlay
          }} 
        />
      </motion.div>
      
      {/* Content */}
      <div 
        className="relative z-10 h-full flex items-center justify-center"
        style={{ pointerEvents: 'none' }} // Allow clicks to pass through to the background
      >
        <div style={{ pointerEvents: 'auto' }}> {/* Re-enable pointer events for interactive elements */}
          {children}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
