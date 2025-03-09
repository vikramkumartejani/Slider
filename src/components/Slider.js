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
        <motion.div 
            className="h-screen overflow-hidden  relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence exitBeforeEnter>
                <motion.img 
                    key={currentSlide}
                    src={slides[currentSlide].image} 
                    alt='image' 
                    className='h-full w-full'
                    style={{
                        objectFit: "cover",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                />
            </AnimatePresence>

            {/* Text content */}
            <motion.div 
                className='w-full text-[48px] pl-[50px] leading-[110%] font-normal text-white absolute top-1/2 -translate-y-1/2 z-10'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <h1 className='pl-[18px]'>Partagez vos</h1>
                <h1 className='font-bold bg-[#FFFFFF] text-[#4663AC] rounded-[18px] px-[18px] w-fit'>moments inoubliables</h1>
                <h1 className='pl-[18px]'>avec nous</h1>
            </motion.div>

            {/* Navigation buttons */}
            <motion.div 
                className='absolute right-10 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20 items-center'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
            >
                {slides.map((slide, index) => (
                    <motion.button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 transform hover:scale-110 ${
                            currentSlide === index ? 'opacity-100 scale-110 border-4 border-yellow-500' : 'opacity-50'
                        }`}
                        whileHover={{ scale: 1.1 }}
                    >
                        <div className={`bg-white clip-hexagon flex items-center justify-center ${
                            currentSlide === index ? 'w-[120px] h-[120px]' : 'w-[100px] h-[100px]'
                        }`}>
                            <img 
                                src={slide.thumb} 
                                alt={`nav ${index + 1}`} 
                                className={`object-cover ${
                                    currentSlide === index ? 'w-[120px] h-[120px]' : 'w-[100px] h-[100px]'
                                }`}
                            />
                        </div>
                    </motion.button>
                ))}
            </motion.div>

            {/* Blur effect container */}
            <motion.div 
                className='absolute -top-10 -right-[40%] min-h-screen rounded-[50%] z-0'
                style={{
                    backdropFilter: "blur(35.20000076293945px)",
                    background: "linear-gradient(186.65deg, rgba(255, 255, 255, 0.71) 18.1%, rgba(255, 255, 255, 0.1633) 90.66%)"
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            />

            {/* Add a separate gradient overlay */}
            <div className='absolute inset-0 ' style={{background: "linear-gradient(306.46deg, rgba(70, 99, 172, 0) 31.38%, rgba(70, 99, 172, 0.52) 94.47%)"}}></div>

            <style jsx>{`
                .clip-hexagon {
                    clip-path: polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%);
                }
            `}</style>
        </motion.div>
    )
}

export default Slider