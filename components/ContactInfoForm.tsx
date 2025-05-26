import { Stack, TextField } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { Inputs } from "../app/types"
interface IProps {
  register: UseFormRegister<Inputs>
  errors: FieldErrors<Inputs>
}
export const ContactInfoForm = ({ register, errors }: IProps) => {
  return (
    <Stack rowGap={1.5}>
      <TextField label="Компания" required {...register('company', { required:  'Поле обязательно к заполнению' })} error={!!errors.company?.message} helperText={errors.company?.message} />
      <TextField label="ФИО" required  {...register('contactName', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactName?.message} helperText={errors.contactName?.message} />
      <TextField label="Телеграм" required  {...register('contactTelegram', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactTelegram?.message} helperText={errors.contactTelegram?.message} />
    </Stack>
  )
}