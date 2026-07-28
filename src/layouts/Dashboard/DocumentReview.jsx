import { useParams, useNavigate } from 'react-router-dom'
import ExtractionReview from './components/documents/ExtractionReview/ExtractionReview'

const DocumentReview = () => {
  const { documentId } = useParams()
  const navigate = useNavigate()

  return (
    <ExtractionReview
      documentId={documentId}
      onBack={() => navigate('/dashboard/documents')}
      onSave={() => {
        // Safe callback logic, can trigger state update in real backend later
        navigate('/dashboard/documents')
      }}
    />
  )
}

export default DocumentReview
