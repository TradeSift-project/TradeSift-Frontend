import {
  LayoutDashboard,
  ShieldCheck,
  Trophy,
  Calculator,
  Truck,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'

export const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'TradeShield', icon: ShieldCheck },
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

export const MODULES = [
  {
    icon: ShieldCheck,
    name: 'TradeShield',
    description: 'AI Customs Compliance',
    status: 'active',
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
