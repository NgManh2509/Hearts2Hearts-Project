import React from 'react'
import albumData from '../data/albumData'
import { motion } from 'framer-motion'
import CurvedLoop from '@/support/curveText'
import DotField from '../../@/components/DotField'

const AlbumCard = ({album}) => {
    return (
        <a
            href={album.albumLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-[320px] block relative group aspect-square overflow-hidden bg-gray-100 cursor-pointer transition-all duration-300"
        >
            <img
                src={album.albumCover}
                alt={album.albumName}
                className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute md:inset-0 md:flex md:flex-col md:items-center md:justify-center md:p-4 max-md:bottom-0 max-md:right-0 max-md:p-0 max-md:m-0 max-md:-translate-x-2 max-md:translate-y-2 flex flex-col items-end md:items-center">
                    <span className="text-gray-300 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-1 max-w-full truncate px-1">
                        {album.albumType || 'nodata'}
                    </span>
                    <span className="text-white text-sm sm:text-base lg:text-lg font-bold font-serif text-right md:text-center line-clamp-3 break-words px-1">
                        {album.albumName || 'nodata'}
                    </span>
                </div>
            </div>
        </a>
    )
}


const TextAnimate = ({text, idx = 0, className}) => {
    return (
       <motion.div 
        initial="initial"
        whileHover="hovered"
        className={`relative block overflow-hidden cursor-pointer break-words ${className || ''}`}
       >
        <motion.div 
            variants={{
                initial:{y : 0},
                hovered: {y : '-100%'}
            }}
            transition={{
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }}
        >
            {text}
        </motion.div>
        <motion.div 
            className="absolute inset-0"
            variants={{
                initial:{y : '100%'},
                hovered: {y : '0%'}
            }}
            transition={{
                duration: 0.4,
                ease: [0.76, 0, 0.24, 1]
            }}
       >
            {text}
       </motion.div>
       </motion.div>
    )
}

const AlbumPage = () => {
  return (
    <div className='w-full h-screen bg-[#fdfdfd] text-black overflow-hidden flex flex-col lg:flex-row relative z-10'>
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
        {/* Decorative Stars */}
       
        {/* Left Side: Album Grid */}
        <div className='relative w-full lg:w-1/2 h-1/2 lg:h-full [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]'>
            <div className="absolute left-0 w-full z-10 md:-top-[1%] -top-[3.5%]">
                <div className="w-full">
                    <CurvedLoop 
                        text="ALBUM" 
                        speed={1} 
                        curveHeight={50} 
                        fontSize={64} 
                        color="#000000" 
                        height={200} 
                        gap={0.5} 
                        easing={0.05} 
                        direction="left" 
                        interactive={true} 
                        className="text-black"
                    />
                </div>
            </div>
            
            <div className='w-full h-full p-4 md:p-8 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col relative z-0'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-auto py-12 pt-32'>
                    {albumData.map((album) => (
                        <AlbumCard key={album.id} album={album} />
                    ))}
                </div>
            </div>
        </div>

        {/* Right Side: Album Info & Tracklist */}
        <div className='w-full lg:w-1/2 h-1/2 lg:h-full p-6 md:py-16 md:px-8 lg:pl-10 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-2 pb-30'>
            {albumData.map((album, idx) => (
                <div 
                    key={`info-${album.id}`} 
                    className={`w-full flex flex-col ${idx % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}
                >
                    <TextAnimate
                        text={album.albumType}
                        className="mb-0 text-gray-500 text-sm font-semibold tracking-[0.2em] uppercase"
                    />
                    
                    <TextAnimate 
                        text={album.albumName} 
                        className="text-4xl md:text-5xl font-black uppercase font-sans tracking-tighter text-black" 
                    />
                    
                    <ul className={`mt-2 space-y-2 ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        {album.listSongs.map((song, sIdx) => (
                            <li 
                                key={sIdx} 
                                className="text-base md:text-lg font-medium text-gray-600 font-sans opacity-80 hover:opacity-100 hover:text-black transition-all flex items-center gap-3"
                                style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}
                            >
                                <span className="text-xs font-mono opacity-50 text-gray-500">{String(sIdx + 1).padStart(2, '0')}</span>
                                <TextAnimate text={song} className="" />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AlbumPage