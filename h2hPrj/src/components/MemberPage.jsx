import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import memberData from '../data/memberData';
import MemberDesktop from './member/memberCardDesktop';
import DotField from '../../@/components/DotField';

const DRAG_BUFFER = 40;
const VELOCITY_THRESHOLD = 500;
const GAP = 50;
const SPRING_OPTIONS = { type: 'spring', stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [-(index + 1) * trackItemOffset, -index * trackItemOffset, -(index - 1) * trackItemOffset];
  
  // Create a 3D coverflow effect
  const rotateY = useTransform(x, range, [30, 0, -30], { clamp: false });
  const scale = useTransform(x, range, [0.85, 1, 0.85], { clamp: false });
  const opacity = useTransform(x, range, [0.4, 1, 0.4], { clamp: false });
  const zIndex = useTransform(x, range, [0, 10, 0], { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex items-center justify-center cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        rotateY: rotateY,
        scale: scale,
        opacity: opacity,
        zIndex: zIndex,
        transformStyle: 'preserve-3d',
      }}
      transition={transition}
    >
      <div className="w-full h-full pointer-events-auto">
        <MemberDesktop 
          name={item.stageName}
          bornPlace={item.birthPlace}
          birthDay={item.birthDay}
          pos={item.pos}
          bio={item.bio}
          images={item.imageLink}
        />
      </div>
    </motion.div>
  );
}

function useWindowDimensions() {
  const [dim, setDim] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1200,
    h: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  useEffect(() => {
    const handleResize = () => setDim({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return dim;
}

function Carousel({
  items,
  baseWidth = 900,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = true,
}) {
  const { w: windowWidth, h: windowHeight } = useWindowDimensions();
  
  // Scale down based on both width (take at most 85% width) 
  // AND height (take at most 60% height to leave room for IconBar/dots)
  // Aspect ratio is 5:3, meaning width = height * (5/3)
  const maxWidthByScreen = windowWidth * 0.85;
  const maxHeightByScreen = windowHeight * 0.65;
  const targetWidthByHeight = maxHeightByScreen * (5 / 3);

  const itemWidth = Math.min(baseWidth, maxWidthByScreen, targetWidthByHeight);
  const trackItemOffset = itemWidth + GAP;
  
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener('mouseenter', handleMouseEnter);
      container.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition(prev => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length, loop]);

  // Adjust x position dynamically to prevent layout breaking when resizing screen
  useEffect(() => {
    x.set(-position * trackItemOffset);
  }, [position, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition(prev => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0
        }
      };

  const activeIndex =
    items.length === 0 ? 0 : loop ? (position - 1 + items.length) % items.length : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-full`}
    >
      <motion.div
        className="flex"
        drag={isAnimating ? false : 'x'}
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1200,
          perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
          x,
          marginLeft: `calc(50% - ${itemWidth / 2}px)`
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div className={`flex w-full justify-center mt-6 md:mt-8 lg:mt-10 pb-4`}>
        <div className="flex justify-center gap-4 z-20">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                activeIndex === index
                    ? 'bg-black'
                    : 'bg-[#d4d4d4]'
              }`}
              animate={{
                scale: activeIndex === index ? 1.4 : 1
              }}
              onClick={() => setPosition(loop ? index + 1 : index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MemberPage() {
    return (
        <div className="w-full min-h-[100dvh] bg-[#fdfdfd] relative flex flex-col items-center justify-center pt-10 pb-[120px] overflow-hidden">
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
            <div className="relative z-10 w-full flex-grow flex items-center justify-center pointer-events-none">
                <div className="w-full relative pointer-events-auto">
                    <Carousel items={memberData} baseWidth={1000} loop={true} />
                </div>
            </div>
        </div>
    )
}
