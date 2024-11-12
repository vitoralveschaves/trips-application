'use client'

import Button from "@/components/button"
import CurrencyInput from "@/components/currency-input"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"

interface TripSearchForm {
  text: string
  startDate: Date | null
  budget: string
}

export const TripSearch = () => {

  const { control, register, handleSubmit, formState: { errors } } = useForm<TripSearchForm>();

  const router = useRouter();

  const onSubmit = (data: TripSearchForm) => {
    router.push(`/trips/search?text=${data.text}&startDate=${data.startDate?.toISOString()}&budget=${data.budget}`);
  }

  return (
    <div className="container mx-auto p-5 bg-search-background bg-cover bg-center bg-no-repeat">
      <h1 className="font-semibold text-xl text-primaryDarker text-center">Encontre sua próxima <span className="text-primary">viagem!</span></h1>
      <div className="flex flex-col gap-4 mt-5">
        <Input placeholder="Onde você quer ir?" {...register("text", { required: { value: true, message: "O campo de busca é obrigatório" } })} error={!!errors.text} errorMessage={errors.text?.message} />
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                placeholderText="Data de ida"
                onChange={field.onChange}
                selected={field.value}
                className="w-full"
                minDate={new Date()}
              />
            )}
          />
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <CurrencyInput allowDecimals={false} placeholder="Orçamento" onValueChange={field.onChange as any} value={field.value} onBlur={field.onBlur} />
            )}
          />
        </div>
        <Button variant="primary" onClick={() => handleSubmit(onSubmit)()}>Buscar</Button>
      </div>
    </div>
  )
}