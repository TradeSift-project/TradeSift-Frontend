export const MOCK_EXTRACTIONS = {
  'DOC-001': {
    documentId: 'DOC-001',
    documentType: 'Commercial Invoice',
    fileName: 'invoice_INV-2026-00452.pdf',
    status: 'needs-review',
    sections: [
      {
        id: 'shipment',
        title: 'Shipment Information',
        fields: [
          { id: 'containerNumber', label: 'Container Number', value: 'MSCU1234567', confidence: 0.98, status: 'verified' },
          { id: 'billOfLading', label: 'Bill of Lading Number', value: 'BL-784512', confidence: 0.96, status: 'verified' },
          { id: 'deliveryOrder', label: 'Delivery Order Number', value: 'DO-KICT-9012', confidence: 0.72, status: 'needs-review', message: 'Low confidence matching release reference' },
          { id: 'importer', label: 'Importer / Exporter', value: 'AHMED WEBS LTD', confidence: 0.95, status: 'verified' },
          { id: 'consignee', label: 'Consignee', value: 'AHMED WEBS LTD', confidence: 0.95, status: 'verified' },
          { id: 'shipper', label: 'Shipper', value: 'SINO GLOBAL LTD', confidence: 0.92, status: 'verified' },
        ]
      },
      {
        id: 'cargo',
        title: 'Cargo Information',
        fields: [
          { id: 'description', label: 'Description of Goods', value: 'ELECTRONICS MODULE INTEGRATED CIRCUIT', confidence: 0.99, status: 'verified' },
          { id: 'packages', label: 'Packages', value: '450 CARTONS', confidence: 0.94, status: 'verified' },
          { id: 'packageType', label: 'Package Type', value: 'WOODEN PALLETS', confidence: 0.89, status: 'verified' },
          { id: 'grossWeight', label: 'Gross Weight', value: '24,300 KG', confidence: 0.97, status: 'verified' },
          { id: 'netWeight', label: 'Net Weight', value: '22,900 KG', confidence: 0.97, status: 'verified' },
        ]
      },
      {
        id: 'trade',
        title: 'Trade Information',
        fields: [
          { id: 'invoiceNumber', label: 'Invoice Number', value: 'INV-2026-00452', confidence: 0.98, status: 'verified' },
          { id: 'invoiceDate', label: 'Invoice Date', value: '2026-07-20', confidence: 0.94, status: 'verified' },
          { id: 'hsCode', label: 'HS Code', value: '8504.40.90', confidence: 0.98, status: 'verified' },
          { id: 'countryOfOrigin', label: 'Country of Origin', value: '', confidence: 0, status: 'missing', message: 'Field country of origin not detected' },
          { id: 'portLoading', label: 'Port of Loading', value: 'SHANGHAI PORT', confidence: 0.91, status: 'verified' },
          { id: 'portDischarge', label: 'Port of Discharge', value: 'KARACHI (KICT)', confidence: 0.94, status: 'verified' },
        ]
      }
    ]
  },
  'DOC-003': {
    documentId: 'DOC-003',
    documentType: 'Weighment Slip',
    fileName: 'Weighment_Slip_WS-902.png',
    status: 'failed',
    sections: [
      {
        id: 'shipment',
        title: 'Shipment Information',
        fields: [
          { id: 'containerNumber', label: 'Container Number', value: 'HLXU8902341', confidence: 0.95, status: 'verified' },
          { id: 'billOfLading', label: 'Bill of Lading Number', value: '', confidence: 0, status: 'missing', message: 'BL Number not detected' },
          { id: 'deliveryOrder', label: 'Delivery Order Number', value: '', confidence: 0, status: 'missing' },
          { id: 'importer', label: 'Importer / Exporter', value: 'AHMED WEBS LTD', confidence: 0.85, status: 'verified' },
          { id: 'consignee', label: 'Consignee', value: 'AHMED WEBS LTD', confidence: 0.85, status: 'verified' },
          { id: 'shipper', label: 'Shipper', value: 'SHANGHAI LOGISTICS', confidence: 0.65, status: 'needs-review', message: 'Verify shipper title matches manifests' },
        ]
      },
      {
        id: 'cargo',
        title: 'Cargo Information',
        fields: [
          { id: 'description', label: 'Description of Goods', value: 'BULK INDUSTRIAL RAW MATERIALS', confidence: 0.99, status: 'verified' },
          { id: 'packages', label: 'Packages', value: '1 CONTAINER', confidence: 0.90, status: 'verified' },
          { id: 'packageType', label: 'Package Type', value: 'FCL', confidence: 0.85, status: 'verified' },
          { id: 'grossWeight', label: 'Gross Weight', value: '24,150 KG', confidence: 0.58, status: 'needs-review', message: 'Weight mismatch compared to standard BL' },
          { id: 'netWeight', label: 'Net Weight', value: '22,750 KG', confidence: 0.88, status: 'verified' },
        ]
      },
      {
        id: 'trade',
        title: 'Trade Information',
        fields: [
          { id: 'invoiceNumber', label: 'Invoice Number', value: 'INV-2026-90321', confidence: 0.98, status: 'verified' },
          { id: 'invoiceDate', label: 'Invoice Date', value: '2026-07-21', confidence: 0.92, status: 'verified' },
          { id: 'hsCode', label: 'HS Code', value: '8504.40.90', confidence: 0.95, status: 'verified' },
          { id: 'countryOfOrigin', label: 'Country of Origin', value: 'CHINA', confidence: 0.95, status: 'verified' },
          { id: 'portLoading', label: 'Port of Loading', value: 'SHANGHAI PORT', confidence: 0.91, status: 'verified' },
          { id: 'portDischarge', label: 'Port of Discharge', value: 'KARACHI (KICT)', confidence: 0.94, status: 'verified' },
        ]
      }
    ]
  }
}
