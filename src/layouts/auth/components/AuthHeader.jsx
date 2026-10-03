
const AuthHeader = ({ title, subtitle }) => {
  return (
          <header className="space-y-2 flex-col">
              <h1 className="font-geist text-3xl font-bold tracking-tight text-neutral-900">
                {title}
              </h1>
              <p className="text-sm text-neutral-500 font-inter">
                {subtitle}
              </p>
            </header>
  )
}

export default AuthHeader
