// This is temporary mock data since the backend Activity API does not exist yet.
export const MOCK_ACTIVITIES = [
  {
    id: 'act_001',
    operationId: '1', // Matches some mock or real operation ID just conceptually
    type: 'OPERATION',
    title: 'Operation created',
    description: 'Import Gate-In workflow initiated.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    actor: {
      name: 'Ahmed Raza',
      role: 'Operator'
    }
  },
  {
    id: 'act_002',
    operationId: '1',
    type: 'DOCUMENT',
    title: 'Document uploaded',
    description: 'Commercial Invoice',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.9).toISOString(),
    actor: {
      name: 'Ahmed Raza',
      role: 'Operator'
    },
    metadata: {
      documentId: 'doc_101',
      documentName: 'Commercial Invoice'
    }
  },
  {
    id: 'act_003',
    operationId: '1',
    type: 'DOCUMENT',
    title: 'Document uploaded',
    description: 'Packing List',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.8).toISOString(),
    actor: {
      name: 'Ahmed Raza',
      role: 'Operator'
    },
    metadata: {
      documentId: 'doc_102',
      documentName: 'Packing List'
    }
  },
  {
    id: 'act_004',
    operationId: '1',
    type: 'PROCESSING',
    title: 'AI processing started',
    description: 'Initiated extraction for 2 documents.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.7).toISOString(),
    actor: {
      name: 'System',
      role: 'Automated process'
    }
  },
  {
    id: 'act_005',
    operationId: '1',
    type: 'AI',
    title: 'Extraction completed',
    description: 'Fields extracted successfully with high confidence.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.6).toISOString(),
    actor: {
      name: 'AI Engine',
      role: 'System'
    }
  },
  {
    id: 'act_006',
    operationId: '1',
    type: 'VALIDATION',
    title: 'Validation issue detected',
    description: 'Weight mismatch',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1.5).toISOString(),
    actor: {
      name: 'System',
      role: 'Automated process'
    },
    metadata: {
      issueType: 'cross-doc-mismatch',
      details: [
        { label: 'Commercial Invoice', value: '12,450 KG' },
        { label: 'Packing List', value: '12,800 KG' }
      ]
    }
  },
  {
    id: 'act_007',
    operationId: '1',
    type: 'REVIEW',
    title: 'Review completed',
    description: 'Operator reviewed and approved all fields.',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 mins ago
    actor: {
      name: 'Ahmed Raza',
      role: 'Operator'
    }
  }
]
