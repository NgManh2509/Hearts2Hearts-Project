import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import DotField from '../../@/components/DotField';
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
          if (video.paused) {
            video.load();
            video.play().catch(() => { });
          }
        } else {
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
    <div className="relative w-[100vw] h-[100vh] overflow-hidden bg-[#FAFAFA] select-none text-[#75BEE9] backdrop-blur-3xl block">

      {/* Background Dots */}
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

      {/* Collections Text */}
      <div className="absolute top-[1.49vw] right-[4vw] text-[0.6vw] tracking-[0.2em] font-sans-h2h text-[#75BEE9]/60 text-right z-0">
        <span>COLLECTIONS</span><br />
        <span className="text-[#75BEE9]/60">S2U 2025</span>
      </div>

      {/* Project Hearts Text */}
      <div className="absolute flex bottom-[1.98vw] right-[2vw] transform -rotate-90 origin-bottom-right text-[0.6vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/50 items-center gap-[1vw] z-0">
        <span>PROJECT HEARTS</span>
        <span className="w-[3vw] h-[0.05vw] bg-[#75BEE9]/40"></span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute flex bottom-[1.49vw] left-[50vw] transform -translate-x-[50%] flex-col items-center gap-[0.5vw] z-0">
        <span className="text-[0.5vw] tracking-[0.3em] font-sans-h2h text-[#75BEE9]/70 uppercase ml-[0.3em]">Scroll</span>
        <div className="w-[0.05vw] h-[2.48vw] bg-[#75BEE9]/20 overflow-hidden relative">
          <motion.div
            className="w-[100%] h-[50%] bg-[#75BEE9]"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Track list (Zigzag) */}
      <div className="absolute top-[2.48vw] right-[22vw] w-[20vw] flex flex-col tracking-tighter scale-[0.7] transform origin-top-right z-10 items-start" style={{ fontSize: '6.8vw', lineHeight: '0.9' }}>
        <div className="flex items-start font-rude uppercase w-[100%]">
          <span className="text-black font-black font-sans tracking-widest mt-[0.5vw] mr-[0.5vw]" style={{ fontSize: '1.26vw' }}>01</span>
          <TextHighlighter
            triggerType="auto"
            highlightColor="#75BEE9"
            className="text-white px-[1vw] pt-[0.2vw] pb-[0.8vw] rounded-[0.26vw]"
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            RUDE!
          </TextHighlighter>
        </div>
        <div className="mt-[-0.2vw] flex items-start ml-[6vw] font-focus uppercase w-[100%]">
          <TextHighlighter
            triggerType="auto"
            highlightColor="#75BEE9"
            className="text-white px-[1vw] pt-[0.2vw] pb-[0.8vw] rounded-[0.26vw]"
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            FOCUS
          </TextHighlighter>
          <span className="text-black font-black font-sans tracking-widest mt-[0.5vw] ml-[0.5vw]" style={{ fontSize: '1.26vw' }}>02</span>
        </div>
        <div className="mt-[-1vw] flex items-start ml-[-2vw] font-style w-[100%]" style={{ fontSize: '1.2em' }}>
          <span className="text-black font-black font-sans tracking-widest mt-[1vw] mr-[0.5vw]" style={{ fontSize: '1.05vw' }}>03</span>
          <TextHighlighter
            triggerType="auto"
            highlightColor="#75BEE9"
            className="text-white px-[1vw] pt-[0.2vw] pb-[1.5vw] rounded-[0.26vw]"
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
        className="absolute top-[1.98vw] left-[4vw] w-[58vw] h-[23.8vw] rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <LazyVideo
          src='https://res.cloudinary.com/dqywjlje7/video/upload/f_auto,q_auto/v1777807052/cam2_aeuzsn.webm'
          poster={img1}
          className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </motion.div>

      {/* BRAND NAME - HEART logo HEARTS */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        className="absolute top-[26.78vw] left-[12vw] w-[52vw] flex justify-start items-center gap-0 z-10"
      >
        <span className="font-serif-h2h font-bold tracking-tight uppercase" style={{ fontSize: '4.18vw', lineHeight: 1 }}>
          HEART
        </span>
        <img
          src={h2hLogo}
          alt="H2H"
          style={{ width: '4.71vw', height: '4.71vw', flexShrink: 0, marginTop: '-0.3vw', marginLeft: '0.5vw', marginRight: '0.5vw' }}
        />
        <span className="font-serif-h2h font-bold tracking-tight uppercase" style={{ fontSize: '4.18vw', lineHeight: 1 }}>
          HEARTS
        </span>
      </motion.div>

      {/* PHOTO 3 - TALL RIGHT IMAGE */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="absolute bottom-[1.5vw] right-[1.5vw] w-[33vw] h-[25vw] justify-end rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <LazyVideo
          src='https://res.cloudinary.com/dqywjlje7/video/upload/f_auto,q_auto/v1777807053/cam1_trivye.webm'
          poster={img1}
          className="w-[100%] h-[100%] object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
        />
      </motion.div>

      {/* MEMBER NAMES */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="absolute top-[35.7vw] left-[40vw] flex flex-col items-start font-serif-h2h font-bold tracking-wide z-10"
        style={{ fontSize: '1.26vw', lineHeight: '1.2' }}
      >
        <div className="flex items-center gap-[0.2vw] ml-[4vw] mt-[0.74vw]">
          {MEMBER.slice(0, 4).map((name, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + i * 0.05 }} className="whitespace-nowrap">
                {isEven ? (
                  <TextHighlighter triggerType="auto" highlightColor="#75BEE9" className="text-white px-[0.4vw] py-[0.05vw]" rounded="rounded-none" transition={{ duration: 0.5, delay: 0.7 + i * 0.05 }}>{name}</TextHighlighter>
                ) : (<span className="text-[#75BEE9] px-[0.4vw]">{name}</span>)}
              </motion.div>
            );
          })}
        </div>
        <div className="flex items-center gap-[0.2vw] ml-[0.3vw]">
          {MEMBER.slice(4, 8).map((name, i) => {
            const globalIndex = i + 4;
            const isEven = globalIndex % 2 === 0;
            return (
              <motion.div key={name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.7 + globalIndex * 0.05 }} className="whitespace-nowrap">
                {isEven ? (
                  <TextHighlighter triggerType="auto" highlightColor="#75BEE9" className="text-white px-[0.4vw] py-[0.05vw]" rounded="rounded-none" transition={{ duration: 0.5, delay: 0.7 + globalIndex * 0.05 }}>{name}</TextHighlighter>
                ) : (<span className="text-[#75BEE9] px-[0.4vw]">{name}</span>)}
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
        className="absolute top-[31.72vw] left-[4vw] w-[35vw] h-[13.5vw] rounded-[2vw] overflow-hidden h2h-shadow group z-10"
      >
        <img
          src={img1}
          alt="Heart2Hearts Photo 2"
          className="w-[100%] h-[100%] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          draggable={false}
        />
      </motion.div>

    </div>
  );
}