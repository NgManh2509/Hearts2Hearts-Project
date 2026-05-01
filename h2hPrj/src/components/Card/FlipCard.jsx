import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FanCamData from '../../data/fanCamData';
import CardSvg from '../../assets/Card.svg';

const FlipCard = ({ videoUrl }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    
    const [videoSrc] = useState(videoUrl || FanCamData[Math.floor(Math.random() * FanCamData.length)]);

    const handleFlip = () => {
        if (!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    };

    return (
        <motion.div 
            className="flip card w-[55vw] sm:w-[38vw] md:w-[22vw] lg:w-[18vw] xl:w-[30vw] max-w-[350px] cursor-pointer" style={{ aspectRatio: '2/3' }}
            onClick={handleFlip}
            initial={{y: 100}}
            animate={{y: 0}}
            transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.8 }}
        >
            <motion.div
                className="flip card-inner w-full h-full relative"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, animationDirection: "normal" }}
                onAnimationComplete={() => setIsAnimating(false)}
            >
                <div className="flip card-front absolute w-full h-full">
                    <img 
                        src={CardSvg} 
                        alt="Card Front" 
                        className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.15)]" 
                    />
                </div>

                <div className="flip card-back absolute w-full h-full">
                    <div className="w-full h-full rounded-[10px] overflow-hidden bg-zinc-900 shadow-[0_15px_20px_rgba(0,0,0,0.15)] relative">
                        {!isVideoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 border-4 border-zinc-700 border-t-zinc-200 rounded-full animate-spin"></div>
                            </div>
                        )}
                        <video 
                            src={videoSrc} 
                            className={`w-full h-full object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            onLoadStart={() => console.log(`Đang load ${videoSrc}`)}
                            onLoadedData={() => {
                                console.log(`Loaded ${videoSrc}`);
                                setIsVideoLoaded(true);
                            }}
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default FlipCard;