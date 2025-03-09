"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FirstSliderImage from "../assets/first-slider-image.jpg";
import SecondSliderImage from "../assets/second-slider-image.jpg";
import ThirdSliderImage from "../assets/third-slider-image.jpg";
import FourthSliderImage from "../assets/fourth-slider-image.jpg";
import FifthSliderImage from "../assets/fifth-slider-image.jpg";
import Thumb from "../assets/thumb.svg";
import Thumb2 from "../assets/thumb2.png";
import Thumb3 from "../assets/thumb3.svg";
import Thumb4 from "../assets/thumb4.svg";
import Thumb5 from "../assets/thumb5.svg";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(2);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const slides = [
    { image: FirstSliderImage, thumb: Thumb, borderColor: "#FFDE59" },
    { image: SecondSliderImage, thumb: Thumb2, borderColor: "#FF85A2" },
    { image: ThirdSliderImage, thumb: Thumb3, borderColor: "#FFDE59" },
    { image: FourthSliderImage, thumb: Thumb4, borderColor: "#FF85A2" },
    { image: FifthSliderImage, thumb: Thumb5, borderColor: "#FFDE59" },
  ];

  return (
    <motion.div
      className="h-screen overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide].image}
          alt="image"
          className="h-full w-full"
          style={{
            objectFit: "cover",
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Text content */}
      <motion.div
        className="w-full text-[48px] pl-[50px] leading-[110%] font-normal text-white absolute top-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h1 className="pl-[18px]">Partagez vos</h1>
        <motion.h1
          className="font-bold bg-[#FFFFFF] text-[#4663AC] rounded-[18px] px-[18px] w-fit"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
        >
          moments inoubliables
        </motion.h1>
        <h1 className="pl-[18px]">avec nous</h1>
      </motion.div>

      {/* Navigation container - responsive positioning */}
      <div
        className={`absolute z-20 ${
          isMobile
            ? "bottom-[4%] left-0 w-full flex justify-center items-center"
            : "top-[40%] right-0 w-full flex justify-end items-center"
        }`}
      >
        <div
          className={`relative ${
            isMobile
              ? "h-[120px] w-full max-w-[90vw] px-4"
              : "h-[180px] w-full max-w-[400px]"
          } flex items-center justify-center`}
        >
          {slides.map((slide, index) => {
            // Calculate positions differently for mobile and desktop
            let x, y, angle, radians;

            if (isMobile) {
              // For mobile: horizontal layout
              const spacing = 65; // Spacing between items
              const centerOffset = (currentSlide - index) * spacing;
              x = -centerOffset;
              y = Math.abs(centerOffset) * 0.5; // Slight vertical offset for depth
              angle = 0;
              radians = 0;
            } else {
              // For desktop: semi-circular layout (existing logic)
              const itemCount = slides.length;
              const angleStep = 180 / (itemCount - 1);
              const angleOffset = (currentSlide - index) * angleStep;
              angle = 90 + angleOffset;
              angle = Math.max(0, Math.min(180, angle));
              radians = (angle * Math.PI) / 180;
              const radius = 280;
              const xOffset = 150;
              x = -Math.abs(Math.sin(radians) * radius) + xOffset;
              y = Math.cos(radians) * radius;
            }

            const isSelected = currentSlide === index;
            const baseSize = isMobile ? 60 : 120;
            const selectedSize = baseSize * (isMobile ? 1.3 : 1.6);
            const size = isSelected ? selectedSize : baseSize;
            const zIndex = isSelected ? 30 : 20;

            return (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  x: x,
                  y: y,
                  top: isMobile ? "50%" : "50%",
                  right: isMobile ? "auto" : "60%",
                  marginTop: -size / 2,
                  marginRight: isMobile ? 0 : -size / 2,
                }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  zIndex: zIndex,
                  width: size,
                  height: size,
                }}
              >
                <motion.div
                  className="clip-hexagon flex items-center justify-center relative w-full h-full"
                  animate={{
                    width: size,
                    height: size,
                  }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: "white",
                  }}
                >
                  <motion.img
                    src={slide.thumb}
                    alt={`nav ${index + 1}`}
                    className="object-cover clip-hexagon-inner"
                    animate={{
                      width: size - 6,
                      height: size - 6,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    className="absolute inset-0 clip-hexagon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      border: `${isSelected ? 4 : 3}px solid ${
                        slide.borderColor
                      }`,
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </motion.div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Gradient overlay - responsive positioning */}
      <div
        className={`absolute ${
          isMobile
            ? "-bottom-[20%] left-0 w-full h-[200px]"
            : "-right-[25%] top-0 max-w-[700px] h-[98%] rotate-180"
        }`}
        style={{
          background: isMobile
            ? "linear-gradient(to top, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0) 100%)"
            : "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.8) 100%)",
          backdropFilter: "blur(8px)",
          borderRadius: isMobile ? "50% 50% 0 0" : "100%",
        }}
      />

      <style jsx>{`
        .clip-hexagon {
          clip-path: polygon(
            25% 6.7%,
            75% 6.7%,
            100% 50%,
            75% 93.3%,
            25% 93.3%,
            0% 50%
          );
        }
        .clip-hexagon-inner {
          clip-path: polygon(
            25% 6.7%,
            75% 6.7%,
            100% 50%,
            75% 93.3%,
            25% 93.3%,
            0% 50%
          );
        }
      `}</style>
    </motion.div>
  );
};

export default Slider;
