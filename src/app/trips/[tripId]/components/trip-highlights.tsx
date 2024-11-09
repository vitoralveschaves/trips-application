import Image from "next/image"

interface TripHighLightsProps {
  highLights: string[]
}

export const TripHighLights = ({ highLights }: TripHighLightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-[10px]">Destaques</h2>
      <div className="grid grid-cols-2 gap-y-3">
        {highLights.map(item => (
          <div key={item} className="flex items-center gap-[5px]">
            <Image src={'/check-icon.png'} width={15} height={15} alt={item} />
            <p className="text-grayPrimary text-xs">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}