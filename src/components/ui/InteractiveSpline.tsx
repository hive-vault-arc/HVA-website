'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'
import { SplineScene } from './spline'

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
      
      cursorX.set(x * cursorSensitivity * 50) // Increased multiplier for more noticeable effect
      cursorY.set(y * cursorSensitivity * 50)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [cursorSensitivity, cursorX, cursorY])

  return (
    <div 
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
          scale: 1.1,
          willChange: 'transform' // Optimize for animations
        }}
      >
        <SplineScene 
          scene={sceneUrl}
          className="w-full h-full"
        />
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