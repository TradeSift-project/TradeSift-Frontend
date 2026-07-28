import { motion } from 'framer-motion'
import { FileText, Table, CheckSquare, Search, Tag, CornerDownRight } from 'lucide-react'
import { fadeUp } from '../../../../../animations/variants'

const SupportedDocuments = () => {
  return (
    <section
      id="documents"
      data-nav-theme="light"
      data-nav-variant="glass"
      className="bg-white px-6 py-24 lg:px-20 border-b border-gray-150"
    >
      <div className="mx-auto max-w-[1280px]">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Mock OCR Invoice extraction visualization */}
          <div className="bg-neutral-50 border border-gray-200 rounded-[28px] p-6 lg:p-8 font-mono text-[11px] text-gray-700 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gray-100/50 border-b border-gray-200/60 px-4 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-bold">manifest_invoice_v3.pdf</span>
              <div className="flex gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
            </div>

            <div className="mt-8 space-y-5 pt-2">
              
              {/* Row 1 */}
              <div className="relative border border-amber-300 bg-amber-500/5 rounded-lg p-3">
                <span className="absolute -top-2.5 left-2 bg-amber-500 text-black px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider">HS_CODE_EXTRACTED</span>
                <p className="text-gray-400">8504.40.90 - ELECTRONICS INTEGRATED CIRCUIT MODULES</p>
              </div>

              {/* Row 2 */}
              <div className="relative border border-emerald-300 bg-emerald-500/5 rounded-lg p-3">
                <span className="absolute -top-2.5 left-2 bg-emerald-500 text-white px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider">CONSIGNEE_MATCH</span>
                <p className="text-gray-400">IMPORTER NAME: AHMED WEBS LTD (REG #12039-A)</p>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative border border-blue-300 bg-blue-500/5 rounded-lg p-3">
                  <span className="absolute -top-2.5 left-2 bg-blue-500 text-white px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider">CONTAINER_NUM</span>
                  <p className="text-gray-400">HLXU8902341</p>
                </div>
                <div className="relative border border-purple-300 bg-purple-500/5 rounded-lg p-3">
                  <span className="absolute -top-2.5 left-2 bg-purple-500 text-white px-1.5 py-0.5 rounded text-[8px] font-bold tracking-wider">GROSS_WT</span>
                  <p className="text-gray-400">23,800 KG</p>
                </div>
              </div>

              {/* Typographic Document lines */}
              <div className="space-y-1.5 text-gray-400/60 font-sans text-[10px] pl-1">
                <p>COUNTRY OF ORIGIN: CHINA (CHINA-PAKISTAN FTA APPLICABLE)</p>
                <p>PORT OF LOADING: SHANGHAI PORT // PORT OF DISCHARGE: KARACHI (KICT)</p>
                <p>DELIVERY ORDER REFERENCE: DO-902381-KARACHI</p>
              </div>

            </div>
          </div>

          {/* Right: Copy details (No cards!) */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="flex flex-col gap-6"
          >
            <span className="font-mono text-xs uppercase tracking-[2.4px] text-amber-600 font-bold bg-amber-50 px-3 py-1 rounded-full w-fit">
              Layout Parsers
            </span>
            <h2 className="font-geist text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-[44px] leading-tight">
              Extract and Map All Cargo Data Points
            </h2>
            <p className="text-base leading-[1.6] text-gray-500 max-w-lg">
              Our AI layouts are trained directly on Pakistani terminal gate, customs agent, and shipping line document templates, making extraction accurate without configuration overhead.
            </p>

            <div className="mt-2 space-y-4">
              <div className="flex items-start gap-2.5">
                <CornerDownRight size={16} className="text-amber-500 mt-1 shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Commercial Invoices & packing lists</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CornerDownRight size={16} className="text-amber-500 mt-1 shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Bills of Lading & Delivery Orders</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CornerDownRight size={16} className="text-amber-500 mt-1 shrink-0" />
                <span className="text-sm font-semibold text-gray-800">Weighment slips, transport notes, & custom gate passes</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CornerDownRight size={16} className="text-amber-500 mt-1 shrink-0" />
                <span className="text-sm font-semibold text-gray-800">PSW regulatory filings & WeBOC declarations</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default SupportedDocuments
