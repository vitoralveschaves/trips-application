'use client'

import Button from "@/components/button"
import CurrencyInput from "@/components/currency-input"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"

export const TripSearch = () => {
  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-xl text-primaryDarker text-center">Encontre sua próxima <span className="text-primary">viagem!</span></h1>
      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" />
        <div className="grid grid-cols-2 gap-4">
          <DatePicker placeholderText="Data de ida" onChange={() => { }} className="w-full" />
          <CurrencyInput placeholder="Orçamento" />
        </div>
        <Button variant="primary">Buscar</Button>
      </div>
    </div>
  )
}