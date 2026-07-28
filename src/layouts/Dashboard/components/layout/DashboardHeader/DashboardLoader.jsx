import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInOpacityOnly } from '../../../../../animations/variants'

const DashboardLoader = ({ onComplete, userName = 'Ahmed Raza' }) => {
  const [stage, setStage] = useState('video')

  const handleVideoEnd = () => {
    setStage('welcome')

    // Keep welcome message visible for 1.5 seconds
    setTimeout(() => {
      setStage('exiting')
    }, 1500)
  }

  return (
    <motion.div
      variants={fadeInOpacityOnly}
      initial="visible"
      animate={stage === 'exiting' ? 'hidden' : 'visible'}
      onAnimationComplete={(definition) => {
        if (definition === 'hidden') {
          onComplete()
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      {stage === 'video' && (
        <video
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          className="h-full w-full object-cover"
        >
          <source
            src="../../../../../../assets/intro.mp4"
            type="video/mp4"
          />
        </video>
      )}

      {stage === 'welcome' && (
        <motion.h1
          variants={fadeInOpacityOnly}
          initial="hidden"
          animate="visible"
          className="font-geist text-4xl font-semibold tracking-[-0.5px] text-[#0B0D12]"
        >
          Welcome, {userName}
        </motion.h1>
      )}
    </motion.div>
  )
}

export default DashboardLoader