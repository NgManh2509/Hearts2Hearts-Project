import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '../assets/Card.svg'
import DotField from '../../@/components/DotField'

const TextAnimate = ({text}) => {
    return (
        <motion.div 
            className='relative block overflow-hidden whitespace-nowrap text-[10vw] leading-none uppercase font-focus'
            initial="batDau"
            animate="hovered"
        >
        <div>
            {text.split("").map((char, idx) => {
                return (
                    <motion.span key={idx}
                        variants={{
                            batDau: {y :0},
                            hovered: {y : "-100%"}
                        }}
                        transition={{ 
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.025 * idx,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 4
                        }}
                        className='inline-block'
                        >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                )
            })}
        </div>    
         <div className='absolute inset-0'>
            {text.split("").map((char, idx) => {
                return (
                    <motion.span key={idx}
                        variants={{
                            batDau: {y :"100%"},
                            hovered: {y : "0%"}
                        }}
                        transition={{ 
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.025 * idx,
                            repeat: Infinity,
                            repeatType: "loop",
                            repeatDelay: 4
                        }}
                        className='inline-block'
                        >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                )
            })}
        </div>           
        </motion.div>
    )
}

const cardVariants = {
  hidden: ({ rotate }) => ({ 
    y: '200%', 
    rotate: rotate, 
    x: 0,
    opacity: 0
  }),
  visible: ({ rotate, xOffset }) => ({ 
    y: 0, 
    rotate: rotate, 
    x: xOffset,
    scale: 1,
    opacity: 1,
    zIndex: 1,
    transition: { type: "spring", stiffness: 260, damping: 22, mass: 0.8 }
  }),
  hover: { 
    y: -12, 
    rotate: 0, 
    scale: 1.25,
    zIndex: 10,
    transition: { type: "spring", stiffness: 500, damping: 20, mass: 0.6 }
  },
}

const Cards = ({ orgX = 0, orgY = 0, rotate = 12, delay = 800, index, hoveredIndex, setHoveredIndex }) => {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay)
    return () => clearTimeout(t)
  }, [delay])

  let xOffset = 0;
  if (hoveredIndex !== null && hoveredIndex !== index) {
    xOffset = index < hoveredIndex ? -40 : 40;
  }

  return (
    <motion.div 
      custom={{ rotate, xOffset }}
      variants={cardVariants}
      initial="hidden"
      animate={ready ? "visible" : "hidden"}
      whileHover="hover"
      onHoverStart={() => setHoveredIndex(index)}
      onHoverEnd={() => setHoveredIndex(null)}
      style={{ originX: orgX, originY: orgY }}
      className="w-[13vw] h-[19vw] min-w-[120px] min-h-[175px] max-w-[260px] max-h-[380px] cursor-pointer"
    >
        <img 
          src={Card} 
          alt={`Tarot Card ${index}`} 
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]" 
        />
    </motion.div>
  )
}

const StagePage = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const cardsData = [
    { orgX: 0, orgY: 0, rotate: 12, delay: 800 },
    { orgX: 1, orgY: 1, rotate: -12, delay: 950 },
    { orgX: 0, orgY: 0, rotate: 12, delay: 1100 },
    { orgX: 1, orgY: 1, rotate: -12, delay: 1250 },
    { orgX: 0, orgY: 0, rotate: 12, delay: 1400 },
  ];

  return (
    <div className='min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 overflow-hidden pt-1 pb-10 lg:pb-20'>
        <div className="absolute inset-0 z-0 pointer-events-auto">
            <DotField 
                gradientFrom="#00C6FF"
                gradientTo="#0072FF"
                glowColor="transparent"
                dotRadius={1.5}
                dotSpacing={16}
                cursorRadius={250}
                cursorForce={0.1}
            />
        </div>
        {/* Typography Section */}
        <div className="mb-5 flex flex-col items-center text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-xl md:text-xl font-serif tracking-[0.15em] text-zinc-800 uppercase"
          >
            <TextAnimate text="Stage" />
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-4 text-lg md:text-xl font-light italic tracking-[0.25em] text-zinc-400"
          >
            pick a card
          </motion.p>
        </div>

        <div className='flex items-center justify-center gap-[2.5vw] px-[3vw]'>
          {cardsData.map((card, idx) => (
            <Cards 
              key={idx} 
              index={idx}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              {...card} 
            />
          ))}
        </div>

    </div>
  )
}

export default StagePage