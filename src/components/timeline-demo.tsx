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
      icon: <Lightbulb className="w-5 h-5 text-purple-400" />,
      content: (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-purple-500/30 transition-all duration-300 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Lightbulb className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-200">Concept Development</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              We transform your vision into actionable strategies through comprehensive market analysis and user research, ensuring we build solutions that truly resonate with your audience.
            </p>
            <div className="space-y-3">
              {[
                { icon: <Users className="w-4 h-4" />, text: "User Research & Analysis" },
                { icon: <BarChart3 className="w-4 h-4" />, text: "Market Validation" },
                { icon: <Zap className="w-4 h-4" />, text: "Proof of Concept" },
                { icon: <Layers className="w-4 h-4" />, text: "MVP Planning" }
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-3 p-3 rounded-lg bg-neutral-900/50 hover:bg-neutral-800/50 transition-colors duration-200 group-hover:translate-x-1"
                >
                  <div className="p-1.5 bg-purple-500/10 rounded-md text-purple-400">
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
      icon: <Code className="w-5 h-5 text-blue-400" />,
      content: (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
          <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-blue-500/30 transition-all duration-300 h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Code className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-200">Engineering Excellence</h3>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Our expert team builds robust, scalable solutions using cutting-edge technologies and best practices to bring your product to life with clean, maintainable code.
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <Cpu className="w-4 h-4" />, text: "Microservices" },
                { icon: <GitBranch className="w-4 h-4" />, text: "CI/CD Pipelines" },
                { icon: <Layers className="w-4 h-4" />, text: "Containerization" },
                { icon: <Cloud className="w-4 h-4" />, text: "Cloud Native" }
              ].map((item, i) => (
                <div 
                  key={i}
                  className="flex items-center gap-2 p-3 rounded-lg bg-neutral-900/50 hover:bg-blue-900/20 transition-colors duration-200 group-hover:scale-[1.02]"
                >
                  <div className="p-1.5 bg-blue-500/10 rounded-md text-blue-400">
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
  icon: <Rocket className="w-5 h-5 text-pink-400" />,
  content: (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 to-rose-500/30 rounded-xl opacity-0 group-hover:opacity-100 blur-lg transition-all duration-500" />
      <div className="relative bg-gradient-to-br from-neutral-900/80 to-neutral-950/80 backdrop-blur-sm p-6 rounded-xl border border-neutral-800 hover:border-pink-500/30 transition-all duration-300 h-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-500/10 rounded-lg">
            <Rocket className="w-5 h-5 text-pink-400" />
          </div>
          <h3 className="text-lg font-medium text-neutral-200">Scale & Optimize</h3>
        </div>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6">
          We help you scale your product efficiently while maintaining performance and user experience, with data-driven optimizations and growth strategies.
        </p>
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-pink-400 flex items-center gap-2">
               <div className="p-2 bg-pink-500/10 rounded-lg">
            <Gauge className="w-5 h-5 text-pink-400" />
          </div>
               Performance & Infrastructure
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
              Optimized cloud architecture with auto-scaling and CDN integration
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-pink-400 flex items-center gap-2">
               <div className="p-2 bg-pink-500/10 rounded-lg">
            <ChartArea className="w-5 h-5 text-pink-400" />
          </div>
               Data & Analytics
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
              Actionable insights through advanced analytics and A/B testing
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-pink-400 flex items-center gap-2">
                <div className="p-2 bg-pink-500/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-pink-400" />
          </div>
                Growth Strategy
            </h4>
            <p className="text-xs text-neutral-400 pl-6">
              Data-driven growth initiatives and conversion optimization
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