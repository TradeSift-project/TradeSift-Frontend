import { motion, useReducedMotion } from 'framer-motion'
import Navbar from '../Navbar'
import DashboardPreview from '../../../../../components/dashboard/DashboardPreview'
import heroImage from '../../../../../../assets/hero-image.png'
import { fadeUp, scaleIn, staggerContainer } from '../../../../../animations/variants'
import { Link } from 'react-router-dom'

const MotionLink = motion.create(Link)

const Hero = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section
      id="top"
      data-nav-theme="dark"
      data-nav-variant="transparent"
      className="relative overflow-hidden pt-26 sm:pt-32 lg:pt-40 bg-[#040509]"
    >
      <Navbar />

      <div className="relative mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-20 pt-8 sm:pt-10 lg:pt-[50px] pb-16 sm:pb-20 lg:pb-[90px]">
        <div className="relative flex flex-col items-center text-center gap-10 lg:flex-row lg:items-center lg:text-left lg:gap-4">
          <motion.div
            initial={shouldReduceMotion ? 'visible' : 'hidden'}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="relative z-20 flex w-full max-w-[660px] flex-col items-center text-center gap-6 lg:items-start lg:text-left"
          >
            <motion.span
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
              className="rounded-full border border-white/15 bg-white/5 px-4.5 py-1.5 text-xs font-mono uppercase tracking-[1.5px] text-amber-500"
            >
              Document-to-Data Automation
            </motion.span>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-geist text-[2.2rem] leading-[1.08] sm:text-[3rem] md:text-[3.5rem] lg:text-[56px] font-bold text-white tracking-[-1.5px]"
            >
              Turn Operational Documents into System-Ready Data.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
              className="max-w-[580px] text-[15px] leading-7 text-white/70 sm:text-base lg:text-lg"
            >
              TradeSift sits as an intelligent AI automation layer between incoming invoices, packing lists, 
              and bills of lading and your off-dock terminal ERP or operational software.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
              <MotionLink
                to="/signup"
                variants={fadeUp}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#FAF0CB] px-8 py-4 text-sm font-bold text-black transition hover:bg-white tracking-wider"
              >
                REQUEST DEMO
                <span aria-hidden="true">&rarr;</span>
              </MotionLink>
              <a
                href="#workflow"
                className="text-sm font-semibold text-white hover:text-amber-500 transition-colors py-2"
              >
                See how it works
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-0
              lg:inset-auto lg:flex-none lg:block lg:right-[-60px] lg:top-1/2 lg:w-[800px] lg:-translate-y-1/2"
          >
            <img
              src={heroImage}
              alt="TradeSift Hero Diagram"
              className="w-[140%] max-w-[700px] h-auto object-contain opacity-80 sm:w-[120%] sm:opacity-10 md:w-[100%] md:max-w-[760px] md:opacity-20 lg:w-full lg:max-w-none lg:opacity-100 select-none"
            />
          </motion.div>
        </div>

        <div className="relative z-10 mt-20 lg:mt-24">
          <DashboardPreview theme="dark" />
        </div>
      </div>
    </section>
  )
}

export default Hero
