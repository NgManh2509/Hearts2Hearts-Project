import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Glass } from '../support/liquid-glass';

import homePageIcon from '../assets/iconBar/homePage.png';
import memberIcon   from '../assets/iconBar/member.png';
import galleryIcon  from '../assets/iconBar/gallery.png';
import musicAppIcon from '../assets/iconBar/musicApp.png';
import fancamIcon   from '../assets/iconBar/fancam.png';
import albumIcon    from '../assets/iconBar/albums.png';  

const iconData = [
  { name: "Home",     src: homePageIcon },
  { name: "Member",   src: memberIcon   },
  { name: "Gallery",  src: galleryIcon  },
  { name: "Music",    src: musicAppIcon },
  { name: "Albums",   src: albumIcon    },
  { name: "Stages",   src: fancamIcon   },
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
  onStagesClick,
  onAlbumsClick,
}) => {
  const mouseX = useMotionValue(Infinity);
  const containerScale = useMotionValue(1);

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      // Fluid responsiveness for different screen sizes
      if (width >= 1536) {
        containerScale.set(1);
      } else if (width >= 1024) {
        // Desktop responsiveness: smooth scale between 1024px and 1536px
        containerScale.set(0.75 + ((width - 1024) / (1536 - 1024)) * 0.25);
      } else if (width >= 768) {
        // Tablet: smooth scale between 768px and 1024px
        containerScale.set(0.6 + ((width - 768) / (1024 - 768)) * 0.15);
      } else {
        // Mobile
        containerScale.set(0.4 + ((Math.max(width, 320) - 320) / (768 - 320)) * 0.2);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [containerScale]);

  const getClickHandler = (name) => {
    switch (name) {
      case "Home":     return onHomeClick;
      case "Member":   return onMemberClick;
      case "Gallery":  return onGalleryClick;
      case "Music":    return onMusicClick;
      case "Stages":   return onStagesClick;
      case "Albums":   return onAlbumsClick;
      default:         return () => {};
    }
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="origin-bottom"
      style={{
        position:  'fixed',
        bottom:    24,
        left:      '50%',
        x:         '-50%',
        scale:     containerScale,
        zIndex:    50,
        width:     'max-content',
        isolation: 'isolate',
      }}
    >
      {/* ── Glassmorphism dock ── */}
      <Glass
        variant="bold"
        borderRadius={24}
        height={85}
        className="!overflow-visible"
        innerClassName="flex flex-row items-end gap-[20px] px-[20px]"
      >
        {iconData.map((item, index) => (
          <AppIcon
            key={index}
            item={item}
            onClick={getClickHandler(item.name)}
            mouseX={mouseX}
          />
        ))}
      </Glass>
    </motion.div>
  );
};

export default IconBar;