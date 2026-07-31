export const mockProcessingJob = {
  id: 'IMP-2026-00124',
  type: 'Import',
  operation: 'Gate-In',
  description: 'Auto Parts Shipment from Dubai',
  totalDocuments: 4,
  uploadedAt: new Date().toISOString(),
}

export const mockPipelineStages = [
  { id: 'type_detection', label: 'Document Type Detection', status: 'completed' },
  { id: 'ocr', label: 'OCR', status: 'completed' },
  { id: 'extraction', label: 'Field Extraction', status: 'completed' },
  { id: 'normalization', label: 'Data Normalization', status: 'processing' },
  { id: 'cross_doc', label: 'Cross-Document Comparison', status: 'pending' },
  { id: 'business_validation', label: 'Business Validation', status: 'pending' },
  { id: 'human_review', label: 'Human Review', status: 'pending' },
  { id: 'approved', label: 'Approved Structured Data', status: 'pending' }
]

export const mockProcessingDocuments = [
  {
    id: 'doc_1',
    name: 'Commercial Invoice',
    fileName: 'INV-40291.pdf',
    type: 'invoice',
    uploadedAt: '2 mins ago',
    stage: 'extraction',
    status: 'completed',
    confidence: 98,
    actionRequired: false
  },
  {
    id: 'doc_2',
    name: 'Packing List',
    fileName: 'PL-40291.pdf',
    type: 'packing_list',
    uploadedAt: '2 mins ago',
    stage: 'extraction',
    status: 'completed',
    confidence: 96,
    actionRequired: false
  },
  {
    id: 'doc_3',
    name: 'Bill of Lading',
    fileName: 'BL-99281.pdf',
    type: 'bill_of_lading',
    uploadedAt: '2 mins ago',
    stage: 'extraction',
    status: 'completed',
    confidence: 99,
    actionRequired: false
  },
  {
    id: 'doc_4',
    name: 'Delivery Order',
    fileName: 'DO-1123.pdf',
    type: 'delivery_order',
    uploadedAt: '2 mins ago',
    stage: 'extraction',
    status: 'requires_review',
    confidence: 65,
    actionRequired: true
  }
]

export const mockProcessingIssues = [
  {
    id: 'iss_1',
    type: 'Low Confidence',
    severity: 'warning',
    documentId: 'doc_4',
    documentName: 'Delivery Order',
    field: 'Consignee Name',
    description: 'OCR confidence is below threshold (65%). Manual review recommended.',
    actionLabel: 'Review Field'
  },
  {
    id: 'iss_2',
    type: 'Missing Data',
    severity: 'error',
    documentId: 'doc_4',
    documentName: 'Delivery Order',
    field: 'Gross Weight',
    description: 'Required field is missing from the document.',
    actionLabel: 'Resolve Issue'
  }
]
