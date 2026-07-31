const DashboardIconButton = ({ children, ...props }) => (
  <button
    type="button"
    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E6E8] transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800"
    {...props}
  >
    {children}
  </button>
)

export default DashboardIconButton
