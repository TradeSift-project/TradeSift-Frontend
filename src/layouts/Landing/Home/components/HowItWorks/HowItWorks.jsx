import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, AlertTriangle, FileText, Info } from 'lucide-react'
import { fadeUp, fadeLeft, staggerContainer } from '../../../../../animations/variants'

const HowItWorks = () => {
  return (
    <section
      id="how-it-works"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-neutral-50 px-6 py-24 lg:px-20 border-b border-gray-200"
    >
      <div className="mx-auto max-w-[1280px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content (No repetitive boxes!) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full w-fit">
              Operations Audit
            </span>
            <h2 className="font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px] leading-tight">
              Instant Validation and Discrepancy Checks
            </h2>
            <p className="text-base leading-[1.6] text-gray-500 max-w-lg">
              Manual document matching takes minutes per cargo and is prone to human oversight. TradeSift automates this by comparing values across all uploaded paperwork instantly.
            </p>

            <div className="mt-4 space-y-5">
              <div className="flex gap-4">
                <span className="text-amber-500 mt-1 shrink-0 font-bold text-lg">01</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">OCR Text Mapping</h4>
                  <p className="text-xs text-gray-500 mt-1">Converts scans and photographs into structured, database-readable variables automatically.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <span className="text-amber-500 mt-1 shrink-0 font-bold text-lg">02</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Multi-File Verification</h4>
                  <p className="text-xs text-gray-500 mt-1">Cross-references weights, cargo descriptions, container marks, and values across BL, PL, and weighment slips.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-amber-500 mt-1 shrink-0 font-bold text-lg">03</span>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Instant Alert Engine</h4>
                  <p className="text-xs text-gray-500 mt-1">Highlights numeric mismatches and missing pages right at the operational gate desk.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Mock Verification Dashboard UI (High visual B2B value, zero boxes!) */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
            className="bg-white border border-gray-200 rounded-[24px] p-6 lg:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.03)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 h-40 w-40 bg-amber-500/5 rounded-full blur-3xl" />
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                <span className="text-xs font-mono font-semibold text-gray-800">Verification Feed · Job #784512</span>
              </div>
              <span className="text-[10px] font-mono bg-red-50 text-red-600 px-2 py-0.5 rounded font-semibold">
                Attention Required
              </span>
            </div>

            {/* Verification items */}
            <div className="space-y-4">
              
              {/* Check 1 */}
              <motion.div variants={fadeLeft} className="flex items-start justify-between bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-3.5">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Container Identification</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Matched HLXU-8902341 across BL and Gate Pass.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold mt-0.5">Verified</span>
              </motion.div>

              {/* Check 2 */}
              <motion.div variants={fadeLeft} className="flex items-start justify-between bg-emerald-50/50 border border-emerald-100/80 rounded-xl p-3.5">
                <div className="flex gap-3">
                  <CheckCircle2 className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Seal Code Validation</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Seal number SL-90432 Matches Packing List.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-600 font-semibold mt-0.5">Verified</span>
              </motion.div>

              {/* Check 3: Discrepancy Alert */}
              <motion.div variants={fadeLeft} className="flex items-start justify-between bg-red-50/50 border border-red-100/80 rounded-xl p-3.5">
                <div className="flex gap-3">
                  <AlertTriangle className="text-red-500 shrink-0 mt-0.5 animate-bounce" size={16} />
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">Gross Weight Discrepancy</h4>
                    <p className="text-[10px] text-gray-500 mt-0.5">Weighment Slip lists 24,150 kg, but Packing List lists 23,800 kg.</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-red-600 font-semibold mt-0.5">Discrepancy</span>
              </motion.div>

            </div>

            {/* Info footer */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mt-6 text-[10.5px] text-gray-400">
              <Info size={12} className="shrink-0" />
              <span>WeBOC integration will require manual override to submit this weighment.</span>
            </motion.div>

          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default HowItWorks
