"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FirstSliderImage from "../assets/first-slider-image.jpg";
import SecondSliderImage from "../assets/second-slider-image.jpg";
import ThirdSliderImage from "../assets/third-slider-image.jpg";
import FourthSliderImage from "../assets/fourth-slider-image.jpg";
import FifthSliderImage from "../assets/fifth-slider-image.jpg";
import Thumb from "../assets/thumb.svg";
import Thumb6 from "../assets/Polygon 1.png";
import Thumb2 from "../assets/thumb2.svg";
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
    { image: FirstSliderImage, thumb: Thumb6, borderColor: "#FFDE59" },
    { image: SecondSliderImage, thumb: Thumb6, borderColor: "#FF85A2" },
    { image: ThirdSliderImage, thumb: Thumb6, borderColor: "#FFDE59" },
    { image: FourthSliderImage, thumb: Thumb6, borderColor: "#FF85A2" },
    { image: FifthSliderImage, thumb: Thumb6, borderColor: "#FFDE59" },
  ];

  return (
    <div className="md:px-0 px-4 md:mb-0 mb-5">
      <motion.div
        className="md:h-screen h-[440px] overflow-hidden relative rounded-2xl md:rounded-none"
      >
        <AnimatePresence maintainExitVelocity={false}>
          <motion.img
            key={currentSlide}
            src={slides[currentSlide].image}
            alt="image"
            className="h-full w-full"
            style={{
              objectFit: "cover",
            }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </AnimatePresence>

        {/* Text content */}
        <motion.div
          className="md:block hidden w-full text-[30px] lg:text-[40px] xl:text-[48px] px-5 sm:pl-10 lg:pl-[80px] xl:pl-[150px] 2xl:pl-[300px] leading-[118%] font-normal text-white absolute top-20 lg:top-[122px] z-10"
        >
          <h1 className="pl-[18px] mb-1">Partagez vos</h1>
          <motion.h1
            className="font-bold bg-[#FFFFFF] text-[#4663AC] rounded-[18px] px-[18px] w-fit"
          >
            moments inoubliables
          </motion.h1>
          <h1 className="pl-[18px]">avec nous</h1>
        </motion.div>

        {/* Navigation container - responsive positioning */}
        <div
          className={`absolute h-full md:h-screen z-20 ${isMobile
            ? "bottom-0 md:bottom-[4%] left-0 w-full flex justify-center items-center"
            : "top-0 right-0 w-[50%] flex justify-end items-center"
            }`}
        >
          <div
            className={`relative h-full md:h-screen ${isMobile
              ? "h-[120px] w-full max-w-[80%]"
              : "h-[180px] w-full max-w-[400px]"
              } flex items-center justify-center`}
          >
            {slides.map((slide, index) => {
              let x, y, angle, radians;

              if (isMobile) {
                const spacing = 70;
                const centerOffset = (currentSlide - index) * spacing;
                x = -centerOffset;
                y = Math.abs(centerOffset) * 0.5;
                angle = 0;
                radians = 0;
              } else {
                const itemCount = slides.length;
                const angleStep = 120 / (itemCount - 1);
                const angleOffset = (currentSlide - index) * angleStep;
                angle = 90 + angleOffset;
                angle = Math.max(0, Math.min(180, angle));
                radians = (angle * Math.PI) / 180;
                const radius = 370;
                const xOffset = 300;
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
                  animate={{
                    opacity: 1,
                    x: x,
                    y: y,
                    top: isMobile ? "80%" : "50%",
                    right: isMobile ? "auto" : "55%",
                    marginTop: -size / 2,
                    marginRight: isMobile ? 0 : -size / 2,
                  }}
                  transition={{
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200,
                    damping: 80,
                  }}
                  style={{
                    zIndex: zIndex,
                    width: size,
                    height: size,
                  }}
                >
                  <motion.div
                    className="flex items-center justify-center relative w-full h-full"
                    animate={{
                      width: size,
                      height: size,
                    }}
                  >
                    <motion.img
                      src={slide.thumb}
                      alt={`nav ${index + 1}`}
                      className="object-contain"
                      animate={{
                        width: size - 7,
                        height: size - 7,
                      }}
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Overlay behind navigation container on Desktop */}
        <div
          className="absolute right-0 w-[700px] md:block hidden h-screen z-10"
          style={{
            background: "linear-gradient(186.65deg, rgba(255, 255, 255, 0.71) 18.1%, rgba(255, 255, 255, 0.1633) 90.66%)",
            backdropFilter: "blur(35.2px)",
            borderRadius: "100%",
            top: isMobile ? "auto" : "0",
            bottom: isMobile ? "0" : "auto",
            // left: "0",
            right: "-450px",
            margin: "auto"
          }}
        />
        {/* Overlay behind navigation container on Mobile */}
        <div
          className="absolute w-full max-w-[320px] h-[300px] block md:hidden z-10"
          style={{
            background: "linear-gradient(180deg, rgba(217, 217, 217, 0.71) 0%, rgba(115, 115, 115, 0.71) 100%)",
            backdropFilter: "blur(35.2px)",
            borderRadius: "100%",
            bottom: "-200px",

            left: "50%",
            transform: "translateX(-50%)",
          }}
        />


        {/* Gradient overlay - responsive positioning */}
        <div className="absolute top-0 left-0 w-full h-full md:block hidden"
          style={{
            background:
              "linear-gradient(306.46deg, rgba(70, 99, 172, 0) 31.38%, rgba(70, 99, 172, 0.52) 94.47%)",
          }}
        />
        <div className="absolute top-0 left-0 w-full h-full block md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(70, 99, 172, 0) 45%, #4663AC 100%)",
          }}
        />


      </motion.div>
    </div>
  );
};

export default Slider;
