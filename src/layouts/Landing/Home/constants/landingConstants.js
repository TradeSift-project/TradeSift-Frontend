import {
  FileText,
  CheckSquare,
  Link,
  Table,
  Cpu,
  RefreshCw,
  TrendingUp,
  FileCheck,
  Workflow
} from 'lucide-react'

export const NAV_LINKS = [
  { label: 'Workflow', path: '#workflow' },
  { label: 'How it Works', path: '#how-it-works' },
  { label: 'Supported Documents', path: '#documents' },
  { label: 'Integrations', path: '#integrations' },
  { label: 'Benefits', path: '#benefits' },
  { label: 'FAQ', path: '#faq' },
]

export const SUPPORTED_DOCUMENTS = [
  {
    title: 'Commercial Invoices',
    description: 'Auto-extract line-item values, currency codes, HS classifications, and terms of sale.',
    icon: FileText,
  },
  {
    title: 'Packing Lists',
    description: 'Verify package counts, net/gross weights, item descriptions, and container numbers.',
    icon: Table,
  },
  {
    title: 'Bills of Lading',
    description: 'Extract container details, seal numbers, port designations, and carrier consignee info.',
    icon: FileCheck,
  },
  {
    title: 'Delivery Orders',
    description: 'Validate authorization signatures, release terms, cargo descriptions, and delivery dates.',
    icon: CheckSquare,
  },
  {
    title: 'Customs & SRO Docs',
    description: 'Automate PSW and WeBOC preparation by validating compliance declarations and regulatory status.',
    icon: Cpu,
  },
  {
    title: 'Operational Paperwork',
    description: 'Extract and process transport notes, weighment slips, gate logs, and custom gate passes.',
    icon: Workflow,
  },
]

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Ingest Documents',
    description: 'Upload or automatically ingest operational documents (PDFs, scans, photos) at the gate or operations desk.',
  },
  {
    step: '02',
    title: 'AI Document Extraction',
    description: 'TradeSift AI extracts and structures data fields including containers, weights, item descriptions, and invoice values.',
  },
  {
    step: '03',
    title: 'Cross-Document Validation',
    description: 'Automatically cross-reference data across Commercial Invoices, Packing Lists, and Bills of Lading to flag inconsistencies.',
  },
  {
    step: '04',
    title: 'System Integration',
    description: 'Push verified, system-ready data directly into your terminal ERP, WeBOC, or download it as a structured Excel file.',
  },
]

export const BENEFITS = [
  {
    title: 'Zero Manual Entry',
    description: 'Eliminate repetitive typing errors by auto-extracting key data points from multi-page cargo documents.',
    icon: RefreshCw,
  },
  {
    title: 'System-Ready Output',
    description: 'Direct API mapping to your terminal ERP or operational database. Download to Excel instantly if offline.',
    icon: Table,
  },
  {
    title: 'Pakistan Single Window Ready',
    description: 'Pre-check and validate WeBOC filing fields against supporting documents to prevent customs rejection.',
    icon: Cpu,
  },
  {
    title: 'Gate Operations Acceleration',
    description: 'Reduce gate-in and gate-out turnaround times by automating weighment and manifest document checks.',
    icon: TrendingUp,
  },
  {
    title: 'Cross-Doc Discrepancy Checks',
    description: 'Catch weight mismatches, description errors, and missing container info before cargo processing.',
    icon: FileCheck,
  },
  {
    title: 'Operational Flexibility',
    description: 'Fully supports both import and export gate workflows, customs brokers, and terminal operators.',
    icon: Link,
  },
]

export const FAQS = [
  {
    id: 1,
    category: 'General',
    question: 'What is TradeSift and how does it help terminal operations?',
    answer: 'TradeSift is an intelligent document-to-data automation layer. It extracts, cross-validates, and formats cargo information from documents like commercial invoices, packing lists, and weighment slips. It pushes structured data directly into terminal ERPs or operational software, eliminating manual data entry.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Does TradeSift replace our existing terminal ERP or customs system?',
    answer: 'No. TradeSift does not replace your ERP, WeBOC, or internal operational software. It operates as an automation layer that sits between incoming paperwork and your existing software to populate system fields automatically and securely.',
  },
  {
    id: 3,
    category: 'General',
    question: 'How fast can we set up and onboard our terminal team?',
    answer: 'Onboarding is fast. We configure document extraction layouts tailored to Pakistan terminal and customs formats. Most terminal operations teams can go live in less than 2 weeks with minimal training.',
  },
  {
    id: 4,
    category: 'Integrations',
    question: 'How does the data get into our existing terminal ERP?',
    answer: 'We support modern REST APIs to map extracted and validated data directly to your ERP fields. For legacy systems without API capabilities, TradeSift provides a single-click clean Excel export formatted to match your system upload templates.',
  },
  {
    id: 5,
    category: 'Integrations',
    question: 'Does TradeSift support WeBOC and Pakistan Single Window (PSW) fields?',
    answer: 'Yes. TradeSift is optimized to identify and extract standard Pakistani trade fields, validating supporting invoices and packing lists against declaration parameters to ensure consistency before filing.',
  },
  {
    id: 6,
    category: 'Compliance',
    question: 'How does cross-document validation work?',
    answer: 'TradeSift compares values across different files. For example, it cross-references the net weight on the packing list with the weight declared on the bill of lading, and flags any discrepancy immediately before gate entry or clearance.',
  },
]
