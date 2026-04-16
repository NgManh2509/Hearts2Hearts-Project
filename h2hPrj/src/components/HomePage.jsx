import { motion } from 'framer-motion';
import TextHighlighter from '../support/textHighLight';
import h2hLogo from '../assets/h2hLogo.svg';
import img1 from '../assets/homePageImg/homePage1.webp';
import img2 from '../assets/homePageImg/homePage (2).webp';
import img3 from '../assets/homePageImg/homePage (1).webp';

const MEMBER = ['Jiwoo', 'Carmen', 'Yuha', 'Stella', 'Juun', 'A-na', 'Ian', 'Ye-on'];

export default function HomePage() {
  return (
    <div className="relative w-full h-full overflow-hidden bg-[#FAFAFA] select-none text-[#75BEE9] backdrop-blur-3xl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Montserrat:wght@800;900&display=swap');
        .font-serif-h2h { font-family: "Playfair Display", "Times New Roman", Times, serif; }
        .font-sans-h2h { font-family: "Montserrat", "Arial Black", sans-serif; font-weight: 900; }
        .h2h-shadow { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
        .h2h-stroke { 
            -webkit-text-stroke: 2px #75BEE9; 
            color: transparent; 
        }
      `}</style>

      {/* MINIMALISTIC AMBIENT BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#FAFAFA] via-[#F4F7FB] to-[#EEF5FA] opacity-80" />
      
      {/* GEOMETRIC PATTERN (MODERN DOT GRID) */}
      <div 
        className="pointer-events-none absolute inset-0"
        style={{ 
          backgroundImage: 'radial-gradient(rgba(117, 190, 233, 0.25) 1px, transparent 1.5px)', 
          backgroundSize: '2vw 2vw' 
        }}
      />

      {/* BREATHE EFFECT (SUBTLE GLOWS) */}
      <motion.div
        className="pointer-events-none absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full blur-[8vw]"
        style={{ background: 'radial-gradient(circle, rgba(117,190,233,0.15) 0%, rgba(250,250,250,0) 70%)' }}
        animate={{ 
          x: [0, 40, 0], 
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] rounded-full blur-[10vw]"
        style={{ background: 'radial-gradient(circle, rgba(117,190,233,0.12) 0%, rgba(250,250,250,0) 70%)' }}
        animate={{ 
          y: [0, -30, 0], 
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      <div className="absolute top-[3%] right-[4%] text-[0.6vw] tracking-[0.2em] font-sans-h2h text-[#75BEE9]/60 text-right">
        <span>COLLECTIONS</span><br />
        <span className="opacity-50">S/S 2024</span>
      </div>

      <div className="absolute bottom-[4%] right-[2%] transform -rotate-90 origin-bottom-right text-[0.6vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/50 flex items-center gap-[1vw]">
        <span>PROJECT HEARTS</span>
        <span className="w-[3vw] h-[1px] bg-[#75BEE9]/40"></span>
      </div>

      {/* SUBTLE ARCHITECTURAL CROSSHAIRS */}
      <div className="pointer-events-none absolute top-[15%] right-[28%] text-[0.8vw] text-[#75BEE9]/50 font-sans-h2h">+</div>
      <div className="pointer-events-none absolute bottom-[22%] left-[25%] text-[0.8vw] text-[#75BEE9]/50 font-sans-h2h">+</div>
      <div className="pointer-events-none absolute top-[45%] right-[10%] text-[0.8vw] text-[#75BEE9]/50 font-sans-h2h">+</div>

      {/* ANIMATED SCROLL INDICATOR */}
      <div className="absolute bottom-[3%] left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-[0.5vw]">
        <span className="text-[0.5vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/70 uppercase ml-[0.3em]">Scroll</span>
        <div className="w-[1px] h-[5vh] bg-[#75BEE9]/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-[50%] bg-[#75BEE9]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* =========================================================================
          LEFT SIDE 
      ========================================================================= */}

      {/* PHOTO 1 - BIG TOP LEFT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        className="absolute top-[4%] left-[4%] w-[58%] h-[48%] rounded-[2vw] overflow-hidden h2h-shadow group"
      >
        <img 
            src={img3} 
            alt="Heart2Hearts Photo 1" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            draggable={false} 
        />
      </motion.div>

      {/* BRAND NAME - HEART logo HEARTS */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="absolute top-[53.5%] left-[12%] w-[52%] flex items-center gap-0"
      >
        <span className="font-serif-h2h font-bold tracking-tight uppercase pb-[2vw]" style={{ fontSize: 'clamp(32px, 5.5vw, 80px)', lineHeight: 1 }}>
          HEART
        </span>
        <img 
            src={h2hLogo} 
            alt="H2H" 
            className='rotate-10'
            style={{ width: 'clamp(36px, 6vw, 90px)', height: 'clamp(36px, 6vw, 90px)', flexShrink: 0, marginTop: '-0.3vw' }} 
        />
        <span className="font-serif-h2h font-bold tracking-tight uppercase" style={{ fontSize: 'clamp(32px, 5.5vw, 80px)', lineHeight: 1 }}>
          HEARTS
        </span>
      </motion.div>

      {/* PHOTO 2 - BOTTOM LEFT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="absolute top-[66%] left-[4%] w-[35%] h-[32%] rounded-[2vw] overflow-hidden h2h-shadow group"
      >
        <img 
            src={img1} 
            alt="Heart2Hearts Photo 2" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            draggable={false} 
        />
      </motion.div>

      {/* MEMBER NAMES 2 STAGGERED HORIZONTAL ROWS */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[72%] left-[40%] flex flex-col font-serif-h2h font-bold tracking-wide"
        style={{ fontSize: 'clamp(20px, 2vw, 24px)', lineHeight: '1.2' }}
      >
        {/* HÀNG 1 */}
        <div className="flex items-center gap-[0.2vw] ml-[4vw] mt-[1.5vh]">
          {MEMBER.slice(0, 4).map((name, i) => {
            const globalIndex = i;
            const isEven = globalIndex % 2 === 0;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + globalIndex * 0.05 }}
                className="whitespace-nowrap"
              >
                {isEven ? (
                  <TextHighlighter 
                    triggerType="auto" 
                    highlightColor="#75BEE9" 
                    className="text-white px-[0.4vw] py-[0.1vh]"
                    rounded="rounded-none"
                    transition={{ duration: 0.5, delay: 0.7 + globalIndex * 0.05 }}
                  >
                    {name}
                  </TextHighlighter>
                ) : (
                  <span className="text-[#75BEE9] px-[0.4vw]">{name}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* HÀNG 2 - LỆCH SANG PHẢI */}
        <div className="flex items-center gap-[0.2vw] ml-[0.3vw]">
          {MEMBER.slice(4, 8).map((name, i) => {
            const globalIndex = i + 4;
            const isEven = globalIndex % 2 === 0;
            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7 + globalIndex * 0.05 }}
                className="whitespace-nowrap"
              >
                {isEven ? (
                  <TextHighlighter 
                    triggerType="auto" 
                    highlightColor="#75BEE9" 
                    className="text-white px-[0.4vw] py-[0.1vh]"
                    rounded="rounded-none"
                    transition={{ duration: 0.5, delay: 0.7 + globalIndex * 0.05 }}
                  >
                    {name}
                  </TextHighlighter>
                ) : (
                  <span className="text-[#75BEE9] px-[0.4vw]">{name}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* =========================================================================
          RIGHT SIDE 
      ========================================================================= */}

      {/* BIG HIGHLIGHT TEXT */}
      {/*Track list*/}
      <div className="absolute top-[0%] right-[10%] w-[25%] flex flex-col font-sans-h2h tracking-tighter uppercase scale-[0.7]" style={{ fontSize: 'clamp(50px, 8.5vw, 130px)', lineHeight: '0.85' }}>
        
        {/* 01 RUDE! */}
        <div className="flex items-start">
            <span className="text-black font-black font-sans tracking-widest mt-[0.5vw] mr-[0.5vw]" style={{ fontSize: 'clamp(12px, 1.5vw, 24px)' }}>01</span>
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-[1vw] pt-[0.2vw] pb-[0.8vw]"
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                RUDE!
            </TextHighlighter>
        </div>

        {/* FOCUS 02 */}
        <div className="mt-[-0.2vw] flex items-start ml-[6vw]">
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-[1vw] pt-[0.2vw] pb-[0.8vw]"
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                FOCUS
            </TextHighlighter>
            <span className="text-black font-black font-sans tracking-widest mt-[0.5vw] ml-[0.5vw]" style={{ fontSize: 'clamp(12px, 1.5vw, 24px)' }}>02</span>
        </div>

        {/* 03 STYLE */}
        <div className="mt-[-0.2vw] flex items-start ml-[-2vw]">
            <span className="text-black font-black font-sans tracking-widest mt-[0.5vw] mr-[0.5vw]" style={{ fontSize: 'clamp(12px, 1.5vw, 24px)' }}>03</span>
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-[1vw] pt-[0.2vw] pb-[0.8vw]"
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                STYLE
            </TextHighlighter>
        </div>
      </div>

      {/* PHOTO 3 - TALL RIGHT IMAGE */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="absolute bottom-[2%] right-[4%] w-[33%] h-[60%] justify-end rounded-[2vw] overflow-hidden h2h-shadow group"
      >
        <img 
            src={img2} 
            alt="Heart2Hearts Photo 3" 
            className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-700 ease-out" 
            draggable={false} 
        />
      </motion.div>

    </div>
  );
}