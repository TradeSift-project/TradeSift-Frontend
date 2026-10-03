import { useState, useEffect } from 'react'
import { Server, Globe, Box, Copy } from 'lucide-react'
import { getOperationById } from '../../../../services/operationService'
import { reviewService } from '../../../../services/reviewService'
import { toast } from 'sonner'
import API_BASE_URL from '../../../../services/apiConfig'

const TerminalApiIntegration = ({ jobId }) => {
  const [loading, setLoading] = useState(!!jobId)
  const [operationData, setOperationData] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!jobId) return

    let isMounted = true
    const fetchContext = async () => {
      try {
        setLoading(true)
        const opRes = await getOperationById(jobId)
        if (!opRes.success) {
          if (isMounted) setError(true)
          return
        }
        
        // Fetch extractions as real representation of the data
        let extractionData = null
        try {
          const extRes = await reviewService.getExtractionData(jobId)
          if (extRes.success) {
            extractionData = extRes.data
          }
        } catch {
          console.warn("Could not load extraction data for API preview")
        }

        if (isMounted) {
          setOperationData({
            operation: opRes.data,
            extractions: extractionData
          })
        }
      } catch {
        if (isMounted) setError(true)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    fetchContext()
    return () => { isMounted = false }
  }, [jobId])

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-neutral-800">
          <div className="p-2 bg-gray-50 rounded-lg dark:bg-neutral-800">
            <Globe size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Integration Information</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Connection details for your integration</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Base URL</label>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 font-mono overflow-hidden text-ellipsis whitespace-nowrap dark:bg-neutral-800/50 dark:border-neutral-700 dark:text-gray-300">
                {API_BASE_URL}
              </div>
              <button 
                onClick={() => copyToClipboard(API_BASE_URL)}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Authentication</label>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 dark:bg-neutral-800/50 dark:border-neutral-700">
              <p className="text-sm text-gray-600 mb-3 dark:text-gray-300">Pass your API key as a Bearer token in the Authorization header.</p>
              <div className="bg-black text-white p-3 rounded-lg font-mono text-sm overflow-x-auto dark:bg-black/50">
                Authorization: Bearer {'<YOUR_API_KEY>'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[24px] p-6 shadow-sm dark:bg-neutral-900 dark:border-neutral-800">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4 dark:border-neutral-800">
          <div className="p-2 bg-gray-50 rounded-lg dark:bg-neutral-800">
            <Server size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white">Operation JSON Response</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Example format of the structured data provided by TradeSift</p>
          </div>
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center p-12 bg-gray-50 border border-gray-100 rounded-xl dark:bg-neutral-800/30 dark:border-neutral-700/50">
              <div className="w-6 h-6 border-2 border-[#F87103] border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-sm text-gray-500 font-medium dark:text-gray-400">Loading operation context...</span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center p-12 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 dark:bg-rose-900/10 dark:border-rose-900/30 dark:text-rose-400">
              <p className="text-sm font-medium">Failed to load operation context.</p>
            </div>
          ) : !jobId ? (
            <div className="flex flex-col items-center justify-center p-12 bg-amber-50 border border-amber-100 rounded-xl dark:bg-amber-900/10 dark:border-amber-900/30">
              <Box size={24} className="text-amber-500 mb-3" />
              <p className="text-sm font-bold text-amber-800 dark:text-amber-500">No Operation Selected</p>
              <p className="text-xs text-amber-700 mt-1 dark:text-amber-400/90 text-center max-w-sm">
                Navigate to Terminal API from a specific operation's Export page to see real data, or view standard documentation.
              </p>
            </div>
          ) : operationData ? (
            <div className="relative group">
              <div className="absolute right-4 top-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => copyToClipboard(JSON.stringify(operationData, null, 2))}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-sm transition-colors"
                  title="Copy JSON"
                >
                  <Copy size={16} />
                </button>
              </div>
              <pre className="bg-[#0D1117] text-[#C9D1D9] p-6 rounded-xl overflow-x-auto text-sm font-mono leading-relaxed max-h-[500px] overflow-y-auto">
                <code>{JSON.stringify(operationData, null, 2)}</code>
              </pre>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center p-12 bg-gray-50 border border-gray-100 rounded-xl dark:bg-neutral-800/30 dark:border-neutral-700/50">
               <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Backend Support Missing</p>
               <p className="text-xs text-gray-400 mt-1 dark:text-gray-500">The backend does not currently expose the complete operational payload required for this integration preview.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TerminalApiIntegration
