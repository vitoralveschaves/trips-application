import Image from "next/image"
import Link from "next/link"

export const QuickSearch = () => {
  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center">
        <div className="w-full h-[1px] bg-grayLighter"></div>
        <h2 className="px-5 font-medium text-grayPrimary whitespace-nowrap">Tente pesquisar por</h2>
        <div className="w-full h-[1px] bg-grayLighter"></div>
      </div>
      <div className="flex w-full justify-between mt-5 lg:justify-center lg:mt-10 lg:gap-40">
        <div className="flex flex-col items-center gap-1">
          <Link href={"/trips/search?text=hotel"}>
            <Image width={35} height={35} src={'/hotel-icon.png'} alt="hotel" />
          </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Hotel</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Link href={"/trips/search?text=fazenda"}>
            <Image width={35} height={35} src={'/farm-icon.png'} alt="farm" />
          </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Fazenda</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Link href={"/trips/search?text=chalé"}>
            <Image width={35} height={35} src={'/cottage-icon.png'} alt="cottage" />
          </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Chalé</p>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Link href={"/trips/search?text=pousada"}>
            <Image width={35} height={35} src={'/inn-icon.png'} alt="inn" />
          </Link>
          <p className="text-sm lg:text-base text-grayPrimary">Pousada</p>
        </div>
      </div>
    </div>
  )
}