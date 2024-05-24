export type HowProp = {
  title: string
  content: string
}

export const How: React.FC<HowProp> = ({ title, content }: HowProp) => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <span className="font-bold text-sm md:text-2xl text-cblack-500"> {title} </span>
      </div>
      <div>
        <span className="text-sm leading-3 md:text-xl text-cblack-500 ">{content}</span>
      </div>
    </div>
  )
}
