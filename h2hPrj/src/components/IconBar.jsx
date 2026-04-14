import React, {useState, useEffect, useRef} from 'react'
import {motion, useMotionValue, useTransform, useSpring} from 'framer-motion'
import { LIQUID_MAP } from '../support/liquidMap'


import homePageIcon from '../assets/iconBar/homePage.png';
import memberIcon from '../assets/iconBar/member.png';
import galleryIcon from '../assets/iconBar/gallery.png';
import musicAppIcon from '../assets/iconBar/musicApp.png';
import scheduleIcon from '../assets/iconBar/schedule.png';
import fancamIcon from '../assets/iconBar/fancam.png';

const iconData = [
    { name: "Home", src : homePageIcon },
    { name: "Member", src : memberIcon },
    { name: "Gallery", src : galleryIcon },
    { name: "Music", src : musicAppIcon },
    { name: "Calender", src : scheduleIcon },
    { name: "Stages", src : fancamIcon },
]

const LIQUID_CONFIG = {
    scale:2.0,
    offsetX:0.0,
    offsetY:0.1,
}

const computedSVG_X = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetX;
const computedSVG_Y = ((1 - LIQUID_CONFIG.scale) / 2) + LIQUID_CONFIG.offsetY;

function AppIcon({item, onHomeClick, onMemberClick, onGalleryClick, onMusicClick, onCalenderClick, onStagesClick, mouseX}){
  let ref = useRef(null);

  // Tính khoảng cách từ y của chuột đến tâm y của icon này
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  let scaleSync = useTransform(distance, [-200, 0, 200], [1, 2, 1]);
  let scale = useSpring(scaleSync, { mass: 0.1, stiffness: 250, damping: 15 });
  
  let heightSync = useTransform(scaleSync, [1, 2], [70, 140]);
  let dynamicHeight = useSpring(heightSync, { mass: 0.1, stiffness: 250, damping: 15 });

  // Width thay đổi theo scale làm dock giãn ngang tự nhiên
  let widthSync = useTransform(scaleSync, [1, 2], [48, 96]);
  let dynamicWidth = useSpring(widthSync, { mass: 0.1, stiffness: 250, damping: 15 });

  let zIndex = useTransform(scaleSync, (v) => Math.round(v * 10));

  // Tọa độ Y sẽ lùi dần lên (âm) khi chuột đến gần tâm của icon
  let ySync = useTransform(distance, [-150, 0, 150], [0, -25, 0]);
  let yOffset = useSpring(ySync, { mass: 0.1, stiffness: 250, damping: 15 });

  return (
    <motion.div 
        ref={ref}
        style={{
            height: dynamicHeight, 
            width: dynamicWidth, 
            zIndex: zIndex,
        }}
        key={item.name} 
        onClick={() => {
            if (item.name === "Home" && onHomeClick) onHomeClick();
            if (item.name === "Member"  && onMemberClick)  onMemberClick();
            if (item.name === "Gallery" && onGalleryClick) onGalleryClick();
            if (item.name === "Music"  && onMusicClick)  onMusicClick();
            if (item.name === "Calender"  && onCalenderClick)  onCalenderClick();
            if (item.name === "Stages"  && onStagesClick)  onStagesClick();
        }}
        className="relative flex items-center justify-center cursor-pointer w-full"
    >
        <motion.div 
            style={{ 
                scale: scale,
                y: yOffset,
                originX: 0 
            }}
            className="absolute flex flex-col items-center justify-center pointer-events-none"
        >
            <img src={item.src} alt={item.name} draggable="false" className="w-12 h-12 object-contain drop-shadow-xl" />
            <span className="text-xs mt-1 font-medium text-white select-none">{item.name}</span>
        </motion.div>
    </motion.div>
  )
}


const IconBar = ({onHomeClick, onMemberClick, onGalleryClick, onMusicClick, onCalenderClick, onStagesClick}) => {

  const mouseX = useMotionValue(Infinity);

  return (
    <>
        <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        id='icon-bar-container'
        className="no-scrollbar
            fixed bottom-[24px] left-1/2 -translate-x-1/2 z-50
            flex flex-row gap-7 items-center
            h-[85px] w-max
            border-2 border-transparent
            bg-white/[0.08] rounded-[16px] px-6
            shadow-[0_0_0_2px_rgba(255,255,255,0.6),0_16px_32px_rgba(0,0,0,0.12)]"
        style={{
           backdropFilter: 'url(#liquid-frosted)', 
           WebkitBackdropFilter: 'url(#liquid-frosted)',
           msOverflowStyle: 'none',
           scrollbarWidth: 'none',
        }}
      >
            {iconData.map((item, index) => (
                <AppIcon 
                    key={index} 
                    item={item} 
                    onHomeClick={onHomeClick}
                    onMemberClick={onMemberClick}
                    onGalleryClick={onGalleryClick}
                    onMusicClick={onMusicClick}
                    onCalenderClick={onCalenderClick}
                    onStagesClick={onStagesClick}
                    mouseX={mouseX}
                />
            ))}
      </div>
      <svg className="absolute w-0 h-0" aria-hidden="true" xmlns="http://www.w3.org/1999/xlink">
        <filter id="liquid-frosted" primitiveUnits="objectBoundingBox" x="-50%" y="-50%" width="200%" height="200%">
          <feImage 
            href={LIQUID_MAP}
            x={computedSVG_X}
            y={computedSVG_Y}
            width={LIQUID_CONFIG.scale}
            height={LIQUID_CONFIG.scale}
            result="map" 
            preserveAspectRatio="xMidYMid slice"
          />
          
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
          
          <feDisplacementMap id="disp" in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" to="1.4" dur="0.3s" begin="icon-bar-container.mouseover" fill="freeze" />
            <animate attributeName="scale" to="1" dur="0.3s" begin="icon-bar-container.mouseout" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>
    </>
  )
}

export default IconBar