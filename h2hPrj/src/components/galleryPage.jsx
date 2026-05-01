import { useRef, useEffect, useState } from "react";
import imgCnt from '../data/imgCnt.json';
import { motion, useMotionValue, useTransform, useMotionValueEvent } from "framer-motion";

const images = Array.from({ length: imgCnt.count }, (_, i) => {
  return {
    type: 'image',
    src: new URL(`../assets/galleryImg/h2h (${i + 1}).webp`, import.meta.url).href,
    alt: `h2h (${i + 1})`
  };
});

const CameraOverlay = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-100 p-6 md:p-8 flex flex-col justify-between">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.15]">
        <div className="w-[33.333%] h-full border-x border-white" />
        <div className="absolute h-[33.333%] w-full border-y border-white" />
      </div>

      <div className="relative flex justify-between items-start font-mono text-xs md:text-sm font-bold tracking-widest text-white">
        <div className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-[pulse_1.5s_ease-in-out_infinite] shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          PLAYING
        </div>
        <div className="opacity-40">HD • 60</div>
      </div>

      <div className="relative flex justify-between items-end font-mono text-xs md:text-sm font-bold tracking-widest text-white">
        <div className="flex items-center">00:00:00</div>
        <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-[10px] opacity-60">
          1X
        </div>
      </div>
    </div>
  );
};

const TextAnimate = ({text}) => {
    return (
        <motion.div 
            className='relative block overflow-hidden whitespace-nowrap text-4xl md:text-6xl font-bold text-white tracking-tightery'
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

const PaginationNumber = ({ index, scrollIndex, total }) => {
  const distanceRaw = useTransform(scrollIndex, (latest) => {
    let d = index - latest;
    const half = total / 2;
    if (d > half) d -= total;
    if (d < -half) d += total;
    return d;
  });

  const distance = useTransform(distanceRaw, (d) => Math.abs(d));
  const opacity = useTransform(distance, [0, 1, 2, 2.5], [1, 0.4, 0.1, 0]);
  const scale = useTransform(distance, [0, 1, 2, 3], [1.2, 0.9, 0.7, 0.5]);
  const xTranslate = useTransform(distanceRaw, (d) => d * 50);

  return (
    <motion.span
      style={{ x: xTranslate, opacity, scale, position: "absolute" }}
      className="font-mono font-bold text-xl md:text-2xl text-white pointer-events-none"
    >
      {index + 1}
    </motion.span>
  );
};

// Nhận singleWidthRef thay vì singleWidth (state) để tránh re-render
const SlidingPagination = ({ x, singleWidthRef, total }) => {
  const scrollIndex = useTransform(x, (latestX) => {
    const sw = singleWidthRef.current;
    if (!sw) return 0;
    let progress = -(latestX + sw) / sw;
    progress = ((progress % 1) + 1) % 1;
    return progress * total;
  });

  return (
    <div className="relative h-12 w-[160px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
      {Array.from({ length: total }).map((_, i) => (
        <PaginationNumber key={i} index={i} scrollIndex={scrollIndex} total={total} />
      ))}
    </div>
  );
};

// --- COMPONENT CHÍNH ---
const AUTO_SCROLL_SPEED = 0.6;

const GalleryPage = () => {
  const singleWidthRef = useRef(0);
  const carouselRef = useRef(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);
  const rafRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const tripleImages = [...images, ...images, ...images];
  const total = images.length;


  useEffect(() => {
    if (!carouselRef.current) return;

    const measure = () => {
      if (!carouselRef.current) return;
      const children = carouselRef.current.children;
      if (!children[total]) return;

      const newSWidth = children[total].offsetLeft - children[0].offsetLeft;

      if (newSWidth > 0 && newSWidth !== singleWidthRef.current) {
        if (singleWidthRef.current === 0) {
          x.set(-newSWidth);
        }
        
        singleWidthRef.current = newSWidth;
      }
    };
    const observer = new ResizeObserver(() => {
      measure();
    });
    observer.observe(carouselRef.current);
    return () => observer.disconnect();
  }, [total, x]);
  useEffect(() => {
    const tick = () => {
      if (!isDragging.current) {
        x.set(x.get() - AUTO_SCROLL_SPEED);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, []);

  const handleDragStart = () => {
    isDragging.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  };

  const handleDragEnd = () => {
    resumeTimerRef.current = setTimeout(() => {
      isDragging.current = false;
    }, 1500); // resume sau 1.5s kể từ khi thả
  };

  useMotionValueEvent(x, "change", (latest) => {
    const sw = singleWidthRef.current;
    if (!sw) return;
    // Giữ x trong khoảng [-1.5sw, -0.5sw] để wrap liền mạch
    if (latest > -sw * 0.5) {
      x.set(latest - sw);
    } else if (latest < -sw * 1.5) {
      x.set(latest + sw);
    }
  });

  return (
    <section className="relative min-h-screen bg-[#0a0a0a] py-10 xl:py-20 flex flex-col justify-center overflow-hidden">
      <CameraOverlay />

      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-5 xl:mb-8 relative z-10 flex justify-between items-end">
        <TextAnimate text="MEMORIES" />
      </div>

      {/* Image Carousel */}
      <div className="px-6 mb-6 xl:mb-12 relative z-10 overflow-hidden">
        <motion.div
          ref={carouselRef}
          drag="x"
          style={{ x }}
          dragElastic={0}
          dragConstraints={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="flex gap-4 xl:gap-8 cursor-grab active:cursor-grabbing w-max"
        >
          {tripleImages.map((image, index) => (
            <motion.div
              key={index}
              className="relative shrink-0 h-[40vh] xl:h-[450px] w-auto overflow-hidden rounded-[5px] xl:rounded-[10px] bg-neutral-900 shadow-xl"
            >
              <img
                src={image.src}
                alt={image.alt}
                decoding="async"
                className="h-full w-auto object-cover pointer-events-none"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 flex justify-end items-center relative z-10">
        <SlidingPagination x={x} singleWidthRef={singleWidthRef} total={total} />
      </div>
    </section>
  );
};

export default GalleryPage;