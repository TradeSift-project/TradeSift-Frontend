import { Link } from 'react-router';
import { motion } from 'framer-motion';

import bgGradient from '../../../../assets/authPageGradient.png';
import Logo from '../../../../assets/Logo.png';

import {
    fadeLeft,
    staggerContainer,
    fadeUp,
} from '../../../animations/variants';


const MotionLink = motion.create(Link)

const AuthHero = () => {
    return (
        <section className='hidden lg:flex lg:w-[42%] xl:w-[45%]'>
            <div className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-black px-8 py-8 lg:px-10 lg:py-10 xl:px-14 xl:py-14 2xl:px-16 2xl:py-16 text-white select-none">

                {/* Background Gradient Lines Asset */}
                <div className="absolute bottom-0 left-0 right-0 pointer-events-none z-0">
                    <img
                        src={bgGradient}
                        alt="Background pattern"
                        className="w-full object-cover object-bottom opacity-70 mix-blend-lighten"
                    />
                </div>

                {/* Top: Logo Container (Empty Placeholder) */}
                <MotionLink
                    variants={fadeLeft}
                    initial="hidden"
                    animate="visible"

                    to='/' className="z-10 flex h-12 items-center gap-3">
                    <img src={Logo} alt="" className='object-contain w-auto h-10' />
                    <span className="font-geist text-xl font-bold pt-1.5">TradeSift</span>
                </MotionLink>

                {/* Middle: Main Content */}
                <motion.main
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="z-10 my-auto max-w-[540px] space-y-4 pt-8 pb-16">
                    <motion.h1
                        variants={fadeUp}
                        className="font-geist text-4xl font-bold leading-[1.1] tracking-tight text-white lg:text-[42px] xl:text-[46px] 2xl:text-[56px]">
                        AI-Native <br />
                        Operating System <br />
                        for <span className="text-amber-500">Trade.</span>
                    </motion.h1>

                    <motion.div
                        variants={fadeUp}
                        className="space-y-4">
                        <motion.p
                            variants={fadeUp}
                            className="text-base sm:text-[16px] text-neutral-400 font-normal leading-relaxed">
                            Automate customs compliance, track shipments,
                            and orchestrate trade operations from one
                            intelligent platform.
                        </motion.p>

                        {/* Orange Accent Divider Line */}
                        <div className="h-[2px] w-12 bg-amber-500 rounded-full" />

                        <motion.p className="text-sm sm:text-base text-neutral-400 font-normal leading-relaxed max-w-[400px]">
                            Built for customs brokers, importers and enterprise teams.
                        </motion.p>
                    </motion.div>
                </motion.main>

                {/* Bottom: Footer Layout */}
                <footer className="z-10 space-y-4 text-xs font-normal text-neutral-500 tracking-wide">
                    <p>© 2026 TradeSift Technologies. All rights reserved.</p>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-neutral-400">
                        <a href="#" className="hover:text-white transition">Privacy Policy</a>
                        <span className="text-neutral-600 font-bold text-[10px]">•</span>
                        <a href="#" className="hover:text-white transition">Terms & Conditions</a>
                        <span className="text-neutral-600 font-bold text-[10px]">•</span>
                        <a href="#" className="hover:text-white transition">Contact Us</a>
                    </div>
                </footer>

            </div>

        </section>
    )
}

export default AuthHero
