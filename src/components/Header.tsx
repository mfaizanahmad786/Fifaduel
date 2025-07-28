interface HeaderProps {}

export default function Header({}: HeaderProps) {
  return (
    <div className="pt-12 pb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-extralight text-gray-100 mb-3 tracking-wide">
          FIFA Match Generator
        </h1>
        <p className="text-gray-400 text-base font-light">Generate football matches between teams from different leagues</p>
        <div className="w-24 h-0.5 bg-gradient-to-r from-blue-400/50 to-purple-400/50 mx-auto mt-6"></div>
      </div>
    </div>
  )
}
