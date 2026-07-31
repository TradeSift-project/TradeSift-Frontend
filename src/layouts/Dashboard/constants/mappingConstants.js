export const TARGET_SYSTEMS = [
  { id: 'TOS-Z', name: 'Terminal OS Zodiac', type: 'ERP' },
  { id: 'TOS-N', name: 'Terminal OS Navis', type: 'ERP' },
  { id: 'API-CUSTOM', name: 'Custom JSON API', type: 'API' },
  { id: 'EXCEL-STD', name: 'Standard Excel Export', type: 'Excel' }
]

export const MOCK_MAPPING_DATA = {
  targetSystem: 'TOS-Z',
  summary: {
    totalFields: 24,
    mapped: 18,
    missing: 4,
    invalid: 1,
    requiredRemaining: 1
  },
  mappings: [
    {
      id: 'm1',
      standardField: 'container_number',
      standardValue: 'ABCU1234567',
      targetField: 'Container No',
      targetFormat: 'string(11)',
      status: 'Mapped',
      isRequired: true,
      validationMessage: null
    },
    {
      id: 'm2',
      standardField: 'gross_weight',
      standardValue: '12,450 KG',
      targetField: 'Gross Wt',
      targetFormat: 'number',
      status: 'Invalid',
      isRequired: true,
      validationMessage: 'Must be numeric format (e.g. 12450)'
    },
    {
      id: 'm3',
      standardField: 'consignee_name',
      standardValue: 'Global Trade Logistics Inc.',
      targetField: 'Consignee',
      targetFormat: 'string',
      status: 'Mapped',
      isRequired: true,
      validationMessage: null
    },
    {
      id: 'm4',
      standardField: 'invoice_number',
      standardValue: 'INV-998877',
      targetField: 'Invoice No',
      targetFormat: 'string',
      status: 'Mapped',
      isRequired: false,
      validationMessage: null
    },
    {
      id: 'm5',
      standardField: 'port_of_loading',
      standardValue: 'Jebel Ali, UAE',
      targetField: 'POL',
      targetFormat: 'string(3)',
      status: 'Mapped',
      isRequired: false,
      validationMessage: 'Will be truncated to 3 characters automatically'
    },
    {
      id: 'm6',
      standardField: null,
      standardValue: null,
      targetField: 'Cargo Category',
      targetFormat: 'enum',
      status: 'Missing',
      isRequired: true,
      validationMessage: 'Required field missing'
    }
  ]
}
