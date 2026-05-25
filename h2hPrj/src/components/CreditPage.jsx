import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import CreditImg from '../assets/creditImg.png';
import Waves from './Waves';

const CreditVisual = ({ variants }) => (
  <motion.div
    className="relative w-[34.51vw] h-[39.22vw] flex items-center justify-center group"
    variants={variants}
  >
    <motion.div
      className="rounded-[1.04vw] absolute w-[95%] h-[50%] left-[2.5%] bottom-[25%] bg-[#FEE528] shadow-sm transition-all duration-500 ease-out"
      initial={{ opacity: 0, scale: 0.8, originX: 0.5, originY: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
    ></motion.div>

    <motion.img
      src={CreditImg}
      alt="Hearts2Hearts Credit"
      className="absolute z-10 w-[122%] h-auto max-w-none origin-bottom-left
                 left-[2.5%] bottom-[25%]
                 drop-shadow-[0.52vw_0.88vw_0.78vw_rgba(0,0,0,0.4)] 
                 transition-transform duration-500 ease-out 
                 group-hover:scale-105"
    />
  </motion.div>
);

const ContactCreditCard = ({ variants }) => (
  <motion.div
    className="bg-white rounded-[2.09vw] p-[3.66vw] shadow-[0_0.78vw_2.09vw_rgba(0,0,0,0.05)] hover:shadow-[0_1.3vw_2.61vw_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-row justify-between relative overflow-hidden group"
    variants={variants}
    whileHover={{ y: '-0.31vw' }}
  >
    {/* Decorative background element */}
    <div className="absolute -top-[5.02vw] -right-[5.02vw] w-[10.04vw] h-[10.04vw] bg-[#FEE528] rounded-full opacity-10 blur-[1.56vw] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
    <div className="absolute -bottom-[5.02vw] -left-[5.02vw] w-[10.04vw] h-[10.04vw] bg-[#5AAFD6] rounded-full opacity-10 blur-[1.56vw] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

    <div className="flex-1 relative z-10 flex flex-col justify-center">
      <h2 className="text-[2.09vw] font-bold text-black tracking-tight leading-none mb-[1.25vw]">Contact me</h2>

      <a href="mailto:mxnhedit1234@gmail.com"
        className="inline-flex items-center text-gray-700 font-medium text-[1.15vw] tracking-wide hover:text-blue-600 transition-colors w-fit break-words group/link">
        <span className="relative">
          mxnhedit1234@gmail.com
          <span className="absolute left-0 bottom-0 w-0 h-[0.1vw] bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
        </span>
      </a>
    </div>

    {/* Divider */}
    <div className="w-[0.1vw] bg-gray-100 mx-[2.61vw] rounded-full"></div>

    <div className="flex-1 relative z-10 flex flex-col justify-center">
      <h2 className="text-[2.09vw] font-bold text-black tracking-tight leading-none mb-[1.25vw]">Credit</h2>

      <div className="flex flex-col gap-[0.627vw]">
        <a href="https://youtube.com/DaftTaengk" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-[0.418vw] w-fit px-[1.04vw] py-[0.52vw] bg-gray-50 hover:bg-white text-gray-800 rounded-full transition-all duration-300 font-medium text-[0.94vw] group/btn border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-[0.2vw]">
          <FaYoutube className="text-red-500 group-hover/btn:scale-110 transition-transform" style={{ width: '1.04vw', height: '1.04vw' }} />
          @DaftTaengk
        </a>
        <a href="https://youtube.com/@Dori_YouTube" target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-[0.418vw] w-fit px-[1.04vw] py-[0.52vw] bg-gray-50 hover:bg-white text-gray-800 rounded-full transition-all duration-300 font-medium text-[0.94vw] group/btn border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-[0.2vw]">
          <FaYoutube className="text-red-500 group-hover/btn:scale-110 transition-transform" style={{ width: '1.04vw', height: '1.04vw' }} />
          @Dori_YouTube
        </a>
      </div>
    </div>
  </motion.div>
);

const DisclaimerCard = ({ variants }) => (
  <motion.div
    className="bg-white rounded-[2.09vw] p-[3.66vw] shadow-[0_0.78vw_2.09vw_rgba(0,0,0,0.05)] hover:shadow-[0_1.3vw_2.61vw_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center relative overflow-hidden group"
    variants={variants}
    whileHover={{ y: '-0.31vw' }}
  >
    {/* Decorative background element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] max-w-[31.38vw] max-h-[31.38vw] bg-gradient-to-r from-[#FEE528]/10 to-[#5AAFD6]/10 rounded-full blur-[3.13vw] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

    <h2 className="text-[2.09vw] font-bold text-black tracking-tight text-center leading-none mb-[1.67vw] relative z-10">Disclaimer</h2>

    <p className="text-gray-700 font-medium text-[1.04vw] leading-[1.9] tracking-wide text-center max-w-[100%] relative z-10">
      This website is a non-profit, fan-made project dedicated to the group Hearts2hearts. We do not claim ownership of any media, music, or promotional materials featured on this site. All images, videos, and related content are the sole property of SM Entertainment. This site is for promotional and entertainment purposes only. No copyright infringement is intended.
    </p>
  </motion.div>
);

const CreditPage = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0, opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: 'spring', stiffness: 70, damping: 20, delay: 0.2 }
    }
  };

  return (
    <main
      className="relative w-[100vw] h-[100vh] bg-[#5AAFD6] flex items-center justify-center p-[2.51vw] overflow-hidden selection:bg-[#FEE528] selection:text-black"
      style={{ fontFamily: '"Gayathri", sans-serif' }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Gayathri:wght@100;400;700&display=swap');`}
      </style>

      {/* Animated wave background */}
      <Waves />

      <motion.div
        className="relative z-10 w-[78.45vw] flex flex-row items-center justify-between gap-[4.18vw]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left column */}
        <CreditVisual variants={imageContainerVariants} />

        {/* Right column */}
        <div className="w-[41.84vw] flex flex-col gap-[2.09vw]">
          <ContactCreditCard variants={itemVariants} />
          <DisclaimerCard variants={itemVariants} />
        </div>

      </motion.div>
    </main>
  );
}

export default CreditPage;