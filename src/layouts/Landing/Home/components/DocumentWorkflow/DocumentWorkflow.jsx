import { motion } from 'framer-motion'
import { ArrowRight, FileText, Cpu, CheckSquare, Database, ArrowDown } from 'lucide-react'
import { fadeUp, staggerContainer } from '../../../../../animations/variants'

const DocumentWorkflow = () => {
  return (
    <section
      id="workflow"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-white px-6 py-24 lg:px-20 border-b border-gray-100"
    >
      <div className="mx-auto max-w-[1280px]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-semibold bg-amber-50 px-3 py-1 rounded-full">
            Pipeline Workflow
          </span>
          <h2 className="mt-4 font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[48px] leading-tight">
            How TradeSift Processes Documents
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
            TradeSift sits as a silent, intelligent orchestration layer between incoming paper documents and your terminal system database.
          </p>
        </motion.div>

        {/* Infographic Visual Diagram Flow */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="relative flex flex-col lg:flex-row items-stretch justify-between gap-8 lg:gap-4 mt-12 bg-neutral-50 rounded-[32px] p-8 lg:p-12 border border-gray-200"
        >
          
          {/* Step 1: Documents Ingest */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col justify-between items-center text-center lg:text-left lg:items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">Step 01</span>
              <h3 className="font-geist text-lg font-bold text-gray-900 mt-3">Document Ingestion</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                Operational files (PDFs, images, gate passes) are scanned or uploaded directly as they arrive at the off-dock gate.
              </p>
            </div>
            <div className="mt-6 flex gap-2 w-full justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-[10px] text-gray-600 font-medium">
                <FileText size={12} className="text-amber-500" />
                <span>Invoice.pdf</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1 text-[10px] text-gray-600 font-medium">
                <FileText size={12} className="text-amber-500" />
                <span>PackingList.jpg</span>
              </div>
            </div>
          </motion.div>

          {/* Connection 1 */}
          <motion.div variants={fadeUp} className="flex items-center justify-center text-gray-300">
            <ArrowRight size={20} className="hidden lg:block text-amber-500 animate-pulse" />
            <ArrowDown size={20} className="lg:hidden text-amber-500 animate-pulse" />
          </motion.div>

          {/* Step 2: AI Parsing */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col justify-between items-center text-center lg:text-left lg:items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">Step 02</span>
              <h3 className="font-geist text-lg font-bold text-gray-900 mt-3">AI Field Extraction</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                TradeSift AI reads, OCRs, and classifies text inside the documents in sub-seconds without manual labeling.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-center lg:justify-start w-full gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[11px] font-mono text-gray-500">Extracting: Container No...</span>
            </div>
          </motion.div>

          {/* Connection 2 */}
          <motion.div variants={fadeUp} className="flex items-center justify-center text-gray-300">
            <ArrowRight size={20} className="hidden lg:block text-amber-500 animate-pulse" />
            <ArrowDown size={20} className="lg:hidden text-amber-500 animate-pulse" />
          </motion.div>

          {/* Step 3: Cross-Doc Validation */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col justify-between items-center text-center lg:text-left lg:items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">Step 03</span>
              <h3 className="font-geist text-lg font-bold text-gray-900 mt-3">Data Validation</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                Automatically verify numbers and items across different documents. Catch weight or quantity mismatches instantly.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-2.5 py-1 font-semibold w-fit">
              <CheckSquare size={12} />
              <span>Weight verified match</span>
            </div>
          </motion.div>

          {/* Connection 3 */}
          <motion.div variants={fadeUp} className="flex items-center justify-center text-gray-300">
            <ArrowRight size={20} className="hidden lg:block text-amber-500 animate-pulse" />
            <ArrowDown size={20} className="lg:hidden text-amber-500 animate-pulse" />
          </motion.div>

          {/* Step 4: System Integration */}
          <motion.div variants={fadeUp} className="flex-1 flex flex-col justify-between items-center text-center lg:text-left lg:items-start bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">Step 04</span>
              <h3 className="font-geist text-lg font-bold text-gray-900 mt-3">ERP Synchronization</h3>
              <p className="text-xs text-gray-500 leading-relaxed mt-2">
                Structured, cleaned data is immediately pushed to your terminal ERP database or formatted as a clean Excel template.
              </p>
            </div>
            <div className="mt-6 flex items-center gap-1.5 text-[11px] text-[#0B0D12] font-semibold">
              <Database size={12} className="text-amber-500 animate-bounce" />
              <span>Syncing with ERP system...</span>
            </div>
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}

export default DocumentWorkflow
