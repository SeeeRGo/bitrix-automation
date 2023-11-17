import { Stack } from "@mui/material"
import { UseFormRegister } from "react-hook-form"
import { Inputs } from "../app/types"
import { TextField } from "./TextField"
interface IProps {
  register: UseFormRegister<Inputs>
}
export const ContactInfoForm = ({ register }: IProps) => {
  return (
    <Stack rowGap={1.5}>
      <TextField label="Компания" required {...register('company', { required: true })} />
      <TextField label="ФИО" required  {...register('contactName', { required: true })} />
      <TextField label="Должность" required  {...register('contactPosition', { required: true })} />
      <TextField label="Телеграм" required  {...register('contactTelegram', { required: true })} />
      <TextField label="E-mail" required  {...register('contactEmail', { required: true })} />
      <TextField label="Телефон"  {...register('contactPhone')} />
    </Stack>
  )
}