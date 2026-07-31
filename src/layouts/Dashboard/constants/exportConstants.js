export const EXPORT_DESTINATIONS = [
  { id: 'api-terminal', name: 'Terminal API', type: 'API', icon: 'server' },
  { id: 'excel-standard', name: 'Excel Export', type: 'File', icon: 'file' }
]

export const MOCK_EXPORT_DATA = {
  summary: {
    documents: 3,
    fieldsApproved: 42,
    fieldsMapped: 42,
    requiredRemaining: 0,
    targetSystem: 'TOS-Z'
  },
  previewData: [
    { id: 1, standardField: 'Container Number', standardValue: 'ABCU1234567', targetField: 'Container No' },
    { id: 2, standardField: 'Gross Weight', standardValue: '12450', targetField: 'Gross Wt' },
    { id: 3, standardField: 'Consignee', standardValue: 'ABC Imports', targetField: 'Consignee' },
    { id: 4, standardField: 'Invoice Number', standardValue: 'INV-1024', targetField: 'Invoice No' }
  ],
  isReady: true,
  apiEndpoint: 'https://api.terminal-zodiac.com/v1/import/gate-in',
  excelFilename: 'TradeSift_Import_GateIn_IMP-2026-00124.xlsx'
}
