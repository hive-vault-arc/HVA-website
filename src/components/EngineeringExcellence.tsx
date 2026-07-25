import Image from 'next/image';
import { ContainerScroll } from "./ui/container-scroll-animation";

export default function EngineeringExcellence() {
  return (
    <div className="flex justify-center overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center w-full px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
              Engineering Excellence with <br />
              <span className="text-3xl sm:text-5xl md:text-7xl font-light mt-1 leading-tight md:leading-none bg-gradient-to-r from-[#E8A838] to-[#F0C15A] text-transparent bg-clip-text">
                Modern Web Technologies
              </span>
            </h1>
            <p className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg max-w-4xl mx-auto">
              Building scalable, performant, and maintainable web applications with the latest technologies.
            </p>
          </div>
        }
      >
        <div className="relative mx-auto h-full w-full overflow-hidden rounded-2xl">
          <Image
            src="/Images/brand/ai-analytics-dashboard-business.webp"
            alt="AI analytics dashboard built by Hive Vault Arc for business intelligence"
            fill
            className="object-contain"
            sizes="(max-width: 1024px) 100vw, 80vw"
            draggable={false}
          />
        </div>
      </ContainerScroll>
    </div>
  );
}
