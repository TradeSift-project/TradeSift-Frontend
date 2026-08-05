import { motion } from 'framer-motion'
import { Database, Download, Cpu, ArrowRight } from 'lucide-react'
import { fadeUp, scaleIn, staggerContainer } from '../../../../../animations/variants'

const Integrations = () => {
  return (
    <section
      id="integrations"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-neutral-50 px-6 py-24 lg:px-20 border-b border-gray-200"
    >
      <div className="mx-auto max-w-[1280px]">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
            Data Output
          </span>
          <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[48px] leading-tight">
            Seamless ERP System Feeds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            TradeSift sits alongside your current operations. Whether you integrate through secure REST APIs or utilize download templates, we match your workflow.
          </p>
        </motion.div>

        {/* Custom diagrammatic integration section */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative flex flex-col md:grid md:grid-cols-3 items-center justify-between gap-8 mt-12 bg-white border border-gray-200 rounded-[32px] p-8 lg:p-12 shadow-sm"
        >
          
          {/* Node 1: AI Engine */}
          <motion.div variants={scaleIn} className="flex flex-col items-center text-center p-6 bg-neutral-50 border border-gray-150 rounded-2xl w-full max-w-[280px]">
            <div className="h-10 w-10 rounded-xl bg-black text-[#FAF0CB] flex items-center justify-center mb-4">
              <Cpu size={20} />
            </div>
            <h3 className="font-geist text-sm font-bold text-gray-900">TradeSift Validation Engine</h3>
            <p className="text-[11px] text-gray-400 mt-2 leading-relaxed">
              Processes raw paperwork and converts it into fully validated cargo parameters.
            </p>
          </motion.div>

          {/* Connectors / Mid block */}
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center text-gray-300 w-full gap-2">
            <span className="text-[10px] font-mono font-bold text-amber-600 tracking-wider">OUTPUT FLOW</span>
            <div className="flex items-center gap-1.5 animate-pulse">
              <ArrowRight size={18} className="text-amber-500 hidden md:block" />
            </div>
          </motion.div>

          {/* Node 2: System Outputs (APIs + Sheets) */}
          <div className="flex flex-col gap-4 w-full max-w-[340px]">
            
            {/* API Integration */}
            <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-neutral-50/50 hover:bg-neutral-50 transition duration-200">
              <div className="h-8 w-8 rounded-lg bg-black text-amber-500 flex items-center justify-center shrink-0">
                <Database size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Direct ERP REST API</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                  Connect direct mapping fields into your database or terminal operating system.
                </p>
              </div>
            </motion.div>

            {/* Offline Excel export */}
            <motion.div variants={fadeUp} className="flex items-start gap-4 p-4 border border-gray-100 rounded-xl bg-neutral-50/50 hover:bg-neutral-50 transition duration-200">
              <div className="h-8 w-8 rounded-lg bg-black text-[#FAF0CB] flex items-center justify-center shrink-0">
                <Download size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900">Excel / CSV File Exports</h4>
                <p className="text-[10px] text-gray-500 mt-1 leading-normal">
                  For operations running legacy offline terminals. Download template-formatted sheets.
                </p>
              </div>
            </motion.div>

          </div>

        </motion.div>

      </div>
    </section>
  )
}

export default Integrations
