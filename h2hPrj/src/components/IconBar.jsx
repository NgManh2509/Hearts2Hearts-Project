import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

import homePageIcon from '../assets/iconBar/homePage.png';
import memberIcon   from '../assets/iconBar/member.png';
import galleryIcon  from '../assets/iconBar/gallery.png';
import musicAppIcon from '../assets/iconBar/musicApp.png';
import scheduleIcon from '../assets/iconBar/schedule.png';
import fancamIcon   from '../assets/iconBar/fancam.png';
import albumIcon    from '../assets/iconBar/albums.png';

const iconData = [
  { name: "Home",     src: homePageIcon },
  { name: "Member",   src: memberIcon   },
  { name: "Gallery",  src: galleryIcon  },
  { name: "Music",    src: musicAppIcon },
  { name: "Calender", src: scheduleIcon },
  { name: "Stages",   src: fancamIcon   },
  { name: "Albums",   src: albumIcon    },
];

/* ─── AppIcon — macOS Dock magnify ─── */
function AppIcon({ item, onClick, mouseX }) {
  const ref = useRef(null);

  const springConfig = { mass: 0.1, stiffness: 200, damping: 15 };

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scale     = useSpring(scaleSync, springConfig);

  const widthSync = useTransform(scaleSync, [1, 1.8], [48, 86]);
  const dynWidth  = useSpring(widthSync, springConfig);

  const zIndex    = useTransform(scaleSync, (v) => Math.round(v * 10));

  const ySync     = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  const yOffset   = useSpring(ySync, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ width: dynWidth, zIndex, flexShrink: 0 }}
      onClick={onClick}
      className="relative flex items-end justify-center cursor-pointer h-full pb-2"
    >
      <motion.div
        style={{ scale, y: yOffset, transformOrigin: 'bottom center' }}
        className="absolute bottom-2 flex flex-col items-center pointer-events-none"
      >
        <img
          src={item.src}
          alt={item.name}
          draggable="false"
          className="w-12 h-12 object-contain drop-shadow-xl"
        />
        <span className="text-[11px] mt-1 font-serif-h2h font-bold text-[#75BEE9] drop-shadow-sm select-none">
          {item.name}
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ─── IconBar — Glassmorphism ─── */
const IconBar = ({
  onHomeClick,
  onMemberClick,
  onGalleryClick,
  onMusicClick,
  onCalenderClick,
  onStagesClick,
  onAlbumsClick,
}) => {
  const mouseX = useMotionValue(Infinity);

  const getClickHandler = (name) => {
    switch (name) {
      case "Home":     return onHomeClick;
      case "Member":   return onMemberClick;
      case "Gallery":  return onGalleryClick;
      case "Music":    return onMusicClick;
      case "Calender": return onCalenderClick;
      case "Stages":   return onStagesClick;
      case "Albums":   return onAlbumsClick;
      default:         return () => {};
    }
  };

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      style={{
        position:  'fixed',
        bottom:    24,
        left:      '50%',
        transform: 'translateX(-50%)',
        zIndex:    50,
        width:     'max-content',
        isolation: 'isolate',
      }}
    >
      {/* ── Glassmorphism dock ── */}
      <div
        style={{
          display:          'flex',
          flexDirection:    'row',
          alignItems:       'flex-end',
          gap:              '20px',
          height:           '85px',
          padding:          '0 20px',
          /* Glass core */
          background:       'rgba(255, 255, 255, 0.12)',
          backdropFilter:   'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          /* Border */
          border:           '1px solid rgba(255, 255, 255, 0.3)',
          borderBottom:     '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius:     '24px',
          /* Shadow */
          boxShadow: [
            '0 8px 32px rgba(0, 0, 0, 0.35)',
            '0 2px 8px  rgba(0, 0, 0, 0.25)',
            'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
            'inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
          ].join(', '),
        }}
      >
        {iconData.map((item, index) => (
          <AppIcon
            key={index}
            item={item}
            onClick={getClickHandler(item.name)}
            mouseX={mouseX}
          />
        ))}
      </div>
    </div>
  );
};

export default IconBar;