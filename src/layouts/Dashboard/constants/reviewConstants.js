export const mockDocuments = [
  { id: 'doc-1', type: 'Commercial Invoice', fileName: 'INV-4412.pdf', status: 'processed', health: 'Verified' },
  { id: 'doc-2', type: 'Packing List', fileName: 'PL-4412.pdf', status: 'processed', health: 'Low Confidence' },
  { id: 'doc-3', type: 'Bill of Lading', fileName: 'BL-9912.pdf', status: 'processed', health: 'Verified' },
  { id: 'doc-4', type: 'Delivery Order', fileName: 'Missing', status: 'missing', health: 'Missing' },
  { id: 'doc-5', type: 'Weighment Slip', fileName: 'WS-001.pdf', status: 'pending', health: 'Pending' }
]

export const mockStructuredData = [
  {
    id: 'sec-commercial',
    title: 'Commercial Information',
    fields: [
      { id: 'f-1', name: 'Invoice Number', aiValue: 'INV-4412', editableValue: 'INV-4412', confidence: 98, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 1 },
      { id: 'f-2', name: 'Invoice Date', aiValue: '12-Aug-2026', editableValue: '12-Aug-2026', confidence: 85, sourceDocument: 'Commercial Invoice', status: 'ai-suggested', sourcePage: 1 },
      { id: 'f-3', name: 'Currency', aiValue: 'USD', editableValue: 'USD', confidence: 99, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 1 },
      { id: 'f-4', name: 'Total Value', aiValue: '142,500.00', editableValue: '142,500.00', confidence: 97, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 2 }
    ]
  },
  {
    id: 'sec-shipment',
    title: 'Shipment Information',
    fields: [
      { id: 'f-5', name: 'BL Number', aiValue: 'BL-9912X', editableValue: 'BL-9912X', confidence: 95, sourceDocument: 'Bill of Lading', status: 'verified', sourcePage: 1 },
      { id: 'f-6', name: 'Container No', aiValue: 'MSCU1234567', editableValue: 'MSCU1234567', confidence: 92, sourceDocument: 'Bill of Lading', status: 'verified', sourcePage: 1 },
      { id: 'f-7', name: 'Gross Weight', aiValue: '23,450 KG', editableValue: '23,450 KG', confidence: 98, sourceDocument: 'Packing List', status: 'verified', sourcePage: 1 },
      { id: 'f-8', name: 'Net Weight', aiValue: '23,100 KG', editableValue: '23,100 KG', confidence: 75, sourceDocument: 'Packing List', status: 'requires-review', sourcePage: 1 }
    ]
  },
  {
    id: 'sec-importer',
    title: 'Importer Details',
    fields: [
      { id: 'f-9', name: 'Importer Name', aiValue: 'Ibad Traders Pvt Ltd', editableValue: 'Ibad Traders Pvt Ltd', confidence: 99, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 1 },
      { id: 'f-10', name: 'NTN', aiValue: '', editableValue: '', confidence: 0, sourceDocument: 'Multiple', status: 'empty', sourcePage: null },
      { id: 'f-11', name: 'Address', aiValue: '123 Business Hub, Karachi', editableValue: '123 Business Hub, Karachi', confidence: 82, sourceDocument: 'Commercial Invoice', status: 'ai-suggested', sourcePage: 1 }
    ]
  }
]

export const mockValidationIssues = [
  { id: 'iss-1', title: 'Missing Invoice Date', type: 'Missing Field', severity: 'error', description: 'Invoice Date was not confidently found across documents.' },
  { id: 'iss-2', title: 'Currency Missing', type: 'Missing Field', severity: 'warning', description: 'Currency code is missing on the Packing List.' },
  { id: 'iss-3', title: 'Container Number Invalid', type: 'Format Error', severity: 'error', description: 'Container number does not match standard ISO 6346 format.' },
  { id: 'iss-4', title: 'HS Code Missing', type: 'Missing Field', severity: 'warning', description: 'HS Code is required for customs declaration mapping.' }
]

export const mockComparisons = [
  {
    id: 'comp-1',
    fieldName: 'Gross Weight',
    docA: { name: 'Invoice', value: '23,400 KG' },
    docB: { name: 'Packing List', value: '23,450 KG' },
    difference: '50 KG',
    status: 'conflict'
  },
  {
    id: 'comp-2',
    fieldName: 'Currency',
    docA: { name: 'Invoice', value: 'USD' },
    docB: { name: 'Bill of Lading', value: 'PKR' },
    difference: 'Currency Mismatch',
    status: 'conflict'
  },
  {
    id: 'comp-3',
    fieldName: 'Container Number',
    docA: { name: 'Invoice', value: 'MSCU1234567' },
    docB: { name: 'Bill of Lading', value: 'MSCU1234567' },
    difference: 'None',
    status: 'matched'
  }
]

export const mockReviewSummary = {
  documents: 6,
  fieldsExtracted: 148,
  verified: 132,
  needReview: 16,
  validationIssues: 4
}
