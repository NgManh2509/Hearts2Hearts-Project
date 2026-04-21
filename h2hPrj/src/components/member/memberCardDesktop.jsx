import React, { useState } from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'
import { motion } from 'framer-motion'

const MemberDesktop = ({ name, bornPlace, birthDay, pos, bio, images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className='flex w-full h-[600px] bg-white rounded-[5px] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)] flex-col md:flex-row pointer-events-auto'>
      <section className='md:flex-[1.3] bg-[#000] relative flex items-center justify-center group overflow-hidden'>
        <motion.div 
          className="flex w-full h-full absolute inset-0"
          animate={{ x: `-${currentImageIndex * 100}%` }}
          transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
        >
          {images.map((img, idx) => (
            <img key={idx} src={img} alt={`${name} ${idx + 1}`} className='w-full h-full object-cover shrink-0 select-none pointer-events-none' draggable="false" />
          ))}
        </motion.div>
        {images.length > 1 && (
          <>
            <button 
              onClick={handlePrev}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-black opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
            <button 
              onClick={handleNext}
              onPointerDown={(e) => e.stopPropagation()}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-colors text-black opacity-0 group-hover:opacity-100 z-10"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>

            {/* Dấu chấm Carousel */}
            <div className="absolute bottom-5 flex gap-[6px] z-10">
              {images.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentImageIndex 
                      ? 'bg-white scale-110' 
                      : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </section>
      <section className='flex-1 flex flex-col md:border-l border-t md:border-t-0 border-[#efefef] bg-white min-w-0 md:min-w-[340px] text-left cursor-auto'>
        <header className='p-4 border-b border-[#efefef] flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <img src={images[0]} alt="avatar" className='w-8 h-8 rounded-full object-cover border border-[#dbdbdb] select-none pointer-events-none' draggable="false" />
            <div className="flex items-center gap-1 text-[14px] font-semibold text-black">
              {name}
              
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2ZM10.6 16.6L6.5 12.5L8 11L10.6 13.6L16 8.2L17.5 9.7L10.6 16.6Z" fill="#0095F6"/>
              </svg>
            </div>
          </div>
          <button className="text-black hover:opacity-50 transition-opacity">
            <MoreHorizontal size={24} />
          </button>
        </header>
        
        <div className="flex-1 overflow-y-auto p-4 text-[14px] leading-relaxed [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" onPointerDown={(e) => e.stopPropagation()}>
          <ul className="flex flex-col gap-4">
            <li className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
              <span className="font-semibold text-[#737373] text-[12px] uppercase tracking-[0.5px]">Born</span>
              <span className="text-black text-[15px]">{bornPlace}</span>
            </li>
            <li className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
              <span className="font-semibold text-[#737373] text-[12px] uppercase tracking-[0.5px]">Birthday</span>
              <span className="text-black text-[15px]">{birthDay}</span>
            </li>
            <li className="flex flex-col gap-1.5 pb-4 border-b border-[#f5f5f5]">
              <span className="font-semibold text-[#737373] text-[12px] uppercase tracking-[0.5px]">Position</span>
              <span className="text-black text-[15px]">{pos}</span>
            </li>
            <li className="flex flex-col gap-1.5 pb-2">
              <span className="font-semibold text-[#737373] text-[12px] uppercase tracking-[0.5px]">Bio</span>
              <span className="text-black text-[15px]">{bio}</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default MemberDesktop