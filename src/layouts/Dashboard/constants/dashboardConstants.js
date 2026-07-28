import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  Calculator,
  Truck,
  TrendingUp,
  AlertTriangle,
  MapPin,
  Globe,
  Package,
  Settings2,
  Percent,
  FileText,
  Clock,
} from 'lucide-react'

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'TradeShield', icon: ShieldCheck, path: '/dashboard/tradeshield' },
  { label: 'TenderWin', icon: Trophy, soon: true },
  { label: 'TaxReconciler', icon: Calculator, soon: true },
  { label: 'FreightSync', icon: Truck, soon: true },
]

export const RECOMMENDATIONS = [
  {
    icon: TrendingUp,
    title: 'Potential savings of $12,450',
    description: 'Optimize duty classification on Import — Electronics Components under CPFTA.',
    badge: 'High',
    badgeClass: 'text-[#F87103] border-[#F87103]/30',
  },
  {
    icon: ShieldCheck,
    title: 'FTA eligibility available',
    description: 'Country of Origin meets criteria for reduced duty under China–Pakistan FTA.',
    badge: 'Medium',
    badgeClass: 'text-[#2BA162] border-[#2BA162]/30',
  },
  {
    icon: AlertTriangle,
    title: 'Missing document detected',
    description: 'Upload Certificate of Origin for filing TS-783804 to avoid PSW rejection.',
    badge: 'Attention',
    badgeClass: 'text-[#EF852E] border-[#EF852E]/40',
  },
]

export const TRADESHIELD_JOBS = [
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'in-progress', updatedText: '2 mins ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '2 mins ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
  { title: 'Import — Electronics Components', filingId: 'TS-784512', status: 'completed', updatedText: '1 hour ago' },
]

export const FILING_WORKFLOW_STEPS = [
  { label: 'Upload Documents' },
  { label: 'HS Code Intelligence' },
  { label: 'Document Intelligence' },
  { label: 'Cross-Document' },
  { label: 'Compliance Analysis' },
  { label: 'Certificate of Origin' },
  { label: 'Customs Risk Assessment' },
  { label: 'Trade Optimization' },
  { label: 'Permit & NOC Analysis' },
  { label: 'Final Verification' },
]

export const FILING_INFO_ITEMS = [
  { icon: MapPin, label: 'Importing Country', value: 'Pakistan' },
  { icon: Globe, label: 'Exporting Country', value: 'China' },
  { icon: Package, label: 'Shipment Type', value: 'Sea Freight · FCL' },
  { icon: Settings2, label: 'Current Phase', value: 'Document Intelligence' },
  { icon: Percent, label: 'Completion', value: '46%' },
  { icon: FileText, label: 'Documents Uploaded', value: '6 files' },
  { icon: Clock, label: 'Est. Completion', value: '~ 18 mins' },
]

export const MODULES = [
  {
    icon: ShieldCheck,
    name: 'TradeShield',
    description: 'AI Customs Compliance',
    status: 'active',
    path: '/dashboard/tradeshield',
  },
  {
    icon: Trophy,
    name: 'TenderWin',
    description: 'Tender & Bid Intelligence',
    status: 'soon',
  },
  {
    icon: Calculator,
    name: 'TaxReconciler',
    description: 'Tax Reconciliation',
    status: 'soon',
  },
  {
    icon: Truck,
    name: 'FreightSync',
    description: 'Freight & Logistics',
    status: 'soon',
  },
]
