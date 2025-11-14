import React from 'react';
import { FullScreenScrollFX } from './full-screen-scroll-fx';

const sections = [
  {
    leftLabel: "Innovation",
    title: "Cutting-Edge Solutions",
    rightLabel: "Web Development",
    background: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
  },
  {
    leftLabel: "Design",
    title: "Beautiful Interfaces",
    rightLabel: "UI/UX Excellence",
    background: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80",
  },
  {
    leftLabel: "Performance",
    title: "Lightning Fast",
    rightLabel: "Optimized Code",
    background: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1546&q=80",
  },
  {
    leftLabel: "Strategy",
    title: "Data-Driven",
    rightLabel: "Results Focused",
    background: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  },
];

export function FullScreenScrollDemo() {
  return (
    <div className="w-full">
      <FullScreenScrollFX
        sections={sections}
        header={<><div>Our</div><div>Expertise</div></>}
        footer={<div>Scroll to explore</div>}
        showProgress
        durations={{ change: 0.7, snap: 800 }}
        colors={{
          text: "rgba(255,255,255,0.92)",
          overlay: "rgba(0,0,0,0.5)",
          pageBg: "#0f172a",
          stageBg: "#1e293b"
        }}
      />
    </div>
  );
}
