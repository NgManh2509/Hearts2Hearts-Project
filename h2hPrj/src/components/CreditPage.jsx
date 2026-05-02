import React from 'react';
import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import CreditImg from '../assets/creditImg.png';
import Waves from './Waves';

const CreditVisual = ({ variants }) => (
  <motion.div 
    className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/5] lg:aspect-auto lg:h-[450px] xl:h-[600px] 2xl:h-[750px] flex items-center justify-center group"
    variants={variants}
  >
    <motion.div 
      className=" rounded-[10px] md:rounded-[15px] xl:rounded-[20px] absolute w-[95%] h-[50%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FEE528] shadow-sm transition-all duration-500 ease-out"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
    ></motion.div>
    
    <motion.img 
      src={CreditImg} 
      alt="Hearts2Hearts Credit" 
      className="relative z-10 w-[122%] h-[122%] object-contain object-end drop-shadow-[10px_17px_15px_rgba(0,0,0,0.4)] 
                 -translate-y-[60px] lg:-translate-y-[97px] xl:-translate-y-[76px] 
                 translate-x-[40px] lg:translate-x-[62px] xl:translate-x-[78px] origin-right
                 transition-transform duration-500 ease-out 
                 group-hover:scale-105 
                 max-w-none group-hover:-translate-y-[75px] lg:group-hover:-translate-y-[95px] xl:group-hover:-translate-y-[67px]"
      style={{originX: 0, originY: 1}}
    />
  </motion.div>
);

const ContactCreditCard = ({ variants }) => (
  <motion.div 
    className="bg-white rounded-[15px] md:rounded-[30px] xl:rounded-[40px] p-6 md:p-8 lg:p-8 xl:p-14 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col sm:flex-row justify-between relative overflow-hidden group"
    variants={variants}
    whileHover={{ y: -6 }}
  >
    {/* Decorative background element */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FEE528] rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#5AAFD6] rounded-full opacity-10 blur-3xl group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

    <div className="flex-1 relative z-10 flex flex-col justify-center">
      <h2 className="text-[24px] md:text-[32px] lg:text-[28px] xl:text-[40px] font-bold text-black tracking-tight leading-none mb-3 md:mb-4 xl:mb-6">Contact me</h2>
      
      <a href="mailto:mxnhedit1234@gmail.com" 
         className="inline-flex items-center text-gray-700 font-medium text-[15px] md:text-[18px] lg:text-[16px] xl:text-[22px] tracking-wide hover:text-blue-600 transition-colors w-fit break-all sm:break-words group/link">
        <span className="relative">
          mxnhedit1234@gmail.com
          <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover/link:w-full"></span>
        </span>
      </a>
    </div>
    
    {/* Divider */}
    <div className="hidden sm:block w-[2px] bg-gray-100 mx-6 lg:mx-8 xl:mx-12 rounded-full"></div>
    <div className="sm:hidden h-[2px] bg-gray-100 my-6 rounded-full"></div>
    
    <div className="flex-1 relative z-10 flex flex-col justify-center">
      <h2 className="text-[24px] md:text-[32px] lg:text-[28px] xl:text-[40px] font-bold text-black tracking-tight leading-none mb-3 md:mb-4 xl:mb-6">Credit</h2>
      
      <div className="flex flex-col gap-3">
        <a href="https://youtube.com/DaftTaengk" target="_blank" rel="noopener noreferrer" 
           className="flex items-center gap-2 w-fit px-5 py-2.5 bg-gray-50 hover:bg-white text-gray-800 rounded-full transition-all duration-300 font-medium text-[14px] md:text-[16px] xl:text-[18px] group/btn border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-1">
          <FaYoutube size={20} className="text-red-500 group-hover/btn:scale-110 transition-transform" />
          @DaftTaengk
        </a>
        <a href="https://youtube.com/@Dori_YouTube" target="_blank" rel="noopener noreferrer" 
           className="flex items-center gap-2 w-fit px-5 py-2.5 bg-gray-50 hover:bg-white text-gray-800 rounded-full transition-all duration-300 font-medium text-[14px] md:text-[16px] xl:text-[18px] group/btn border border-gray-200 hover:border-red-200 hover:shadow-md hover:-translate-y-1">
          <FaYoutube size={20} className="text-red-500 group-hover/btn:scale-110 transition-transform" />
          @Dori_YouTube
        </a>
      </div>
    </div>
  </motion.div>
);

const DisclaimerCard = ({ variants }) => (
  <motion.div 
    className="bg-white rounded-[15px] md:rounded-[30px] xl:rounded-[40px] p-6 md:p-8 lg:p-8 xl:p-14 shadow-[0_15px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center relative overflow-hidden group"
    variants={variants}
    whileHover={{ y: -6 }}
  >
    {/* Decorative background element */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] max-w-[600px] max-h-[600px] bg-gradient-to-r from-[#FEE528]/10 to-[#5AAFD6]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

    <h2 className="text-[24px] md:text-[32px] lg:text-[28px] xl:text-[40px] font-bold text-black tracking-tight text-center leading-none mb-4 md:mb-6 xl:mb-8 relative z-10">Disclaimer</h2>
    
    <p className="text-gray-700 font-medium text-[14px] md:text-[18px] lg:text-[15px] xl:text-[20px] leading-[1.7] xl:leading-[1.9] tracking-wide text-justify md:text-center max-w-[100%] relative z-10">
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
      className="relative min-h-screen bg-[#5AAFD6] flex items-center justify-center p-6 md:p-12 overflow-hidden selection:bg-[#FEE528] selection:text-black"
      style={{ fontFamily: '"Gayathri", sans-serif' }}
    >
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Gayathri:wght@100;400;700&display=swap');`}
      </style>

      {/* Animated wave background */}
      <Waves />

      <motion.div 
        className="relative z-10 max-w-[1500px] w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 items-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        <CreditVisual variants={imageContainerVariants} />

        <div className="lg:col-span-7 flex flex-col gap-6 lg:gap-8 xl:gap-10 w-full mx-auto">
          <ContactCreditCard variants={itemVariants} />
          <DisclaimerCard variants={itemVariants} />
        </div>

      </motion.div>
    </main>
  );
}

export default CreditPage;