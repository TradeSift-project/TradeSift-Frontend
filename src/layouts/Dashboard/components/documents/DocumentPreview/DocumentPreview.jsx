import { useState } from 'react'
import { ZoomIn, ZoomOut, RotateCw, Maximize2, FileText } from 'lucide-react'

const DocumentPreview = ({ docName = 'document.pdf', type = 'Commercial Invoice' }) => {
  const [zoom, setZoom] = useState(100)
  const [rotate, setRotate] = useState(0)

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 150))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 70))
  const handleRotate = () => setRotate((prev) => (prev + 90) % 360)

  return (
    <div className="flex flex-col gap-3 rounded-[24px] border border-[#E5E6E8] bg-white p-5 shadow-sm h-full">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-2">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[#F87103]" />
          <span className="text-xs font-bold text-gray-800 truncate max-w-[150px]">
            {docName}
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleZoomOut}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-neutral-50 rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <span className="text-[10px] font-mono font-semibold text-gray-500 w-8 text-center">
            {zoom}%
          </span>
          <button
            type="button"
            onClick={handleZoomIn}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-neutral-50 rounded-lg"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>
          <div className="h-4 w-px bg-gray-150 mx-1" />
          <button
            type="button"
            onClick={handleRotate}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-neutral-50 rounded-lg"
            title="Rotate"
          >
            <RotateCw size={13} />
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-neutral-50 rounded-lg"
            title="Fullscreen"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      {/* Mock Document Render */}
      <div className="flex-1 bg-neutral-50 rounded-xl border border-neutral-150 p-6 overflow-auto max-h-[500px] flex items-start justify-center">
        <div
          className="bg-white border border-gray-200 shadow-sm p-6 w-full max-w-[340px] font-mono text-[9px] text-gray-500 leading-relaxed transition-all"
          style={{
            transform: `scale(${zoom / 100}) rotate(${rotate}deg)`,
            transformOrigin: 'top center',
          }}
        >
          <p className="text-gray-900 font-bold mb-4 text-center tracking-wider border-b border-gray-150 pb-2 text-[10px]">
            {type.toUpperCase()}
          </p>
          <p className="my-1.5">SENDER/SHIPPER: SINO GLOBAL MANUFACTURING LTD</p>
          <p className="my-1.5">CONSIGNEE: AHMED WEBS LTD (KARACHI, PK)</p>
          <p className="my-1.5">NOTIFY PARTY: AHMED WEBS LTD</p>
          <p className="my-1.5">CARRIER: HANJIN SHIP LINE // VOYAGE: V-9023</p>
          <p className="my-1.5">PORT OF LOADING: SHANGHAI PORT, CN</p>
          <p className="my-1.5">PORT OF DISCHARGE: KARACHI (KICT)</p>
          <p className="my-1.5">DELIVERY REFERENCE: KICT-9012-PK</p>
          <p className="my-1.5">CONTAINER NUMBERS: MSCU1234567 / SEAL: SL-9043</p>
          <p className="my-1.5">BILL OF LADING: BL-784512</p>
          <p className="my-1.5">DESCRIPTION: INTEGRATED INTEGRAL CARD CHIPS MODULES</p>
          <p className="my-1.5">PACKAGES: 450 CARTONS ON WOODEN PALLETS</p>
          <p className="my-1.5">GROSS WT: 24,300 KG // NET WT: 22,900 KG</p>
          <p className="my-1.5">INVOICE VALUE: USD 42,500.00 // INCOTERMS: FOB</p>
          <p className="my-1.5">TARIFF HEADING / HS CODE: 8504.40.90</p>
          <p className="my-1.5">COUNTRY OF ORIGIN: CHINA</p>
          <p className="text-center text-gray-400 mt-4 border-t border-gray-100 pt-2 text-[8px]">
            PAGE 1 OF 1
          </p>
        </div>
      </div>
    </div>
  )
}

export default DocumentPreview
