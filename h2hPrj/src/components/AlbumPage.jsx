import React from 'react'
import albumData from '../data/albumData'
import { motion } from 'framer-motion'
import CurvedLoop from '@/support/curveText'
import DotField from '../../@/components/DotField'

const AlbumCard = ({ album }) => {
    return (
        <a
            href={album.albumLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-[100%] block relative group aspect-square overflow-hidden bg-gray-100 cursor-pointer transition-all duration-300"
        >
            <img
                src={album.albumCover}
                alt={album.albumName}
                className="w-[100%] h-[100%] object-cover object-center transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-[0.84vw]">
                    <span className="text-gray-300 text-[0.73vw] font-semibold uppercase tracking-widest mb-[0.21vw] max-w-[100%] whitespace-nowrap px-[0.21vw]">
                        {album.albumType || 'nodata'}
                    </span>
                    <span className="text-white text-[1.15vw] font-bold font-serif text-center max-w-[100%] px-[0.21vw]">
                        {album.albumName || 'nodata'}
                    </span>
                </div>
            </div>
        </a>
    )
}


const TextAnimate = ({ text, idx = 0, className }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden cursor-pointer whitespace-nowrap ${className || ''}`}
        >
            <motion.div
                variants={{
                    initial: { y: 0 },
                    hovered: { y: '-100%' }
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
                    initial: { y: '100%' },
                    hovered: { y: '0%' }
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

const TextAnimate1 = ({ text, idx = 0, className }) => {
    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={`relative block overflow-hidden cursor-pointer whitespace-nowrap ${className || ''}`}
        >
            <div>
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={{
                            initial: { y: 0 },
                            hovered: { y: '-100%' }
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.025 * index,
                        }}
                        className='inline-block'
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
            <div className="absolute inset-0">
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        variants={{
                            initial: { y: '100%' },
                            hovered: { y: '0%' }
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.76, 0, 0.24, 1],
                            delay: 0.025 * index,
                        }}
                        className='inline-block'
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    )
}

const AlbumPage = () => {
    return (
        <div className='w-[100vw] h-[100vh] bg-[#fdfdfd] text-black overflow-hidden flex flex-row relative z-10'>
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

            {/* Left Side: Album Grid */}
            <div className='relative w-[50vw] h-[100vh] [mask-image:linear-gradient(to_right,transparent_0%,black_15%,black_85%,transparent_100%)]'>
                <div className="absolute left-0 w-[100%] z-10 -top-[1%]">
                    <div className="w-[100%]">
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

                <div className='w-[100%] h-[100%] p-[1.67vw] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col relative z-0'>
                    <div className='grid grid-cols-4 gap-[0.84vw] my-auto py-[2.51vw] pt-[6.69vw]'>
                        {albumData.map((album) => (
                            <AlbumCard key={album.id} album={album} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Side: Album Info & Tracklist */}
            <div className='w-[50vw] h-[100vh] py-[3.35vw] px-[1.67vw] pl-[2.09vw] pb-[6.28vw] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-[0.42vw]'>
                {albumData.map((album, idx) => (
                    <div
                        key={`info-${album.id}`}
                        className={`w-[100%] flex flex-col ${idx % 2 === 0 ? 'items-start text-left' : 'items-end text-right'}`}
                    >
                        <TextAnimate
                            text={album.albumType}
                            className="mb-0 text-gray-500 text-[0.73vw] font-semibold tracking-[0.2em] uppercase max-w-[100%]"
                        />

                        <TextAnimate1
                            text={album.albumName}
                            className="text-[2.51vw] font-black uppercase font-sans tracking-tighter text-black max-w-[100%]"
                        />

                        <ul className={`mt-[0.42vw] space-y-[0.42vw] max-w-[100%] ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                            {album.listSongs.map((song, sIdx) => (
                                <li
                                    key={sIdx}
                                    className="text-[0.94vw] font-medium text-gray-600 font-sans opacity-80 hover:opacity-100 hover:text-black transition-all flex items-center gap-[0.63vw] max-w-[100%]"
                                    style={{ flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse' }}
                                >
                                    <span className="text-[0.63vw] shrink-0 font-mono text-gray-400">{String(sIdx + 1).padStart(2, '0')}</span>
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