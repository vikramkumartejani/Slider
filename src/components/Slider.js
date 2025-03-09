"use client";

import { useState } from "react";
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
  const [currentSlide, setCurrentSlide] = useState(2); // Start with middle slide

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

      {/* CD roller navigation */}
      <div className="absolute top-[40%] right-0 w-full flex justify-end items-center z-20">
        <div className="relative h-[180px] w-full max-w-[400px] flex items-center justify-center">
          {slides.map((slide, index) => {
            // Calculate the angle for this item (in a half-circle on the right side)
            // 0 degrees = top, 180 degrees = bottom
            const itemCount = slides.length;

            // Calculate the angle for each item, evenly distributed in a half-circle
            const angleStep = 180 / (itemCount - 1);

            // Calculate position based on the current selected slide
            // We want to center the current slide at 90 degrees (middle of the half-circle)
            const angleOffset = (currentSlide - index) * angleStep;
            let angle = 90 + angleOffset;

            // Keep angle within the half-circle bounds (0-180 degrees)
            if (angle < 0) angle = 0;
            if (angle > 180) angle = 180;

            // Convert to radians for calculations
            const radians = (angle * Math.PI) / 180;

            // Determine if this is the selected slide
            const isSelected = currentSlide === index;

            // Calculate position on the right-side half-circle
            // For a half-circle on the right side:
            // x = radius * sin(angle) + offset
            // y = radius * cos(angle) + offset
            const radius = 280; // Radius of the circle
            const xOffset = 150; // Distance from right edge
            const yOffset = 0; // Vertical center offset

            // Calculate position (sin for y because we're using 0 degrees as top)
            const x = -Math.abs(Math.sin(radians) * radius) + xOffset;
            const y = Math.cos(radians) * radius + yOffset;

            // Size based on selection
            const baseSize = 120; // Base size for hexagons
            const selectedSize = baseSize * 1.6; // 60% larger when selected
            const size = isSelected ? selectedSize : baseSize;

            // Z-index to ensure selected item is on top
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
                  top: "50%",
                  right: "60%",
                  marginTop: -size / 2, // Center vertically based on size
                  marginRight: -size / 2, // Center horizontally based on size
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
                      width: size - 6, // Account for border
                      height: size - 6, // Account for border
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Colored border */}
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

      {/* Add a separate gradient overlay */}

      <div
        className="
absolute -right-[25%] top-0 max-w-[700px] rounded-full rotate-180 h-[98%] flex items-center justify-center w-full
"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.8) 100%)",
          backdropFilter: "blur(8px)",
          borderRadius: "100%",
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
