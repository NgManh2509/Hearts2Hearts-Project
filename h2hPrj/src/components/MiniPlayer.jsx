import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdSkipPrevious, MdSkipNext } from 'react-icons/md';

/* ─── Spring presets ─── */
const MORPH_SPRING = { type: 'spring', stiffness: 380, damping: 30, mass: 0.9 };
const CONTENT_SPRING = { type: 'spring', stiffness: 500, damping: 36 };

const MiniPlayer = ({ song, isPlaying, isVisible, onPlayPause, onPrev, onNext }) => {
  const [isControls, setIsControls] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const handleCardClick = (e) => {
    if (e.target.closest('button')) return;
    setIsControls((prev) => !prev);
  };

  if (!song) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        /* Root slide-in from right */
        <motion.div
          key="miniplayer-root"
          initial={{ x: 100, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 340, damping: 26 }}
          style={{ position: 'fixed', top: 20, right: 20, zIndex: 60 }}
        >
          {/* ─── Shape-morphing container ─── */}
          <motion.div
            animate={isMinimized
              ? { width: 64, height: 64, borderRadius: 32, backgroundColor: 'rgba(255,255,255,0.15)', padding: 0 }
              : { width: 360, height: 72, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.25)', padding: 8 }
            }
            initial={false}
            transition={MORPH_SPRING}
            onClick={() => { if (isMinimized) setIsMinimized(false); }}
            whileHover={isMinimized ? {
              scale: 1.08,
              boxShadow: '0 0 0 1px rgba(255,255,255,0.5), 0 14px 40px rgba(0,0,0,0.15)',
            } : {}}
            whileTap={isMinimized ? { scale: 0.94 } : {}}
            style={{
              position: 'relative',
              overflow: 'hidden',
              cursor: isMinimized ? 'pointer' : 'default',
              boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            }}
          >
            <AnimatePresence mode="wait">
              {/* ════════════ BUBBLE STATE ════════════ */}
              {isMinimized ? (
                <motion.div
                  key="bubble"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.4 }}
                  transition={{ ...CONTENT_SPRING, delay: 0.04 }}
                  style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Vinyl disc with framer-motion spin */}
                  <motion.div
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={isPlaying
                      ? { duration: 4, repeat: Infinity, ease: 'linear' }
                      : { type: 'spring', stiffness: 60, damping: 14 }
                    }
                    style={{
                      width: 48, height: 48,
                      borderRadius: '50%',
                      overflow: 'hidden',
                      position: 'relative',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
                    }}
                  >
                    <img
                      src='https://cdn-images.dzcdn.net/images/artist/6d659e8b2bed3307ee9535c322f55379/1000x1000-000000-80-0-0.jpg'
                      alt="cover"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    {/* Spindle hole */}
                    <div style={{
                      position: 'absolute', top: '50%', left: '50%',
                      width: 9, height: 9,
                      transform: 'translate(-50%,-50%)',
                      borderRadius: '50%',
                      background: 'rgba(240,240,235,0.9)',
                      boxShadow: '0 0 0 2px rgba(0,0,0,0.2)',
                      zIndex: 10,
                    }} />
                  </motion.div>

                  {/* Ripple ring — only when playing */}
                  {isPlaying && (
                    <motion.div
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.75, opacity: 0 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.2 }}
                      style={{
                        position: 'absolute',
                        width: 48, height: 48,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(255,255,255,0.65)',
                        pointerEvents: 'none',
                      }}
                    />
                  )}
                </motion.div>

              ) : (
                /* ════════════ FULL STATE ════════════ */
                <motion.div
                  key="full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, delay: 0.12 }}
                  style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  {/* Minimize button */}
                  <motion.button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (isControls) setIsControls(false);
                      else setIsMinimized(true);
                    }}
                    title={isControls ? 'Back' : 'Minimize'}
                    whileHover={{ scale: 1.12, backgroundColor: 'rgba(255,255,255,0.06)' }}
                    whileTap={{ scale: 0.88 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    style={{
                      width: 44, height: 44, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.06)',
                      border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer', flexShrink: 0, marginLeft: 4,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {isControls ? (
                        <motion.svg
                          key="back-icon"
                          initial={{ rotate: -30, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 30, opacity: 0 }}
                          transition={{ duration: 0.18 }}
                          style={{ width: 16, height: 16, stroke: '#aaa', strokeWidth: 2.5, fill: 'none' }}
                          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                        >
                          <polyline points="15 18 9 12 15 6" />
                        </motion.svg>
                      ) : (
                        <motion.svg
                          key="minimize-icon"
                          initial={{ scaleX: 0, opacity: 0 }}
                          animate={{ scaleX: 1, opacity: 1 }}
                          exit={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          style={{ width: 14, height: 14, stroke: '#aaa', strokeWidth: 2.5, fill: 'none' }}
                          strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                        >
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Cover card */}
                  <div
                    onClick={handleCardClick}
                    style={{
                      flex: 1, height: '100%', borderRadius: 10,
                      position: 'relative', overflow: 'hidden', cursor: 'pointer',
                      backgroundImage: `url('https://cdn-images.dzcdn.net/images/artist/6d659e8b2bed3307ee9535c322f55379/1000x1000-000000-80-0-0.jpg')`,
                      backgroundSize: 'cover', backgroundPosition: 'center',
                      userSelect: 'none',
                    }}
                  >
                    {/* Dark overlay */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to right, rgba(0,0,0,0.72), rgba(0,0,0,0.38), rgba(0,0,0,0.18))',
                      zIndex: 10, pointerEvents: 'none',
                    }} />

                    {/* Info panel */}
                    <motion.div
                      animate={isControls ? { opacity: 0, x: -18 } : { opacity: 1, x: 0 }}
                      transition={{ ...CONTENT_SPRING, duration: 0.2 }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 30,
                        display: 'flex', alignItems: 'center', padding: '0 12px', gap: 12,
                        pointerEvents: isControls ? 'none' : 'auto',
                      }}
                    >
                      {/* Play / Pause */}
                      <motion.button
                        onClick={(e) => { e.stopPropagation(); onPlayPause && onPlayPause(); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.88 }}
                        style={{
                          width: 44, height: 40, borderRadius: 14,
                          background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(8px)',
                          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', flexShrink: 0,
                        }}
                      >
                        <AnimatePresence mode="wait">
                          {isPlaying ? (
                            <motion.svg key="pause" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }} style={{ width: 15, height: 15, fill: 'white' }} viewBox="0 0 24 24">
                              <rect x="7" y="5" width="3" height="14" rx="1.5" />
                              <rect x="14" y="5" width="3" height="14" rx="1.5" />
                            </motion.svg>
                          ) : (
                            <motion.svg key="play" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.15 }} style={{ width: 15, height: 15, fill: 'white', transform: 'translateX(1px)' }} viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </motion.svg>
                          )}
                        </AnimatePresence>
                      </motion.button>

                      {/* Title + artist */}
                      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{song.title}</span>
                        <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontWeight: 500, letterSpacing: '0.03em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: 1 }}>Hearts2Hearts</span>
                      </div>

                      {/* Playing indicator */}
                      {isPlaying && (
                        <motion.span
                          animate={{ opacity: [1, 0.15, 1], scale: [1, 1.3, 1] }}
                          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ width: 7, height: 7, borderRadius: '50%', background: '#1dd1a1', flexShrink: 0, marginRight: 4, boxShadow: '0 0 8px rgba(29,209,161,0.9)', display: 'block' }}
                        />
                      )}
                    </motion.div>

                    {/* Controls panel */}
                    <motion.div
                      animate={isControls ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
                      transition={{ ...CONTENT_SPRING, duration: 0.2 }}
                      style={{
                        position: 'absolute', inset: 0, zIndex: 30,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '0 12px',
                        pointerEvents: isControls ? 'auto' : 'none',
                      }}
                    >
                      {[
                        { icon: <MdSkipPrevious size={22} color="white" />, fn: onPrev },
                        {
                          icon: (
                            <svg style={{ width: 15, height: 15, fill: 'white', transform: (isPlaying) ? 'none' : 'translateX(1px)' }} viewBox="0 0 24 24">
                              {isPlaying
                                ? <><rect x="7" y="5" width="3" height="14" rx="1.5" /><rect x="14" y="5" width="3" height="14" rx="1.5" /></>
                                : <path d="M8 5v14l11-7z" />}
                            </svg>
                          ),
                          fn: onPlayPause, highlight: true,
                        },
                        { icon: <MdSkipNext size={22} color="white" />, fn: onNext },
                      ].map((btn, i) => (
                        <motion.button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); btn.fn && btn.fn(); }}
                          whileHover={{ scale: 1.08, backgroundColor: btn.highlight ? 'rgba(255,255,255,0.32)' : 'rgba(0,0,0,0.55)' }}
                          whileTap={{ scale: 0.9 }}
                          style={{
                            flex: 1, height: 44, borderRadius: 14,
                            background: btn.highlight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.35)',
                            backdropFilter: 'blur(8px)',
                            border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            cursor: 'pointer',
                          }}
                        >
                          {btn.icon}
                        </motion.button>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MiniPlayer;
