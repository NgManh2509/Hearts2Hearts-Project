import React, { useRef, useEffect, useState, useCallback, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { ChevronDown, ChevronLeft, GripHorizontal } from 'lucide-react';
import musicData from '../data/musicData';

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
};

const ExploreScroll = forwardRef(function ExploreScroll(
  { onPlaySong, isOpen, onClose, onPlayStateChange, canPlay },
  ref
) {
  const scrollRef = useRef(null);
  const itemsRef = useRef([]);
  const requestRef = useRef();
  const [activeIndex, setActiveIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playingId, setPlayingId] = useState(null);
  const audioRef = useRef(null);
  const isMobile = useIsMobile();
  const dragControls = useDragControls();

  useImperativeHandle(ref, () => ({
    playExternal(song) {
      setPlayingId(song.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(song);
      if (onPlayStateChange) onPlayStateChange(song, true);
    },
    togglePlay(song, forcedState) {
      if (song && playingId !== song.id) {
        setPlayingId(song.id);
        setIsPlaying(true);
        if (onPlaySong) onPlaySong(song);
        if (onPlayStateChange) onPlayStateChange(song, true);
      } else {
        const next = forcedState !== undefined ? forcedState : !isPlaying;
        setIsPlaying(next);
        const currentSong = musicData.find(s => s.id === playingId);
        if (onPlayStateChange && currentSong) onPlayStateChange(currentSong, next);
      }
    },
  }));

  useEffect(() => {
    if (!audioRef.current || !playingId) return;
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      audioRef.current.pause();
    }
  }, [playingId, isPlaying]);

  const handlePlayToggle = (e, song) => {
    e.stopPropagation();
    if (playingId === song.id) {
      const next = !isPlaying;
      setIsPlaying(next);
      if (onPlayStateChange) onPlayStateChange(song, next);
    } else {
      setPlayingId(song.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(song);
      if (onPlayStateChange) onPlayStateChange(song, true);
    }
  };

  const handleSongEnded = () => {
    const currentIndex = musicData.findIndex(s => s.id === playingId);
    if (currentIndex !== -1) {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= musicData.length) nextIndex = 0;
      const nextSong = musicData[nextIndex];
      setPlayingId(nextSong.id);
      setIsPlaying(true);
      if (onPlaySong) onPlaySong(nextSong);
      if (onPlayStateChange) onPlayStateChange(nextSong, true);
      if (scrollRef.current && itemsRef.current[nextIndex]) {
        const targetItem = itemsRef.current[nextIndex];
        const itemCenter = targetItem.offsetTop + targetItem.offsetHeight / 2;
        scrollRef.current.scrollTo({
          top: itemCenter - scrollRef.current.clientHeight / 2,
          behavior: 'smooth',
        });
      }
    } else {
      setIsPlaying(false);
    }
  };

  const calculateScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const scrollArea = scrollRef.current;
    const scrollRect = scrollArea.getBoundingClientRect();
    const containerCenter = scrollRect.top + scrollRect.height / 2;
    const maxDistance = scrollRect.height / 1.5;
    let closestIdx = 0;
    let minDistance = Infinity;
    itemsRef.current.forEach((item, index) => {
      if (!item) return;
      const itemRect = item.getBoundingClientRect();
      const itemCenter = itemRect.top + itemRect.height / 2;
      const deltaY = itemCenter - containerCenter;
      let ratio = deltaY / maxDistance;
      ratio = Math.max(-1, Math.min(1, ratio));
      const maxOffsetX = isMobile ? 80 : 180;
      const translateX = Math.pow(ratio, 2) * maxOffsetX;
      const opacity = 1 - Math.abs(ratio) * 0.85;
      const scale = 1 - Math.abs(ratio) * 0.12;
      item.style.transform = `translateX(${translateX}px) scale(${scale})`;
      item.style.opacity = opacity;
      if (Math.abs(deltaY) < minDistance) {
        minDistance = Math.abs(deltaY);
        closestIdx = index;
      }
    });
    setActiveIndex(prev => (prev !== closestIdx ? closestIdx : prev));
  }, [isMobile]);

  const handleScroll = () => {
    if (requestRef.current) cancelAnimationFrame(requestRef.current);
    requestRef.current = requestAnimationFrame(calculateScroll);
  };

  useEffect(() => {
    if (!isOpen || !scrollRef.current) return;

    // Scroll đến bài đang phát, nếu chưa phát bài nào thì về index 3
    const targetIndex = playingId
      ? musicData.findIndex(s => s.id === playingId)
      : 3;
    const safeIndex = targetIndex === -1 ? 3 : targetIndex - 1;

    // Dùng requestAnimationFrame để đảm bảo DOM đã render xong
    const raf = requestAnimationFrame(() => {
      const targetItem = itemsRef.current[safeIndex];
      if (targetItem && scrollRef.current) {
        const itemCenter = targetItem.offsetTop + targetItem.offsetHeight / 2;
        scrollRef.current.scrollTop = itemCenter - scrollRef.current.clientHeight / 2;
        calculateScroll();
        setActiveIndex(safeIndex);
      }
    });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(requestRef.current);
    };
  }, [isOpen, playingId, calculateScroll]);

  // ── Framer-motion variants ────────────────────────────────────────────────
  const desktopVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.88,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 360,
        damping: 26,
        mass: 0.75,
      },
    },
    exit: {
      opacity: 0,
      y: 24,
      scale: 0.92,
      filter: 'blur(8px)',
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const mobileVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 340,
        damping: 28,
        mass: 0.85,
      },
    },
    exit: {
      y: '100%',
      opacity: 0,
      transition: { duration: 0.22, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <>
      {/* Audio — luôn mount, không bao giờ bị unmount dù panel đóng */}
      <audio
        ref={audioRef}
        src={playingId ? musicData.find(s => s.id === playingId)?.musicSrc : undefined}
        onEnded={handleSongEnded}
      />

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Backdrop — chỉ hiện trên mobile */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      {/* Panel chính */}
      <AnimatePresence>
        {isOpen && (
          isMobile ? (
            /* ── Mobile: bottom sheet ── */
            <motion.div
              key="music-panel-mobile"
              className="fixed z-50 left-0 right-0 bottom-0 font-['Lato',_sans-serif] antialiased"
              variants={mobileVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag="y"
              dragControls={dragControls}
              dragListener={false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 0.6 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 500) {
                  onClose();
                }
              }}
            >
              <div
                className="bg-[#F4F4F9] flex flex-col overflow-hidden relative"
                style={{
                  borderRadius: '15px 15px 0 0',
                  boxShadow: '0 -20px 60px rgba(0,0,0,0.25), inset 0 0 0 5px #fff',
                  maxHeight: 'calc(90vh - env(safe-area-inset-bottom, 0px))',
                  paddingBottom: 'env(safe-area-inset-bottom, 12px)',
                  width: '100%',
                }}
              >
                {/* Audio node đã mount ở ngoài — không cần ở đây nữa */}
                {/* Drag handle — mobile */}
                <div
                  className="flex justify-center pt-3 pb-1 flex-shrink-0 cursor-grab active:cursor-grabbing touch-none"
                  onPointerDown={(e) => dragControls.start(e)}
                >
                  <div className="w-10 h-[4px] rounded-full bg-black/15" />
                </div>

                {/* Header */}
                <div
                  className="flex justify-between items-center z-10 flex-shrink-0"
                  style={{ padding: '8px 24px 8px' }}
                >
                  <h1
                    className="font-['Playfair_Display',_serif] font-extrabold text-[#111] tracking-[-0.5px]"
                    style={{ fontSize: '26px' }}
                  >
                    Explore
                  </h1>
                  <button
                    onClick={onClose}
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ background: 'transparent' }}
                    aria-label="Close music player"
                  >
                    <ChevronDown className="w-5 h-5 text-[#111]" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Scroll Area */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar min-h-0"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                  }}
                >
                  <div className="flex flex-col gap-3" style={{ padding: '220px 0' }}>
                    {musicData.map((song, index) => {
                      const isActive = activeIndex === index;
                      const imgActive = 78;
                      const imgInactive = 70;
                      return (
                        <div
                          key={index}
                          ref={(el) => (itemsRef.current[index] = el)}
                          className="flex justify-start w-full transition-opacity duration-100 ease-out will-change-transform"
                          style={{ paddingLeft: '16px' }}
                        >
                          <div
                            className={`flex items-center p-2 rounded-[60px] transition-all duration-300 ease-out ${isActive ? 'bg-white/98 shadow-[0_15px_40px_rgba(0,0,0,0.04)] scale-[1.03]' : 'bg-transparent'}`}
                            style={{ paddingRight: isActive ? '14px' : '8px' }}
                          >
                            <div className="relative z-10 flex-shrink-0">
                              <img
                                src={song.songCover}
                                alt={song.title}
                                className={`rounded-full object-cover transition-all duration-300 ease-out ${isActive ? 'grayscale-0 shadow-[0_15px_25px_rgba(0,0,0,0.1)]' : 'grayscale shadow-[0_10px_20px_rgba(0,0,0,0.08)]'}`}
                                style={{ width: isActive ? imgActive : imgInactive, height: isActive ? imgActive : imgInactive }}
                              />
                            </div>
                            <div className="flex flex-col" style={{ marginLeft: '12px', minWidth: '100px' }}>
                              <div
                                className={`font-['Playfair_Display',_serif] leading-[1.2] transition-colors duration-300 ease-out font-bold ${isActive ? 'text-[#111]' : 'text-[#999]'}`}
                                style={{ fontSize: '17px' }}
                              >
                                {song.title}
                              </div>
                              <div
                                className={`font-['Lato',_sans-serif] mt-[5px] transition-colors duration-300 ease-out ${isActive ? 'text-[#555] font-normal' : 'text-[#bbb] font-light'}`}
                                style={{ fontSize: '12px' }}
                              >
                                Hearts2Hearts
                              </div>
                            </div>
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isActive ? 'opacity-100' : 'w-0 opacity-0'}`}
                              style={{ width: isActive ? '90px' : 0, marginLeft: isActive ? '8px' : 0 }}
                            >
                              <button
                                onClick={(e) => handlePlayToggle(e, song)}
                                className="group relative flex items-center justify-center gap-[6px] bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] text-white border-none rounded-[30px] font-['Lato',_sans-serif] font-extrabold uppercase tracking-[1px] cursor-pointer hover:from-[#111] hover:to-[#222] transition-all duration-300 ease-out active:scale-95 whitespace-nowrap"
                                style={{ padding: '9px 14px', fontSize: '11px' }}
                              >
                                {playingId === song.id && isPlaying ? (
                                  <>
                                    <svg className="w-[11px] h-[11px] text-[#ff4d4d] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                    <span>Pause</span>
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-[11px] h-[11px] group-hover:text-[#1dd1a1] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <span>Play</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── Desktop: draggable floating panel ── */
            <motion.div
              key="music-panel-desktop"
              className="fixed z-50 font-['Lato',_sans-serif] antialiased"
              style={{
                left: '50%',
                top: '10%',
                x: '-50%',
                y: '-50%',
              }}
              variants={desktopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              drag
              dragMomentum={false}
              dragElastic={0.08}
              whileDrag={{ scale: 1.02, boxShadow: '0 35px 80px rgba(0,0,0,0.35)', cursor: 'grabbing' }}
            >
              {/* Card */}
              <div
                className="bg-[#F4F4F9] flex flex-col overflow-hidden relative select-none"
                style={{
                  borderRadius: '5px',
                  boxShadow: '0 25px 50px rgba(0,0,0,0.15), inset 0 0 0 6px #fff',
                  width: 'min(520px, calc(100vw - 160px))',
                  height: 'min(600px, calc(100vh - 40px))',
                }}
              >
                {/* Header — drag handle trên desktop */}
                <div
                  className="flex justify-between items-center z-10 flex-shrink-0 cursor-grab active:cursor-grabbing"
                  style={{ padding: '16px 30px 10px' }}
                >
                  <h1
                    className="font-['Playfair_Display',_serif] font-extrabold text-[#111] tracking-[-0.5px] flex items-center gap-2"
                    style={{ fontSize: '32px' }}
                  >
                    Explore
                    <GripHorizontal className="w-4 h-4 text-[#bbb] mt-1" />
                  </h1>
                  <button
                    onClick={onClose}
                    onPointerDown={(e) => e.stopPropagation()}
                    className="flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ background: 'transparent' }}
                    aria-label="Close music player"
                  >
                    <ChevronLeft className="w-5 h-5 text-[#111]" strokeWidth={2.5} />
                  </button>
                </div>

                {/* Scroll Area */}
                <div
                  ref={scrollRef}
                  onScroll={handleScroll}
                  onPointerDown={(e) => e.stopPropagation()}
                  className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth hide-scrollbar min-h-0"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,1) 15%, rgba(0,0,0,1) 85%, transparent 100%)',
                  }}
                >
                  <div className="flex flex-col gap-3" style={{ padding: '350px 0' }}>
                    {musicData.map((song, index) => {
                      const isActive = activeIndex === index;
                      const imgActive = 95;
                      const imgInactive = 85;
                      return (
                        <div
                          key={index}
                          ref={(el) => (itemsRef.current[index] = el)}
                          className="flex justify-start w-full transition-opacity duration-100 ease-out will-change-transform"
                          style={{ paddingLeft: '20px' }}
                        >
                          <div
                            className={`flex items-center p-2 rounded-[60px] transition-all duration-300 ease-out ${isActive ? 'bg-white/98 shadow-[0_15px_40px_rgba(0,0,0,0.04)] scale-[1.03]' : 'bg-transparent'}`}
                            style={{ paddingRight: isActive ? '18px' : '8px' }}
                          >
                            <div className="relative z-10 flex-shrink-0">
                              <img
                                src={song.songCover}
                                alt={song.title}
                                className={`rounded-full object-cover transition-all duration-300 ease-out ${isActive ? 'grayscale-0 shadow-[0_15px_25px_rgba(0,0,0,0.1)]' : 'grayscale shadow-[0_10px_20px_rgba(0,0,0,0.08)]'}`}
                                style={{ width: isActive ? imgActive : imgInactive, height: isActive ? imgActive : imgInactive }}
                              />
                            </div>
                            <div className="flex flex-col" style={{ marginLeft: '18px', minWidth: '120px' }}>
                              <div
                                className={`font-['Playfair_Display',_serif] leading-[1.2] transition-colors duration-300 ease-out font-bold ${isActive ? 'text-[#111]' : 'text-[#999]'}`}
                                style={{ fontSize: '20px' }}
                              >
                                {song.title}
                              </div>
                              <div
                                className={`font-['Lato',_sans-serif] mt-[5px] transition-colors duration-300 ease-out ${isActive ? 'text-[#555] font-normal' : 'text-[#bbb] font-light'}`}
                                style={{ fontSize: '14px' }}
                              >
                                Hearts2Hearts
                              </div>
                            </div>
                            <div
                              className={`overflow-hidden transition-all duration-300 ease-out flex items-center ${isActive ? 'opacity-100' : 'w-0 opacity-0'}`}
                              style={{ width: isActive ? '105px' : 0, marginLeft: isActive ? '12px' : 0 }}
                            >
                              <button
                                onClick={(e) => handlePlayToggle(e, song)}
                                className="group relative flex items-center justify-center gap-[6px] bg-gradient-to-r from-[#1a1a1a] to-[#3a3a3a] text-white border-none rounded-[30px] font-['Lato',_sans-serif] font-extrabold uppercase tracking-[1px] cursor-pointer hover:from-[#111] hover:to-[#222] transition-all duration-300 ease-out active:scale-95 whitespace-nowrap"
                                style={{ padding: '10px 18px', fontSize: '12px' }}
                              >
                                {playingId === song.id && isPlaying ? (
                                  <>
                                    <svg className="w-[11px] h-[11px] text-[#ff4d4d] animate-pulse" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                    </svg>
                                    <span>Pause</span>
                                  </>
                                ) : (
                                  <>
                                    <svg className="w-[11px] h-[11px] group-hover:text-[#1dd1a1] transition-colors duration-300" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                    <span>Play</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </>
  );
});

export default ExploreScroll;