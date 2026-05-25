import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Glass } from '../support/liquid-glass';

import homePageIcon from '../assets/iconBar/homePage.png';
import memberIcon from '../assets/iconBar/member.png';
import galleryIcon from '../assets/iconBar/gallery.png';
import musicAppIcon from '../assets/iconBar/musicApp.png';
import fancamIcon from '../assets/iconBar/fancam.png';
import albumIcon from '../assets/iconBar/albums.png';
import creditIcon from '../assets/iconBar/note.png';

const iconData = [
  { name: "Home", src: homePageIcon },
  { name: "Member", src: memberIcon },
  { name: "Gallery", src: galleryIcon },
  { name: "Music", src: musicAppIcon },
  { name: "Albums", src: albumIcon },
  { name: "Stages", src: fancamIcon },
  { name: "Credits", src: creditIcon },
];

/* ─── AppIcon — macOS Dock magnify ─── */
function AppIcon({ item, onClick, mouseX, textColor = '#75BEE9' }) {
  const ref = useRef(null);

  const springConfig = { mass: 0.1, stiffness: 200, damping: 15 };

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scaleSync = useTransform(distance, [-150, 0, 150], [1, 1.8, 1]);
  const scale = useSpring(scaleSync, springConfig);

  const widthSync = useTransform(scaleSync, [1, 1.8], ["2.51vw", "4.5vw"]);
  const dynWidth = useSpring(widthSync, springConfig);

  const zIndex = useTransform(scaleSync, (v) => Math.round(v * 10));

  const ySync = useTransform(distance, [-150, 0, 150], ["0vw", "-0.523vw", "0vw"]);
  const yOffset = useSpring(ySync, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ width: dynWidth, zIndex, flexShrink: 0 }}
      onClick={onClick}
      className="relative flex items-end justify-center cursor-pointer h-full pb-[0.418vw]"
    >
      <motion.div
        style={{ scale, y: yOffset, transformOrigin: 'bottom center' }}
        className="absolute bottom-[0.418vw] flex flex-col items-center pointer-events-none"
      >
        <img
          src={item.src}
          alt={item.name}
          draggable="false"
          className="w-[2.51vw] h-[2.51vw] object-contain drop-shadow-xl"
        />
        <span className="text-[0.575vw] mt-[0.209vw] font-serif-h2h font-bold drop-shadow-sm select-none" style={{ color: textColor }}>
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
  onCreditClick,
  textColor,
}) => {
  const mouseX = useMotionValue(Infinity);

  const getClickHandler = (name) => {
    switch (name) {
      case "Home": return onHomeClick;
      case "Member": return onMemberClick;
      case "Gallery": return onGalleryClick;
      case "Music": return onMusicClick;
      case "Stages": return onStagesClick;
      case "Albums": return onAlbumsClick;
      case "Credits": return onCreditClick;
      default: return () => { };
    }
  };

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="origin-bottom"
      style={{
        position: 'fixed',
        bottom: '1.25vw',
        left: '50%',
        x: '-50%',
        zIndex: 50,
        width: 'max-content',
        isolation: 'isolate',
      }}
    >
      {/* ── Glassmorphism dock ── */}
      <Glass
        variant="bold"
        className="!overflow-visible !h-[4.446vw] !rounded-[1.25vw]"
        innerClassName="flex flex-row items-end gap-[1.046vw] px-[1.046vw]"
      >
        {iconData.map((item, index) => (
          <AppIcon
            key={index}
            item={item}
            onClick={getClickHandler(item.name)}
            mouseX={mouseX}
            textColor={textColor}
          />
        ))}
      </Glass>
    </motion.div>
  );
};

export default IconBar;