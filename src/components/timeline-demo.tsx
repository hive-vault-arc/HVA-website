import React from "react";
import { Timeline, TimelineEntry } from "./ui/timeline";

export function TimelineDemo() {
  const timelineData: TimelineEntry[] = [
    {
      title: "Idea & Validation",
      content: (
        <div>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
            Transforming ideas into validated product concepts through market research and user interviews.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Idea Validation"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Market Research"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Product Development",
      content: (
        <div>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
            Building scalable and secure cloud infrastructure with modern tech stack and best practices.
          </p>
          <div className="mb-8">
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2 group">
              <div className="w-2 h-2 rounded-full bg-purple-700 group-hover:scale-125 transition-transform"></div>
              Microservices Architecture
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2 group">
              <div className="w-2 h-2 rounded-full bg-purple-700 group-hover:scale-125 transition-transform"></div>
              CI/CD Pipeline Automation
            </div>
            <div className="flex gap-3 items-center text-neutral-700 dark:text-neutral-300 text-sm md:text-base mb-2 group">
              <div className="w-2 h-2 rounded-full bg-purple-700 group-hover:scale-125 transition-transform"></div>
              Containerization & Orchestration
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Development"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1420&q=80"
              alt="Code"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Growth & Scaling",
      content: (
        <div>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base font-normal mb-6">
            Driving user acquisition, engagement, and retention through data-driven strategies and optimization.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Analytics Dashboard"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
            <img
              src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Growth Metrics"
              className="rounded-xl object-cover h-32 md:h-48 lg:h-64 w-full shadow-lg border border-gray-200 dark:border-gray-800 hover:border-purple-700 transition-all duration-300"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={timelineData} />
    </div>
  );
}
