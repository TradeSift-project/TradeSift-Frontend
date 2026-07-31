import { ZoomIn, ZoomOut, RotateCw, Maximize2, Move } from 'lucide-react'

const DocumentViewer = ({ fileName }) => {
  return (
    <div className="flex flex-col h-full bg-[#E5E6E8] rounded-2xl border border-gray-200 overflow-hidden shadow-inner">
      {/* Viewer Toolbar */}
      <div className="flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 shrink-0">
        <span className="text-sm font-semibold text-gray-700 truncate max-w-[200px]">{fileName}</span>
        
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition">
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-medium text-gray-500 w-10 text-center">100%</span>
          <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition">
            <ZoomIn size={16} />
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="Rotate">
            <RotateCw size={16} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="Fit to width">
            <Maximize2 size={16} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded transition" title="Pan">
            <Move size={16} />
          </button>
        </div>
      </div>

      {/* Viewer Content Area (Mock PDF Placeholder) */}
      <div className="flex-1 relative overflow-auto p-4 flex items-center justify-center min-h-[600px]">
        <div className="w-full max-w-lg aspect-[1/1.4] bg-white shadow-md border border-gray-200 flex flex-col items-center justify-center rounded">
          <div className="w-3/4 h-8 bg-gray-100 rounded mb-8"></div>
          <div className="w-5/6 h-4 bg-gray-50 rounded mb-4"></div>
          <div className="w-5/6 h-4 bg-gray-50 rounded mb-4"></div>
          <div className="w-4/6 h-4 bg-gray-50 rounded mb-4"></div>
          
          <div className="w-full px-8 mt-10">
            <div className="w-full h-px bg-gray-200 mb-6"></div>
            <div className="flex justify-between w-full mb-2">
              <div className="w-1/3 h-4 bg-gray-100 rounded"></div>
              <div className="w-1/4 h-4 bg-gray-100 rounded"></div>
            </div>
            <div className="flex justify-between w-full mb-2">
              <div className="w-1/4 h-4 bg-gray-50 rounded"></div>
              <div className="w-1/5 h-4 bg-gray-50 rounded"></div>
            </div>
            <div className="flex justify-between w-full mb-2">
              <div className="w-1/2 h-4 bg-gray-50 rounded"></div>
              <div className="w-1/6 h-4 bg-gray-50 rounded"></div>
            </div>
          </div>
          
          <span className="text-gray-300 font-medium tracking-widest uppercase mt-auto mb-10 text-sm">
            Interactive Document Preview
          </span>
        </div>
      </div>
    </div>
  )
}

export default DocumentViewer
