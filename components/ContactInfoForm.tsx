import { Stack } from "@mui/material"
import { FieldErrors, UseFormRegister } from "react-hook-form"
import { Inputs } from "../app/types"
import { TextField } from "./TextField"
interface IProps {
  register: UseFormRegister<Inputs>
  errors: FieldErrors<Inputs>
}
export const ContactInfoForm = ({ register, errors }: IProps) => {
  return (
    <Stack rowGap={1.5}>
      <TextField label="Компания" required {...register('company', { required:  'Поле обязательно к заполнению' })} error={!!errors.company?.message} helperText={errors.company?.message} />
      <TextField label="ФИО" required  {...register('contactName', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactName?.message} helperText={errors.contactName?.message} />
      <TextField label="Должность" required  {...register('contactPosition', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactPosition?.message} helperText={errors.contactPosition?.message} />
      <TextField label="Телеграм" required  {...register('contactTelegram', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactTelegram?.message} helperText={errors.contactTelegram?.message} />
      <TextField label="E-mail" required  {...register('contactEmail', { required:  'Поле обязательно к заполнению' })} error={!!errors.contactEmail?.message} helperText={errors.contactEmail?.message} />
      <TextField label="Телефон"  {...register('contactPhone')} />
    </Stack>
  )
}