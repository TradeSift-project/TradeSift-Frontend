import { useState, useRef, useEffect, useCallback } from 'react'
import { Camera, X, RotateCcw, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const CameraCapture = ({ onCapture, onCancel }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [capturedBlob, setCapturedBlob] = useState(null)

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error('Camera access error:', err)
      setError('Camera unavailable or permission denied.')
    }
  }, [])

  useEffect(() => {
    let activeStream = null
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        })
        activeStream = mediaStream
        setStream(mediaStream)
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
        }
      } catch (err) {
        console.error('Camera access error:', err)
        setError('Camera unavailable or permission denied.')
      }
    }
    
    initCamera()
    
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop())
      } else if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const imageUrl = canvas.toDataURL('image/jpeg', 0.9)
      setCapturedImage(imageUrl)

      canvas.toBlob((blob) => {
        if (blob) {
          // Convert Blob to File object for the upload pipeline
          const file = new File([blob], `camera_capture_${Date.now()}.jpg`, { type: 'image/jpeg' })
          setCapturedBlob(file)
        }
      }, 'image/jpeg', 0.9)
    }
  }

  const handleRetake = () => {
    setCapturedImage(null)
    setCapturedBlob(null)
  }

  const handleConfirm = () => {
    if (capturedBlob) {
      onCapture(capturedBlob)
    }
  }

  const handleClose = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
    }
    onCancel()
  }

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative flex flex-col items-center justify-center bg-black rounded-[24px] overflow-hidden w-full aspect-[3/4] md:aspect-video max-w-2xl mx-auto shadow-xl"
      >
        {/* Header Actions */}
        <div className="absolute top-4 right-4 z-20">
          <button 
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-sm transition"
          >
            <X size={20} />
          </button>
        </div>

        {error ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Camera size={48} className="text-gray-500 mb-4" />
            <p className="text-white font-semibold mb-2">{error}</p>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              Please check your browser permissions or use the device upload option instead.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-white text-black rounded-full font-bold text-sm"
            >
              Upload from Device
            </button>
          </div>
        ) : (
          <>
            {/* Video element is always mounted to preserve stream, but hidden when captured */}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted 
              className={`absolute inset-0 w-full h-full object-cover ${capturedImage ? 'hidden' : ''}`}
            />
            
            {!capturedImage ? (
              <>
                {/* Framing Guide */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-[80%] h-[70%] border-2 border-white/50 rounded-xl relative">
                    {/* Corner Indicators */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-[#F87103] rounded-tl-xl -mt-0.5 -ml-0.5"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-[#F87103] rounded-tr-xl -mt-0.5 -mr-0.5"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-[#F87103] rounded-bl-xl -mb-0.5 -ml-0.5"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-[#F87103] rounded-br-xl -mb-0.5 -mr-0.5"></div>
                    
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase">Document Area</span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-0 right-0 flex justify-center pb-4 z-20">
                  <button 
                    onClick={handleCapture}
                    className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center bg-white/20 hover:bg-white/40 transition"
                  >
                    <div className="w-12 h-12 bg-white rounded-full"></div>
                  </button>
                </div>
              </>
            ) : (
              <>
                <img src={capturedImage} alt="Captured preview" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20"></div>
                
                <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-6 pb-4 z-20">
                  <button 
                    onClick={handleRetake}
                    className="flex items-center gap-2 px-6 py-3 bg-black/60 backdrop-blur-md text-white rounded-full font-bold text-sm hover:bg-black/80 transition"
                  >
                    <RotateCcw size={18} />
                    Retake
                  </button>
                  <button 
                    onClick={handleConfirm}
                    className="flex items-center gap-2 px-6 py-3 bg-[#F87103] text-white rounded-full font-bold text-sm hover:bg-[#e06602] transition"
                  >
                    <Check size={18} />
                    Use Photo
                  </button>
                </div>
              </>
            )}
          </>
        )}
        
        <canvas ref={canvasRef} className="hidden" />
      </motion.div>
    </AnimatePresence>
  )
}

export default CameraCapture
