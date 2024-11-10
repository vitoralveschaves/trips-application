import Image from "next/image"

export const Footer = () => {
  return (
    <div className="bg-walterWhite p-5 flex flex-col items-center justify-center space-y-2">
      <Image src={'/logo.png'} height={23} width={133} alt="logo" />
      <p className="text-sm font-medium text-primaryDarker">Todos os direitos reservados.</p>
    </div>
  )
}