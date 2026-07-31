const ExportButton = ({ icon: Icon, title, description, primary = false, onClick, status }) => {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start p-5 rounded-xl border text-left transition-all ${
        primary 
          ? 'bg-[#FDF6F0] border-[#F87103]/20 hover:bg-[#F87103]/10 hover:border-[#F87103]/30 shadow-sm' 
          : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between w-full mb-3">
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${primary ? 'bg-white shadow-sm text-[#F87103]' : 'bg-gray-100 text-gray-700'}`}>
          <Icon size={20} />
        </div>
        {status && (
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
            {status}
          </span>
        )}
      </div>
      <span className={`text-sm font-bold ${primary ? 'text-gray-900' : 'text-gray-800'}`}>
        {title}
      </span>
      <span className="text-xs text-gray-500 mt-1 line-clamp-2">
        {description}
      </span>
    </button>
  )
}

export default ExportButton
