import {
  LayoutDashboard,
  FileText,
  ArrowDownRight,
  ArrowUpRight,
  Link,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  FileCheck,
  MapPin,
  Globe,
  Package,
  Settings2,
  Percent,
  Play,
  Truck
} from 'lucide-react'

export const NAV_ITEMS = [
  { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Documents', icon: FileText, path: '/dashboard/documents', soon: false },
  { label: 'Import Operations', icon: ArrowDownRight, path: '/dashboard/import', soon: true },
  { label: 'Export Operations', icon: ArrowUpRight, path: '/dashboard/export', soon: true },
  { label: 'Gate Operations', icon: Truck, path: '/dashboard/gate', soon: true },
  { label: 'Integrations', icon: Link, path: '/dashboard/integrations', soon: true },
]

export const DASHBOARD_STATS = [
  {
    id: 'processed',
    label: 'Documents Processed',
    value: '1,284',
    description: '+12% from last week',
    status: 'success',
    icon: FileCheck,
  },
  {
    id: 'processing',
    label: 'Processing',
    value: '24',
    description: 'Currently being processed',
    status: 'info',
    icon: Play,
  },
  {
    id: 'review',
    label: 'Needs Review',
    value: '8',
    description: 'Requires operator attention',
    status: 'warning',
    icon: Clock,
  },
  {
    id: 'issues',
    label: 'Issues Detected',
    value: '3',
    description: 'Extraction or validation issues',
    status: 'error',
    icon: AlertTriangle,
  },
]

export const WORKFLOW_SUMMARY = [
  {
    id: 'import',
    title: 'Import',
    description: 'Automating gate-in validation, custom releases, and vessel manifests.',
    processed: 842,
    processing: 14,
    review: 5,
    icon: ArrowDownRight,
  },
  {
    id: 'export',
    title: 'Export',
    description: 'Automating gate-out weight checks, shipping bills, and transport paperwork.',
    processed: 442,
    processing: 10,
    review: 3,
    icon: ArrowUpRight,
  },
]

export const ACTIVE_WORKFLOWS = [
  {
    id: 'JOB-9023',
    type: 'Import Gate-In',
    description: 'Electronics board cargo from Vessel PACIFIC HARMONY',
    docCount: 4,
    stage: 'AI Field Extraction',
    status: 'Needs Review',
    updatedAt: '2 mins ago',
  },
  {
    id: 'JOB-9022',
    type: 'Export Gate-Out',
    description: 'Textile export items for vessel KARACHI EXPRESS',
    docCount: 3,
    stage: 'Weighment Validation',
    status: 'Processing',
    updatedAt: '12 mins ago',
  },
  {
    id: 'JOB-9021',
    type: 'Import Gate-Out',
    description: 'Machinery components release for THAL OPERATORS',
    docCount: 5,
    stage: 'ERP Field Mapping',
    status: 'Completed',
    updatedAt: '1 hour ago',
  },
  {
    id: 'JOB-9020',
    type: 'Export Gate-In',
    description: 'Industrial chemicals storage consignments',
    docCount: 2,
    stage: 'Document Ingestion',
    status: 'Completed',
    updatedAt: '2 hours ago',
  }
]

export const RECENT_DOCUMENTS = [
  {
    id: 'DOC-90231',
    documentName: 'Invoice_CN_90321.pdf',
    documentType: 'Commercial Invoice',
    workflowType: 'Import',
    status: 'Completed',
    uploadedAt: '12 mins ago',
  },
  {
    id: 'DOC-90230',
    documentName: 'Packing_List_90321.pdf',
    documentType: 'Packing List',
    workflowType: 'Import',
    status: 'Completed',
    uploadedAt: '15 mins ago',
  },
  {
    id: 'DOC-90229',
    documentName: 'Weighment_Slip_WS-80.png',
    documentType: 'Weighment Slip',
    workflowType: 'Import',
    status: 'Validation Issue',
    uploadedAt: '22 mins ago',
  },
  {
    id: 'DOC-90228',
    documentName: 'BL_Hanjin_HJ9023.pdf',
    documentType: 'Bill of Lading',
    workflowType: 'Import',
    status: 'Completed',
    uploadedAt: '45 mins ago',
  },
  {
    id: 'DOC-90227',
    documentName: 'Export_Invoice_EXP-02.pdf',
    documentType: 'Commercial Invoice',
    workflowType: 'Export',
    status: 'Needs Review',
    uploadedAt: '1 hour ago',
  },
  {
    id: 'DOC-90225',
    documentName: 'Manifest_MX-0092.pdf',
    documentType: 'Customs Documents',
    workflowType: 'Export',
    status: 'Processing',
    uploadedAt: '2 hours ago',
  },
]

export const ATTENTION_ITEMS = [
  {
    id: 'ATTN-01',
    title: 'Commercial Invoice — Missing consignee information',
    action: 'Review extracted data',
    type: 'error',
  },
  {
    id: 'ATTN-02',
    title: 'Weighment Slip vs PL — Weight validation mismatch',
    action: 'Resolve discrepancy',
    type: 'warning',
  },
  {
    id: 'ATTN-03',
    title: 'Packing List — Low confidence extraction on package count',
    action: 'Confirm values',
    type: 'info',
  },
]

// Mock document data for extraction UI
export const MOCK_EXTRACTED_DOCS = {
  'DOC-90231': {
    id: 'DOC-90231',
    name: 'Invoice_CN_90321.pdf',
    type: 'Commercial Invoice',
    fields: [
      { name: 'Invoice Number', value: 'INV-2026-90321', confidence: 'high' },
      { name: 'Importer Name', value: 'AHMED WEBS LTD', confidence: 'high' },
      { name: 'Consignee', value: 'AHMED WEBS LTD', confidence: 'review', message: 'Verify Consignee name matches BL' },
      { name: 'Shipper', value: 'SHANGHAI MANUFACTURING CO.', confidence: 'high' },
      { name: 'Port of Loading', value: 'SHANGHAI PORT', confidence: 'high' },
      { name: 'Port of Discharge', value: 'KARACHI (KICT)', confidence: 'high' },
      { name: 'Packages', value: '450 CARTONS', confidence: 'high' },
      { name: 'Gross Weight', value: '23,800 KG', confidence: 'high' },
      { name: 'Net Weight', value: '22,400 KG', confidence: 'high' },
      { name: 'HS Code', value: '8504.40.90', confidence: 'high' },
      { name: 'Country of Origin', value: 'CHINA', confidence: 'high' },
      { name: 'Container Number', value: 'HLXU8902341', confidence: 'high' },
      { name: 'BL Number', value: 'HJ9023841', confidence: 'high' }
    ]
  },
  'DOC-90229': {
    id: 'DOC-90229',
    name: 'Weighment_Slip_WS-80.png',
    type: 'Weighment Slip',
    fields: [
      { name: 'Invoice Number', value: 'INV-2026-90321', confidence: 'high' },
      { name: 'Importer Name', value: 'AHMED WEBS LTD', confidence: 'high' },
      { name: 'Consignee', value: '', confidence: 'missing', message: 'Consignee name is missing' },
      { name: 'Shipper', value: 'SHANGHAI MANUFACTURING CO.', confidence: 'high' },
      { name: 'Port of Loading', value: 'SHANGHAI PORT', confidence: 'high' },
      { name: 'Port of Discharge', value: 'KARACHI (KICT)', confidence: 'high' },
      { name: 'Packages', value: '450 CARTONS', confidence: 'high' },
      { name: 'Gross Weight', value: '24,150 KG', confidence: 'review', message: 'Mismatched gross weight (PL states 23,800 KG)' },
      { name: 'Net Weight', value: '22,750 KG', confidence: 'high' },
      { name: 'HS Code', value: '8504.40.90', confidence: 'high' },
      { name: 'Country of Origin', value: 'CHINA', confidence: 'high' },
      { name: 'Container Number', value: 'HLXU8902341', confidence: 'high' },
      { name: 'BL Number', value: 'HJ9023841', confidence: 'high' }
    ]
  }
}


