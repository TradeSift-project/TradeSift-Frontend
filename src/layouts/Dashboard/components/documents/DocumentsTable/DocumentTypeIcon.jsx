import { FileText, Table, CheckSquare, FileCheck, Cpu, Workflow } from 'lucide-react'

const TYPE_ICONS = {
  'Commercial Invoice': FileText,
  'Packing List': Table,
  'Bill of Lading': FileCheck,
  'Delivery Order': CheckSquare,
  'Customs Document': Cpu,
}

const DocumentTypeIcon = ({ type }) => {
  const Icon = TYPE_ICONS[type] || Workflow

  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-50 border border-neutral-100 text-neutral-500 shrink-0 dark:bg-neutral-800/50 dark:border-neutral-800">
      <Icon size={14} />
    </div>
  )
}

export default DocumentTypeIcon
