// In timeline-demo.tsx
import { 
  Lightbulb, 
  Code, 
  BarChart3, 
  Users, 
  Zap, 
  Layers,
  Cpu,
  GitBranch,
  Cloud,
  Rocket,
  Gauge,
  TrendingUp,
} from 'lucide-react';
import { Timeline, TimelineEntry } from './ui/timeline';
import { ChartArea } from 'dicons';

export function TimelineDemo() {
  const timelineData: TimelineEntry[] = [
    {
      title: "Idea & Validation",
      icon: <Lightbulb className="w-5 h-5 text-primary" />,
      content: (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-primary/30 transition-all duration-300 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-neutral-200">Idea & Validation</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              We turn raw ideas into strategic, validated concepts. Through research,
                market alignment, and rapid experimentation, we ensure your product is
                viable before a single line of code is written.
            </p>
            <div className="space-y-3">
              {[
                { icon: <Users className="w-4 h-4" />, text: "User Research & Persona Analysis" },
                { icon: <BarChart3 className="w-4 h-4" />, text: "Market & Competitor Validation" },
                { icon: <Zap className="w-4 h-4" />, text: "Rapid Prototyping & Proof of Concept" },
                { icon: <Layers className="w-4 h-4" />, text: "MVP Roadmapping & Feature Prioritization" }

              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-200 group-hover:translate-x-1"
                >
                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                    {item.icon}
                  </div>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Product Development",
      icon: <Code className="w-5 h-5 text-primary" />,
      content: (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-primary/30 transition-all duration-300 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Code className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-neutral-200">Product Development</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              We engineer scalable, high-performance software using modern architectures
              and industry best practices. Every component is designed for reliability,
              maintainability, and long-term growth.
            </p>
            <div className="grid grid-cols-2 gap-3">
               {[
                { icon: <Cpu className="w-4 h-4" />, text: "Microservices & Modular Architecture" },
                { icon: <GitBranch className="w-4 h-4" />, text: "Automated CI/CD & GitOps" },
                { icon: <Layers className="w-4 h-4" />, text: "Docker & Container Orchestration" },
                { icon: <Cloud className="w-4 h-4" />, text: "Cloud-Native Infrastructure" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-primary/10 transition-colors duration-200 group-hover:scale-[1.02]"
                >
                  <div className="p-1.5 bg-primary/10 rounded-md text-primary">
                    {item.icon}
                  </div>
                  <span className="text-sm text-neutral-300 group-hover:text-white">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
  title: "Growth & Scaling",
  icon: <Rocket className="w-5 h-5 text-primary" />,
  content: (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 to-primary-400/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
      <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-primary/30 transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-medium text-neutral-200">Growth & Scaling</h3>
        </div>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
           Once your product is live, we help you scale seamlessly. From performance
           optimization to data-driven growth strategies, we make sure your product
           accelerates—not breaks—under increasing demand.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary flex items-center gap-2">
               <div className="p-2 bg-primary/10 rounded-lg">
            <Gauge className="w-5 h-5 text-primary" />
          </div>
              Performance & Infrastructure
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
              Auto-scaling cloud setups, performance tuning, and zero-downtime deployments.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary flex items-center gap-2">
               <div className="p-2 bg-primary/10 rounded-lg">
            <ChartArea className="w-5 h-5 text-primary" />
          </div>
               Data & Analytics
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
              Product analytics, user behavior insights, and A/B testing for continuous improvement.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
                Growth Strategy
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
               Conversion optimization, lifecycle improvements, and scalable GTM systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}
  ];

  return <Timeline data={timelineData} />;
}