import { KeyRound, Lock, AlertTriangle } from 'lucide-react'

const TerminalApiCredentials = () => {
  return (
    <div className="flex flex-col gap-6 bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-neutral-800">
        <div className="p-2 bg-gray-50 rounded-lg dark:bg-neutral-800">
          <KeyRound size={20} className="text-gray-500 dark:text-gray-400" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">API Credentials</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage keys for authenticating API requests</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Mocked structural layout showing missing backend support */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">API Key</label>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono flex items-center gap-2 dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-gray-500">
              Backend support unavailable
            </div>
            <button disabled className="px-4 py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed dark:bg-neutral-800">
              Copy
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">API Secret</label>
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 font-mono flex items-center gap-2 dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-gray-500">
              Backend support unavailable
            </div>
            <button disabled className="px-4 py-3 bg-gray-100 text-gray-400 rounded-xl text-sm font-bold opacity-50 cursor-not-allowed dark:bg-neutral-800">
              Copy
            </button>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 items-start dark:bg-amber-900/10 dark:border-amber-900/30">
        <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0 dark:text-amber-500" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold text-amber-800 dark:text-amber-500">Backend Support Missing</span>
          <span className="text-xs text-amber-700 leading-relaxed dark:text-amber-400/90">
            The backend currently does not provide credential generation, retrieval, regeneration, or revocation APIs. 
            Once API endpoints are available, this section will securely manage your connection keys.
          </span>
        </div>
      </div>
    </div>
  )
}

export default TerminalApiCredentials
