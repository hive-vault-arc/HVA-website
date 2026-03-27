import { ContainerScroll } from "./ui/container-scroll-animation";

export default function EngineeringExcellence() {
  return (
    <div className="flex justify-center overflow-hidden w-full">
      <ContainerScroll
        titleComponent={
          <div className="text-center w-full px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white">
              Engineering Excellence with <br />
              <span className="text-3xl sm:text-5xl md:text-7xl font-light mt-1 leading-tight md:leading-none bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                Modern Web Technologies
              </span>
            </h1>
            <p className="text-gray-400 mt-3 sm:mt-4 text-base sm:text-lg max-w-4xl mx-auto">
              Building scalable, performant, and maintainable web applications with the latest technologies.
            </p>
          </div>
        }
      >
        <img
          src='/Images/ai-analytics-dashboard-business.jpg'
          alt="AI analytics dashboard built by H.V.A for business intelligence"
          className="mx-auto rounded-2xl object-contain h-full w-full"
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}