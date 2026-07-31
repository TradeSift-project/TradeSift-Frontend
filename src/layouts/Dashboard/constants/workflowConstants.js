export const mockUnifiedJob = {
  id: 'IMP-2026-00124',
  workflowType: 'Import Gate-In',
  description: 'Electronics Components',
  documentsCount: 7,
  status: 'Needs Review',
  
  // Pipeline steps
  pipeline: [
    { id: 'upload', label: 'Upload', status: 'completed' },
    { id: 'processing', label: 'AI Processing', status: 'completed' },
    { id: 'validation', label: 'Validation', status: 'completed' },
    { id: 'review', label: 'Human Review', status: 'current' },
    { id: 'approved', label: 'Approved Data', status: 'next' },
    { id: 'export', label: 'ERP / Export', status: 'next' }
  ],

  // Processing mock data
  processing: {
    documents: [
      { id: 'doc-1', name: 'Commercial-Invoice-4412.pdf', type: 'Commercial Invoice', status: 'completed' },
      { id: 'doc-2', name: 'Packing-List-4412.pdf', type: 'Packing List', status: 'completed' },
      { id: 'doc-3', name: 'Bill-of-Lading-9912.pdf', type: 'Bill of Lading', status: 'completed' },
      { id: 'doc-4', name: 'Delivery-Order.pdf', type: 'Unknown', status: 'failed' }
    ],
    issues: [
      { id: 'iss-1', title: 'Low Confidence Extraction', description: 'Net weight on Packing List is below 80% confidence threshold.', severity: 'warning' },
      { id: 'iss-2', title: 'Missing Document', description: 'Expected Delivery Order was not classified successfully.', severity: 'error' }
    ]
  },

  // Review mock data
  review: {
    documentsHealth: [
      { id: 'doc-1', type: 'Commercial Invoice', fileName: 'INV-4412.pdf', status: 'processed', health: 'Verified' },
      { id: 'doc-2', type: 'Packing List', fileName: 'PL-4412.pdf', status: 'processed', health: 'Low Confidence' },
      { id: 'doc-3', type: 'Bill of Lading', fileName: 'BL-9912.pdf', status: 'processed', health: 'Verified' },
      { id: 'doc-4', type: 'Delivery Order', fileName: 'Missing', status: 'missing', health: 'Missing' }
    ],
    structuredData: [
      {
        id: 'sec-commercial',
        title: 'Commercial Information',
        fields: [
          { id: 'f-1', name: 'Invoice Number', aiValue: 'INV-4412', editableValue: 'INV-4412', confidence: 98, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 1 },
          { id: 'f-2', name: 'Currency', aiValue: 'USD', editableValue: 'USD', confidence: 99, sourceDocument: 'Commercial Invoice', status: 'verified', sourcePage: 1 }
        ]
      },
      {
        id: 'sec-shipment',
        title: 'Shipment Information',
        fields: [
          { id: 'f-3', name: 'BL Number', aiValue: 'BL-9912X', editableValue: 'BL-9912X', confidence: 95, sourceDocument: 'Bill of Lading', status: 'verified', sourcePage: 1 },
          { id: 'f-4', name: 'Gross Weight', aiValue: '23,450 KG', editableValue: '23,450 KG', confidence: 98, sourceDocument: 'Packing List', status: 'verified', sourcePage: 1 }
        ]
      }
    ],
    validationIssues: [
      { id: 'iss-1', title: 'Missing Invoice Date', type: 'Missing Field', severity: 'error', description: 'Invoice Date was not confidently found across documents.' }
    ],
    comparisons: [
      {
        id: 'comp-1',
        fieldName: 'Gross Weight',
        docA: { name: 'Invoice', value: '23,400 KG' },
        docB: { name: 'Packing List', value: '23,450 KG' },
        difference: '50 KG',
        status: 'conflict'
      }
    ],
    reviewSummary: {
      documents: 4,
      fieldsExtracted: 86,
      verified: 80,
      needReview: 6,
      validationIssues: 1
    }
  },

  // Approved Data mock data
  approved: {
    summary: {
      documentsProcessed: 4,
      fieldsExtracted: 86,
      fieldsApproved: 86,
      issuesResolved: 1,
      overallConfidence: 97,
      approvedAt: '2026-07-31T14:30:00Z'
    },
    structuredDataGroups: [
      {
        id: 'grp-shipment',
        title: 'Shipment',
        fields: [
          { id: 'f1', label: 'Bill of Lading Number', value: 'BL-9912X', source: 'Bill of Lading', confidence: 100, status: 'Approved' },
          { id: 'f2', label: 'Gross Weight', value: '23,450 KG', source: 'Packing List', confidence: 98, status: 'Approved' }
        ]
      },
      {
        id: 'grp-commercial',
        title: 'Commercial',
        fields: [
          { id: 'f3', label: 'Invoice Number', value: 'INV-4412', source: 'Commercial Invoice', confidence: 99, status: 'Approved' },
          { id: 'f4', label: 'Currency', value: 'USD', source: 'Commercial Invoice', confidence: 100, status: 'Approved' }
        ]
      }
    ],
    erpMappings: [
      { id: 'm1', sourceField: 'Gross Weight', targetField: 'gross_weight', status: 'mapped', transform: 'Extract Numeric' },
      { id: 'm2', sourceField: 'Invoice Number', targetField: 'invoice_number', status: 'mapped' }
    ],
    unmappedFields: [
      { id: 'u1', label: 'Delivery Order Number', required: false }
    ]
  }
}
