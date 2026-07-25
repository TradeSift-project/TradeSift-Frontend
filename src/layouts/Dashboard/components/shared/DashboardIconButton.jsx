const DashboardIconButton = ({ children, ...props }) => (
  <button
    type="button"
    className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E6E8] transition hover:bg-neutral-50"
    {...props}
  >
    {children}
  </button>
)

export default DashboardIconButton
