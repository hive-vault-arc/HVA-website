// src/components/hero-3d-background.tsx
'use client'

import { SplineScene } from "../components/ui/spline"
import { cn } from "../lib/utils"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useEffect } from "react"

interface Hero3DBackgroundProps {
  sceneUrl: string
  className?: string
  children?: React.ReactNode
  cursorSensitivity?: number
}

export function Hero3DBackground({ 
  sceneUrl,
  className,
  children,
  cursorSensitivity = 0.1
}: Hero3DBackgroundProps) {
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 100 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate position as percentage (-0.5 to 0.5)
      const x = ((clientX / innerWidth) - 0.5) * 2
      const y = ((clientY / innerHeight) - 0.5) * 2
      
      cursorX.set(x * cursorSensitivity)
      cursorY.set(y * cursorSensitivity)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorSensitivity, cursorX, cursorY])

  return (
    <div className={cn("relative h-[100dvh] w-full overflow-hidden", className)}>
      {/* 3D Background with Parallax Effect */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          x: springX,
          y: springY,
          scale: 1.1 // Slight zoom to prevent edges from showing
        }}
      >
        <SplineScene 
          scene={sceneUrl}
          className="w-full h-full"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 " />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
