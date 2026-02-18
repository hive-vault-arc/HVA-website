"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  // Increased rotation range and adjusted scroll progression for a longer effect
  const rotate = useTransform(scrollYProgress, [0, 0.8], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.8], [0, -200]);

  return (
    <div
      className="h-[50rem] sm:h-[60rem] md:h-[70rem] flex items-start md:items-center justify-center relative p-2 sm:p-4 md:p-8 lg:p-20 pt-48 sm:pt-24 md:pt-28"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "700px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale} isMobile={isMobile}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  isMobile = false,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
  isMobile?: boolean;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
      }}
      className={`max-w-5xl mx-auto w-full rounded-3xl shadow-2xl ${
        isMobile ? 'h-[20rem] mt-0' : 'h-[35rem] md:h-[45rem] mt-12 md:mt-16'
      }`}
    >
      <div className="h-full w-full overflow-hidden rounded-2xl p-2 sm:p-3 md:p-4">
        {children}
      </div>
    </motion.div>
  );
};
