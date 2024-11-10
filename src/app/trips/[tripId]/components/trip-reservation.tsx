'use client'

import Button from "@/components/button"
import DatePicker from "@/components/date-picker"
import Input from "@/components/input"
import { Trip } from "@prisma/client"
import { Controller, useForm } from "react-hook-form"

interface TripReservationProps {
  tripStartDate: Date
  tripEndDate: Date
  maxGuests: number
}

interface TripReservationForm {
  guests: number
  startDate: Date | null
  endDate: Date | null
}

export const TripReservation = ({ tripStartDate, tripEndDate, maxGuests }: TripReservationProps) => {

  const { register, handleSubmit, control, watch, formState: { errors } } = useForm<TripReservationForm>();

  const onSubmit = (data: any) => {
    console.log(data)
  }

  const startDate = watch('startDate');

  return (
    <div className="flex flex-col px-5">
      <div className="flex gap-4">
        <Controller
          name="startDate"
          rules={{
            required: { value: true, message: "A data inicial é obrigatória" }
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors.startDate}
              errorMessage={errors.startDate?.message}
              placeholderText="Data de início"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              minDate={tripStartDate}
            />
          )}
        />
        <Controller
          name="endDate"
          rules={{
            required: { value: true, message: "A data final é obrigatória" }
          }}
          control={control}
          render={({ field }) => (
            <DatePicker
              error={!!errors.endDate}
              errorMessage={errors.endDate?.message}
              placeholderText="Data final"
              onChange={field.onChange}
              selected={field.value}
              className="w-full"
              maxDate={tripEndDate}
              minDate={startDate ?? tripStartDate}
            />
          )}
        />
      </div>
      <Input
        {...register("guests", { required: { value: true, message: 'Número de hóspedes é obrigatório.' } })}
        placeholder={`Número de hóspedes (máx: ${maxGuests})`}
        className="mt-4"
        error={!!errors.guests}
        errorMessage={errors.guests?.message}
      />
      <div className="flex justify-between my-3">
        <p className="font-medium text-sm text-primaryDarker">Total: </p>
        <p className="font-medium text-sm text-primaryDarker">R$2500</p>
      </div>
      <div className="w-full pb-10 border-b border-grayLighter">
        <Button onClick={() => handleSubmit(onSubmit)()} variant="primary" className="w-full">Reservar agora</Button>
      </div>
    </div>
  )
}