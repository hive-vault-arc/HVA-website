"use client";
import {
  useScroll,
  useTransform,
  motion,
  Variants, // Polish: Import MotionValue type for clarity
} from "framer-motion";
import React, { useLayoutEffect, useRef, useState } from "react";
// Polish: Removed unused imports: useMotionValueEvent, LightRays

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon:React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: (i: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { 
      delay: i * 0.1, 
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    } 
  })
};

const dotVariants: Variants = {
  hidden: { 
    scale: 0.5, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 200, 
      damping: 12 
    } 
  }
};

  // Polish: Swapped to useLayoutEffect for DOM measurements before paint.
  // This now uses a ResizeObserver to robustly track the content's height,
  // ensuring the animation is accurate even if window size or content changes.
  useLayoutEffect(() => {
    const contentEl = contentRef.current;
    if (!contentEl) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContentHeight(entry.contentRect.height);
      }
    });

    resizeObserver.observe(contentEl);

    return () => resizeObserver.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Polish: Adjusted offset for a more natural animation feel.
    // Starts when the container top is 25% down the screen.
    // Ends when the container bottom is 75% down the screen.
    offset: ["start 25%", "end 75%"],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, contentHeight]
  );

  // Polish: This was unused, but now it's correctly applied below.
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

 // In timeline.tsx - Update the return statement
return (
  <div className="relative w-full overflow-hidden">
    <div
      className="w-full bg-gradient-to-b from-black via-black to-neutral-950 font-sans"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-16 px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-8xl font-semibold mb-4 text-neutral-100 max-w-4xl">
            Our <span className="text-white">Approach</span>
          </h2>
          <p className="text-neutral-400 text-base md:text-lg max-w-lg">
             A clear, structured, and efficient process designed to deliver exceptional results.
          </p>
        </motion.div>
      </div>

      <div ref={contentRef} className="relative max-w-7xl mx-auto pb-32">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-8 group"
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <motion.div
                className="h-10 w-10 absolute left-8 -translate-x-1/2 rounded-full bg-black flex items-center justify-center border-2 border-purple-500"
                variants={dotVariants}
              >
                <motion.div 
                  className="h-3 w-3 rounded-full bg-purple-500"
                  whileHover={{ scale: 1.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                />
              </motion.div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-light text-neutral-200 group-hover:text-purple-300 transition-colors duration-300">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full group">
              <h3 className="md:hidden block text-2xl mb-6 text-left font-light text-neutral-200">
                {item.title}
              </h3>
              <motion.div 
                className="relative z-10"
                whileHover={{ 
                  x: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute top-0 w-[2px] bg-gradient-to-b from-transparent via-purple-500/30 to-transparent left-8 -translate-x-1/2 h-full"
          style={{
            height: contentHeight > 0 ? contentHeight : "100vh",
          }}
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="w-full bg-gradient-to-b from-purple-500 via-purple-500 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  </div>
);
};
