import { ContainerScroll } from "./ui/container-scroll-animation";

export default function EngineeringExcellence() {
  return (
    <div className="flex justify-center overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-white">
              Engineering Excellence with <br />
              <span className="text-4xl md:text-7xl font-light mt-1 leading-none bg-purple-700  text-transparent bg-clip-text">
                Modern Web Technologies
              </span>
            </h1>
            <p className="text-gray-400 mt-4 text-lg max-w-2xl mx-auto">
              Building scalable, performant, and maintainable web applications with the latest technologies.
            </p>
          </div>
        }
      >
        <img
          src='/Images/js.png'
          alt="Code example"
          className="mx-auto rounded-2xl object-contain h-full w-full "
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}