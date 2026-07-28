import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const CTA = () => {
  return (
    <section
      id="cta"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-white px-6 py-20 lg:px-20"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="mx-auto flex max-w-5xl flex-col items-center gap-8 rounded-[36px] border border-gray-200 shadow-md bg-white px-8 py-16 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      >
        <h2 className="max-w-2xl font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl md:text-[40px] md:leading-[1.15]">
          Ready to automate your terminal document workflows?
        </h2>
        
        <p className="max-w-lg text-sm leading-relaxed text-gray-500 sm:text-base">
          Connect your incoming paperwork with your operational systems automatically using TradeSift AI.
        </p>
        
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <MotionLink
            to="/signup"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full bg-black px-8 py-3.5 text-xs font-bold tracking-wider text-white transition-all duration-200 hover:bg-black/95"
          >
            REQUEST DEMO
          </MotionLink>
          <MotionLink
            to="/login"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-full border border-gray-200 bg-white px-8 py-3.5 text-xs font-semibold tracking-wider text-black transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
          >
            SIGN IN
          </MotionLink>
        </div>
      </motion.div>
    </section>
  )
}

export default CTA
