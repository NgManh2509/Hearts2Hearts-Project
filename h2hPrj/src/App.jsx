import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import IconBar from './components/IconBar'
import HomePage from './components/HomePage'
import MemberPage from './components/MemberPage'

function App() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {activeTab === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, x: '-50%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-50%' }}
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
            exit={{ opacity: 0, x: '50%' }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <MemberPage />
          </motion.div>
        )}
      </AnimatePresence>

      <IconBar 
        onHomeClick={() => setActiveTab('home')}
        onMemberClick={() => setActiveTab('member')}
      />
    </div>
  )
}

export default App
