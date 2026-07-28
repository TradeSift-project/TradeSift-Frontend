import { motion } from 'framer-motion'
import { fadeUp } from '../../../../../animations/variants'

const Benefits = () => {
  return (
    <section
      id="benefits"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-white px-6 py-24 lg:px-20 border-b border-gray-150"
    >
      <div className="mx-auto max-w-[1280px]">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
            Key Metrics
          </span>
          <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[48px] leading-tight">
            Terminal Efficiency At Scale
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            TradeSift simplifies document flows, reducing compliance blockages and vehicle handling time.
          </p>
        </motion.div>

        {/* Stats Grid (No repetitive boxes!) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-10 text-center md:text-left">
          
          {/* Stat 1 */}
          <div className="flex flex-col gap-3">
            <span className="font-geist text-[48px] sm:text-[60px] font-bold text-gray-900 tracking-tight leading-none">
              99.2%
            </span>
            <h3 className="font-geist text-base font-bold text-gray-900">
              Extraction Accuracy
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs md:max-w-none">
              Our specialized parser processes invoices, weights, and seal numbers with human-level accuracy.
            </p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col gap-3 md:border-l md:border-gray-200 md:pl-10">
            <span className="font-geist text-[48px] sm:text-[60px] font-bold text-amber-550 tracking-tight leading-none text-amber-600">
              90%
            </span>
            <h3 className="font-geist text-base font-bold text-gray-900">
              Filing Time Reduction
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs md:max-w-none">
              Auto-filling ERP data fields instantly instead of manually reading, comparing, and re-typing forms.
            </p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col gap-3 md:border-l md:border-gray-200 md:pl-10">
            <span className="font-geist text-[48px] sm:text-[60px] font-bold text-gray-900 tracking-tight leading-none">
              &lt; 1s
            </span>
            <h3 className="font-geist text-base font-bold text-gray-900">
              Sub-Second Parsing
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-xs md:max-w-none">
              Every document is scanned, validated, and cross-referenced in under a second for real-time operations.
            </p>
          </div>

        </div>

      </div>
    </section>
  )
}

export default Benefits
