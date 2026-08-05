import { Server, ShieldCheck, CheckCircle2 } from 'lucide-react'

const ApiExport = ({ endpoint, fieldsCount }) => {
  return (
    <div className="flex flex-col border border-gray-200 rounded-[24px] bg-white overflow-hidden dark:bg-neutral-900 dark:border-neutral-700">
      <div className="flex items-center gap-3 px-6 py-4 bg-gray-50 border-b border-gray-200 dark:bg-neutral-800/50 dark:border-neutral-700">
        <Server className="text-gray-500 dark:text-gray-400" size={20} />
        <span className="font-bold text-gray-900 text-sm dark:text-white">Terminal API Configuration</span>
      </div>
      
      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Destination Endpoint</span>
          <div className="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-mono text-xs text-gray-700 dark:bg-neutral-800/50 dark:text-gray-300 dark:border-neutral-700">
            {endpoint}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Format</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">JSON Payload</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Mapped Records</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-white">{fieldsCount} Fields</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Authentication</span>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheck size={14} />
              <span className="text-sm font-semibold">Verified</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider dark:text-gray-400">Mapping Status</span>
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 size={14} />
              <span className="text-sm font-semibold">Validated</span>
            </div>
          </div>
        </div>
        
        <div className="mt-2 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 dark:bg-blue-500/10 dark:border-blue-500/20">
          <div className="text-blue-600 shrink-0 mt-0.5 dark:text-blue-400">ℹ️</div>
          <p className="text-xs text-blue-800 leading-relaxed dark:text-blue-300">
            Data will be pushed directly to the terminal operational system. Ensure your configured mapping exactly matches the target schema to avoid rejection.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ApiExport
