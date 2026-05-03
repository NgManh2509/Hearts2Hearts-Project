import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import Waves from '../../@/components/Waves';
import TextHighlighter from '../support/textHighLight';
import h2hLogo from '../assets/h2hLogo.svg';
import img1 from '../assets/homePageImg/grpPhoto.webp';

const MEMBER = ['Jiwoo', 'Carmen', 'Yuha', 'Stella', 'Juun', 'A-na', 'Ian', 'Ye-on'];

/** Lazy video: chỉ play khi vào viewport, không tải trước */
function LazyVideo({ src, className, objectPosition, poster }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Bắt đầu load và play khi vào viewport
          if (video.paused) {
            video.load();
            video.play().catch(() => {}); // ignore autoplay policy errors
          }
        } else {
          // Pause khi ra khỏi viewport để tiết kiệm CPU/network
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      playsInline
      loop
      muted
      preload="none"
      className={className}
      draggable={false}
    />
  );
}

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen lg:h-screen overflow-x-hidden lg:overflow-hidden bg-[#FAFAFA] select-none text-[#75BEE9] backdrop-blur-3xl flex flex-col lg:block pt-12 lg:pt-0 pb-20 lg:pb-0 gap-12 lg:gap-0">
      <div className="fixed inset-0 w-full h-full opacity-60 pointer-events-none z-0">
        <Waves
          lineColor="#75BEE9"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
          xGap={12}
          yGap={36}
        />
      </div>

      <div className="hidden lg:block absolute top-[3%] right-[4%] text-[0.6vw] tracking-[0.2em] font-sans-h2h text-[#75BEE9]/60 text-right z-0">
        <span>COLLECTIONS</span><br />
        <span className="text-[#75BEE9]/60">S2U 2025</span>
      </div>

      <div className="hidden lg:flex absolute bottom-[4%] right-[2%] transform -rotate-90 origin-bottom-right text-[0.6vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/50 items-center gap-[1vw] z-0">
        <span>PROJECT HEARTS</span>
        <span className="w-[3vw] h-[1px] bg-[#75BEE9]/40"></span>
      </div>

      <div className="hidden lg:flex absolute bottom-[3%] left-1/2 transform -translate-x-1/2 flex-col items-center gap-[0.5vw] z-0">
        <span className="text-[0.5vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/70 uppercase ml-[0.3em]">Scroll</span>
        <div className="w-[1px] h-[5vh] bg-[#75BEE9]/20 overflow-hidden relative">
          <motion.div 
            className="w-full h-[50%] bg-[#75BEE9]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Track list */}
      <div className="relative lg:absolute lg:top-[2%] lg:right-[18%] xl:right-[22%] xl:top-[5%] w-full lg:w-[35%] xl:w-[20%] flex flex-col tracking-tighter scale-90 lg:scale-[0.6] xl:scale-[0.7] transform origin-top-right z-10 items-center lg:items-start" style={{ fontSize: 'clamp(40px, 8.5vw, 130px)', lineHeight: '0.9' }}>
        <div className="flex items-start font-rude uppercase lg:w-full">
            <span className="text-black font-black font-sans tracking-widest mt-2 lg:mt-[0.5vw] mr-2 lg:mr-[0.5vw]" style={{ fontSize: 'clamp(12px, 1.5vw, 24px)' }}>01</span>
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-4 lg:px-[1vw] pt-[0.2vw] pb-[0.8vw] rounded-[5px]"
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                RUDE!
            </TextHighlighter>
        </div>
        <div className="mt-0 lg:mt-[-0.2vw] flex items-start ml-16 lg:ml-[6vw] font-focus uppercase lg:w-full">
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-4 lg:px-[1vw] pt-[0.2vw] pb-[0.8vw] rounded-[5px]"
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                FOCUS
            </TextHighlighter>
            <span className="text-black font-black font-sans tracking-widest mt-2 lg:mt-[0.5vw] ml-2 lg:ml-[0.5vw]" style={{ fontSize: 'clamp(12px, 1.5vw, 24px)' }}>02</span>
        </div>
        <div className="-mt-4 lg:mt-[-1vw] flex items-start -ml-8 lg:ml-[-2vw] font-style lg:w-full" style={{ fontSize: '1.2em' }}>
            <span className="text-black font-black font-sans tracking-widest mt-4 lg:mt-[1vw] mr-2 lg:mr-[0.5vw]" style={{ fontSize: 'clamp(10px, 1.25vw, 20px)' }}>03</span>
            <TextHighlighter 
                triggerType="auto" 
                highlightColor="#75BEE9" 
                className="text-white px-4 lg:px-[1vw] pt-[0.2vw] pb-[1.5vw] rounded-[5px]"
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                Style
            </TextHighlighter>
        </div>
      </div>

      {/* PHOTO 1 - BIG TOP LEFT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        className="relative lg:absolute lg:top-[4%] lg:left-[4%] w-[90%] mx-auto lg:mx-0 lg:w-[55%] xl:w-[58%] aspect-video lg:aspect-auto lg:h-[42%] xl:h-[48%] rounded-3xl lg:rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <LazyVideo
          src='https://res.cloudinary.com/dqywjlje7/video/upload/f_auto,q_auto/v1777807052/cam2_aeuzsn.webm'
          poster={img1}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </motion.div>

      {/* BRAND NAME - HEART logo HEARTS */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="relative lg:absolute lg:top-[48%] xl:top-[54%] lg:left-[8%] xl:left-[12%] w-full lg:w-[58%] xl:w-[52%] flex justify-center lg:justify-start items-center gap-0 z-10"
      >
        <span className="font-serif-h2h font-bold tracking-tight uppercase" style={{ fontSize: 'clamp(20px, 5.5vw, 80px)', lineHeight: 1 }}>
          HEART
        </span>
        <img 
            src={h2hLogo} 
            alt="H2H" 
            style={{ width: 'clamp(24px, 6vw, 90px)', height: 'clamp(24px, 6vw, 90px)', flexShrink: 0, marginTop: '-0.3vw', marginLeft: '0.5vw', marginRight: '0.5vw' }} 
        />
        <span className="font-serif-h2h font-bold tracking-tight uppercase" style={{ fontSize: 'clamp(20px, 5.5vw, 80px)', lineHeight: 1 }}>
          HEARTS
        </span>
      </motion.div>

      {/* PHOTO 3 - TALL RIGHT IMAGE */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="relative lg:absolute lg:bottom-[2%] w-[80%] mx-auto lg:mx-0 lg:w-[38%] xl:w-[33%] lg:right-[1.5%] aspect-[3/4] lg:aspect-auto lg:h-[55%] xl:h-[60%] justify-end rounded-3xl lg:rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <LazyVideo
          src='https://res.cloudinary.com/dqywjlje7/video/upload/f_auto,q_auto/v1777807053/cam1_trivye.webm'
          poster={img1}
          className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </motion.div>

      {/* MEMBER NAMES */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative lg:absolute lg:top-[68%] xl:top-[72%] lg:left-[36%] xl:left-[40%] flex flex-col items-center lg:items-start font-serif-h2h font-bold tracking-wide z-10"
        style={{ fontSize: 'clamp(12px, 1.6vw, 24px)', lineHeight: '1.2' }}
      >
        <div className="flex items-center gap-2 lg:gap-[0.2vw] ml-8 lg:ml-[2vw] xl:ml-[4vw] mt-2 lg:mt-[1.5vh]">
          {MEMBER.slice(0, 4).map((name, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }} className="whitespace-nowrap">
                {isEven ? (
                  <TextHighlighter triggerType="auto" highlightColor="#75BEE9" className="text-white px-2 lg:px-[0.4vw] py-[0.1vh]" rounded="rounded-none" transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}>{name}</TextHighlighter>
                ) : ( <span className="text-[#75BEE9] px-2 lg:px-[0.4vw]">{name}</span> )}
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center gap-2 lg:gap-[0.2vw] ml-0 lg:ml-[0.3vw]">
          {MEMBER.slice(4, 8).map((name, i) => {
            const globalIndex = i + 4;
            const isEven = globalIndex % 2 === 0;
            return (
              <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + globalIndex * 0.05 }} className="whitespace-nowrap">
                {isEven ? (
                  <TextHighlighter triggerType="auto" highlightColor="#75BEE9" className="text-white px-2 lg:px-[0.4vw] py-[0.1vh]" rounded="rounded-none" transition={{ duration: 0.5, delay: 0.7 + globalIndex * 0.05 }}>{name}</TextHighlighter>
                ) : ( <span className="text-[#75BEE9] px-2 lg:px-[0.4vw]">{name}</span> )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* PHOTO 2 - BOTTOM LEFT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
        className="relative lg:absolute lg:top-[64%] xl:top-[66%] lg:left-[4%] w-[70%] mx-auto lg:mx-0 lg:w-[31%] xl:w-[35%] aspect-[4/3] lg:aspect-auto lg:h-[28%] xl:h-[32%] rounded-3xl lg:rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <img 
            src={img1} 
            alt="Heart2Hearts Photo 2" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
            draggable={false} 
        />
      </motion.div>

    </div>
  );
}