export const mockJobDetails = {
  id: 'IMP-2026-00124',
  workflowType: 'Import Gate-In',
  description: 'Electronics Components',
  documentsCount: 7,
  status: 'Approved'
}

export const mockWorkflowState = [
  { id: 'step-1', label: 'Upload', status: 'completed' },
  { id: 'step-2', label: 'AI Processing', status: 'completed' },
  { id: 'step-3', label: 'Validation', status: 'completed' },
  { id: 'step-4', label: 'Human Review', status: 'completed' },
  { id: 'step-5', label: 'Approved Data', status: 'current' },
  { id: 'step-6', label: 'ERP / Export', status: 'next' }
]

export const mockApprovalSummary = {
  documentsProcessed: 7,
  fieldsExtracted: 86,
  fieldsApproved: 86,
  issuesResolved: 5,
  overallConfidence: 97,
  approvedAt: '2026-07-31T14:30:00Z'
}

export const mockStructuredDataGroups = [
  {
    id: 'grp-shipment',
    title: 'Shipment',
    fields: [
      { id: 'f1', label: 'Shipment Reference', value: 'SHP-998231', source: 'Delivery Order', confidence: 99, status: 'Approved' },
      { id: 'f2', label: 'Bill of Lading Number', value: 'BL-9912X', source: 'Bill of Lading', confidence: 100, status: 'Approved' },
      { id: 'f3', label: 'Container Number', value: 'MSCU1234567', source: 'Bill of Lading', confidence: 98, status: 'Approved' },
      { id: 'f4', label: 'Vessel Name', value: 'MSC ALINA', source: 'Bill of Lading', confidence: 95, status: 'Approved' },
      { id: 'f5', label: 'Port of Loading', value: 'Jebel Ali, UAE', source: 'Bill of Lading', confidence: 92, status: 'Approved' },
      { id: 'f6', label: 'Port of Discharge', value: 'Karachi, Pakistan', source: 'Bill of Lading', confidence: 100, status: 'Approved' }
    ]
  },
  {
    id: 'grp-cargo',
    title: 'Cargo',
    fields: [
      { id: 'f7', label: 'Cargo Description', value: 'Electronics Components', source: 'Commercial Invoice', confidence: 97, status: 'Approved' },
      { id: 'f8', label: 'Package Count', value: '124 Cartons', source: 'Packing List', confidence: 99, status: 'Approved' },
      { id: 'f9', label: 'Gross Weight', value: '12,450 KG', source: 'Packing List', confidence: 98, status: 'Approved' },
      { id: 'f10', label: 'Volume', value: '35 CBM', source: 'Packing List', confidence: 96, status: 'Approved' },
      { id: 'f11', label: 'HS Code', value: '8542.31.00', source: 'Commercial Invoice', confidence: 94, status: 'Approved' }
    ]
  },
  {
    id: 'grp-parties',
    title: 'Parties',
    fields: [
      { id: 'f12', label: 'Importer', value: 'Ibad Traders Pvt Ltd', source: 'Commercial Invoice', confidence: 100, status: 'Approved' },
      { id: 'f13', label: 'Exporter', value: 'Global Tech Supplies LLC', source: 'Commercial Invoice', confidence: 99, status: 'Approved' },
      { id: 'f14', label: 'Consignee', value: 'Ibad Traders Pvt Ltd', source: 'Bill of Lading', confidence: 100, status: 'Approved' }
    ]
  },
  {
    id: 'grp-commercial',
    title: 'Commercial',
    fields: [
      { id: 'f15', label: 'Invoice Number', value: 'INV-78342', source: 'Commercial Invoice', confidence: 99, status: 'Approved' },
      { id: 'f16', label: 'Currency', value: 'USD', source: 'Commercial Invoice', confidence: 100, status: 'Approved' },
      { id: 'f17', label: 'Total Amount', value: '142,500.00', source: 'Commercial Invoice', confidence: 98, status: 'Approved' },
      { id: 'f18', label: 'Incoterm', value: 'CIF', source: 'Commercial Invoice', confidence: 97, status: 'Approved' }
    ]
  }
]

export const mockERPMappings = [
  { id: 'm1', sourceField: 'Container Number', targetField: 'container_no', status: 'mapped' },
  { id: 'm2', sourceField: 'Gross Weight', targetField: 'gross_weight', status: 'mapped', transform: 'Extract Numeric' },
  { id: 'm3', sourceField: 'Invoice Number', targetField: 'invoice_number', status: 'mapped' },
  { id: 'm4', sourceField: 'Consignee', targetField: 'consignee_name', status: 'mapped' },
  { id: 'm5', sourceField: 'HS Code', targetField: 'hs_code', status: 'mapped' },
  { id: 'm6', sourceField: 'Total Amount', targetField: 'total_amount', status: 'mapped' },
  { id: 'm7', sourceField: 'Currency', targetField: 'currency_code', status: 'mapped' }
]

export const mockUnmappedFields = [
  { id: 'u1', label: 'Delivery Order Number', required: false },
  { id: 'u2', label: 'Transporter', required: false },
  { id: 'u3', label: 'Vehicle Number', required: false }
]
