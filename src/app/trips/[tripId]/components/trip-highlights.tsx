import Image from "next/image"

interface TripHighLightsProps {
  highLights: string[]
}

export const TripHighLights = ({ highLights }: TripHighLightsProps) => {
  return (
    <div className="flex flex-col p-5">
      <h2 className="font-semibold text-primaryDarker mb-[10px] lg:text-xl">Destaques</h2>
      <div className="grid grid-cols-2 gap-y-3 lg:mt-5">
        {highLights.map(item => (
          <div key={item} className="flex items-center gap-[5px] lg:gap-2">
            <Image src={'/check-icon.png'} width={15} height={15} alt={item} />
            <p className="text-grayPrimary text-xs lg:text-base">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}