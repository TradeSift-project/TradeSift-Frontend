import { FileText, Table, CheckSquare, FileCheck, Cpu, Workflow } from 'lucide-react'

const DocumentTypeIcon = ({ type }) => {
  const getIcon = () => {
    switch (type) {
      case 'Commercial Invoice':
        return FileText
      case 'Packing List':
        return Table
      case 'Bill of Lading':
        return FileCheck
      case 'Delivery Order':
        return CheckSquare
      case 'Customs Document':
        return Cpu
      case 'Weighment Slip':
      case 'Transport Note':
      default:
        return Workflow
    }
  }

  const Icon = getIcon()

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-500 shrink-0">
      <Icon size={14} />
    </div>
  )
}

export default DocumentTypeIcon
