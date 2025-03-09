import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FirstSliderImage from '../assets/first-slider-image.jpg'
import SecondSliderImage from '../assets/second-slider-image.jpg'
import ThirdSliderImage from '../assets/third-slider-image.jpg'
import FourthSliderImage from '../assets/fourth-slider-image.jpg'
import FifthSliderImage from '../assets/fifth-slider-image.jpg'
import Thumb from '../assets/thumb.svg'
import Thumb2 from '../assets/thumb2.png'
import Thumb3 from '../assets/thumb3.svg'
import Thumb4 from '../assets/thumb4.svg'
import Thumb5 from '../assets/thumb5.svg'

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
        { image: FirstSliderImage, thumb: Thumb },
        { image: SecondSliderImage, thumb: Thumb2 },
        { image: ThirdSliderImage, thumb: Thumb3 },
        { image: FourthSliderImage, thumb: Thumb4 },
        { image: FifthSliderImage, thumb: Thumb5 }
    ];

    return (
        <div className="h-screen overflow-hidden bg-blue-500 relative">
            <AnimatePresence mode="wait">
                <motion.img 
                    key={currentSlide}
                    src={slides[currentSlide].image} 
                    alt='image' 
                    className='h-full w-full'
                    style={{objectFit:"cover"}}
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -300, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Text content */}
            <div className='w-full text-[64px] pl-[300px] leading-[118%] font-normal text-white absolute top-1/2 -translate-y-1/2 z-10'>
                <h1 className='pl-[18px]'>Partagez vos</h1>
                <h1 className='font-bold bg-[#FFFFFF] text-[#4663AC] rounded-[18px] px-[18px] w-fit'>moments inoubliables</h1>
                <h1 className='pl-[18px]'>avec nous</h1>
            </div>

            {/* Navigation buttons */}
            <div className='absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20'>
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 transform hover:scale-110 ${
                            currentSlide === index ? 'opacity-100 scale-110' : 'opacity-50'
                        }`}
                    >
                        <img 
                            src={slide.thumb} 
                            alt={`nav ${index + 1}`} 
                            className='w-16 h-16 object-cover rounded-full'
                        />
                    </button>
                ))}
            </div>

            {/* Blur effect container */}
            <div className='absolute -top-10 -right-[40%] h-[1330px] w-[1300px] rounded-[50%] z-0' 
                style={{
                    backdropFilter: "blur(35.20000076293945px)",
                    background: "linear-gradient(186.65deg, rgba(255, 255, 255, 0.71) 18.1%, rgba(255, 255, 255, 0.1633) 90.66%)"
                }}
            />
        </div>
    )
}

export default Slider