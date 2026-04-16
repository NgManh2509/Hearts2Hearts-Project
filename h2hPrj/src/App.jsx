import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IconBar from './components/IconBar'
import HomePage from './components/HomePage'
import MemberPage from './components/MemberPage'
import MusicApp from './components/MusicApp'
import MiniPlayer from './components/MiniPlayer'
import musicData from './data/musicData'

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [musicOpen, setMusicOpen] = useState(false);
  const [isMiniVisible, setMiniVisible] = useState(false);
  const [playingSong, setPlayingSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const musicAppRef = useRef(null)

  const handlePlayingSong = (song, playing) => {
    console.log("Đang chơi:", song?.title, "| Playing:", playing)
    setPlayingSong(song)
    setIsPlaying(playing)
    if(song) setMiniVisible(true)
  }

  const handlePlayPause = () => {
    if (musicAppRef.current) {
      musicAppRef.current.togglePlay(playingSong);
    }
  };

  const handlePrev = () => {
    if(!playingSong) return;
    const index = musicData.findIndex(song => song.id === playingSong.id)
    const prevIdx = index <= 0 ? musicData.length - 1 : index - 1;
    const prevSong = musicData[prevIdx];
    if(musicAppRef.current){
      musicAppRef.current.playExternal(prevSong)
    }
  }

  const handNext = () =>{
    if(!playingSong) return
    const index = musicData.findIndex(song => song.id === playingSong.id)
    const nextIndex = index + 1 >= musicData.length ? 0 : index + 1
    const nextSong = musicData[nextIndex]
    if (musicAppRef.current) musicAppRef.current.playExternal(nextSong);
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: '-60%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-60%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <HomePage />
          </motion.div>
        )}
        
        {activeTab === 'member' && (
          <motion.div
            key="member"
            initial={{ opacity: 0, x: '50%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '40%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <MemberPage />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music App — luôn mount để audio không bị reset */}
      <MusicApp
        ref={musicAppRef}
        isOpen={musicOpen}
        onClose={() => setMusicOpen(false)}
        canPlay={musicOpen}
        onPlayStateChange={handlePlayingSong}
      />
      

      <MiniPlayer
        song={playingSong}
        isPlaying={isPlaying}
        isVisible={isMiniVisible}
        onPlayPause={handlePlayPause}
        onPrev={handlePrev}
        onNext={handNext}
      />

      <IconBar 
        onHomeClick={() => setActiveTab('home')}
        onMemberClick={() => setActiveTab('member')}
        onMusicClick={() => setMusicOpen(prev => !prev)}
      />
    </div>
  )
}

export default App
