import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { fadeUp, collapse, staggerContainer } from '../../../../../animations/variants'
import { FAQS } from '../../constants/landingConstants'

export default function FAQ() {
  const [openFaqId, setOpenFaqId] = useState(1)
  const shouldReduceMotion = useReducedMotion()

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

  return (
    <section
      id="faq"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="w-full px-6 py-20 lg:px-20 font-sans bg-white flex flex-col justify-center border-b border-gray-150"
    >
      <motion.div
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="text-center mb-12"
      >
        <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-semibold">
          Common Queries
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-bold tracking-tight text-black mb-4">
          Frequently Asked Questions
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
          These are the most commonly asked questions about TradeSift's document automation capabilities.
        </p>
      </motion.div>

      <motion.div 
        initial={shouldReduceMotion ? 'visible' : 'hidden'}
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="mx-auto w-full max-w-4xl space-y-4"
      >
        {FAQS.map((faq) => {
          const isOpen = openFaqId === faq.id

          return (
            <motion.div
              key={faq.id}
              variants={fadeUp}
              className="border border-gray-200 rounded-2xl bg-white overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
              >
                <span className="font-semibold text-gray-900 text-sm sm:text-base pr-4">
                  {faq.question}
                </span>
                
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <motion.div
                variants={collapse}
                animate={isOpen ? 'visible' : 'hidden'}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 text-gray-500 text-xs sm:text-sm leading-relaxed max-w-3xl border-t border-gray-50 pt-3">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
