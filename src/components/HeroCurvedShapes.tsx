import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export type HeroCurvedShapeItem = {
  label: string;
  value: string;
  height: number;
  width?: number;
  tone?: 'blue' | 'teal' | 'violet';
};

type HeroCurvedShapesProps = {
  items: HeroCurvedShapeItem[];
  badgeText?: string;
  className?: string;
};

const tones: Record<NonNullable<HeroCurvedShapeItem['tone']>, { top: string; bottom: string }> = {
  blue: { top: 'rgba(83, 164, 255, 0.14)', bottom: 'rgba(52, 121, 212, 0.82)' },
  teal: { top: 'rgba(103, 237, 231, 0.12)', bottom: 'rgba(21, 166, 162, 0.74)' },
  violet: { top: 'rgba(173, 129, 255, 0.13)', bottom: 'rgba(117, 84, 221, 0.78)' },
};

const HeroCurvedShapes: React.FC<HeroCurvedShapesProps> = ({ items, badgeText, className }) => {
  return (
    <div className={cn('relative min-h-[255px] md:min-h-[305px]', className)}>
      <div className="pointer-events-none absolute -left-4 top-10 h-28 w-40 rounded-full bg-white/26 blur-3xl" />
      <div className="pointer-events-none absolute -right-8 bottom-12 h-32 w-32 rounded-full bg-[#0984E3]/22 blur-3xl" />
      <div className="pointer-events-none absolute right-14 top-16 h-20 w-20 rounded-full bg-[#00CEC9]/16 blur-3xl" />

      {badgeText ? (
        <div className="absolute right-1 top-5 z-30 inline-flex items-center gap-2 rounded-full bg-white/54 px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] text-[#1E272E]/55 backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-[#0984E3]" />
          <span>{badgeText}</span>
        </div>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-end gap-3 md:gap-4">
        {items.map((item, index) => {
          const tone = tones[item.tone ?? 'blue'];
          return (
            <motion.div
              key={`${item.label}-${item.value}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08 * index }}
              className="relative overflow-hidden rounded-[999px] shadow-[0_20px_34px_rgba(9,132,227,0.16)]"
              style={{ height: item.height, width: item.width ?? 106 }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(180deg, ${tone.top} 0%, ${tone.bottom} 100%)`,
                }}
              />
              <div className="absolute left-1/2 top-4 h-9 w-9 -translate-x-1/2 rounded-full bg-white/18 blur-[1px]" />
              <div className="absolute inset-x-0 top-0 h-[48%] bg-gradient-to-b from-[#F5F6FA] via-[#F5F6FA]/90 to-transparent" />
              <div className="absolute inset-x-2 bottom-2 h-[32%] rounded-[999px] bg-black/8 blur-sm" />
              <div className="absolute inset-x-4 bottom-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/82">{item.label}</p>
                <p className="mt-0.5 text-base font-semibold leading-none text-white">{item.value}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-x-1 top-0 z-30 h-16 rounded-full bg-gradient-to-b from-[#F5F6FA]/88 to-transparent" />
    </div>
  );
};

export default HeroCurvedShapes;
