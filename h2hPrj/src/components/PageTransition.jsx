import React from 'react'
import { motion } from 'framer-motion'

const TextAnimate = ({text}) => {
    return (
        <motion.div 
            className='relative block overflow-hidden whitespace-nowrap text-[20vw] leading-none uppercase font-cherry'
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
                            repeatDelay: 0.2
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
                            repeatDelay: 0.2
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

const PageTransition = ({text = "TEST"}) => {
  return (
    <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.4 } }}
        exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        className='fixed inset-0 z-50 flex items-center justify-center bg-[#75BEE9] px-8 text-white'
    >
        <TextAnimate text={text} />
    </motion.section>
  )
}


export default PageTransition