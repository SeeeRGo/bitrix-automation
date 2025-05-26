import { Button, FormControl, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material"
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Inputs } from "../app/types"
import { CloseOutlined } from "@mui/icons-material";
import { useSearchParams } from "next/navigation";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/ru';

interface IProps {
  register: UseFormRegister<Inputs>
  control: Control<Inputs, any>
  watch: UseFormWatch<Inputs>
  errors: FieldErrors<Inputs>
  setValue: UseFormSetValue<Inputs>
  isQuote: boolean
}

const gradeDealItems = [
    {
    "ID": "177",
    "VALUE": "Junior"
    },
    {
    "ID": "179",
    "VALUE": "Middle"
    },
    {
    "ID": "181",
    "VALUE": "Middle+"
    },
    {
    "ID": "183",
    "VALUE": "Senior"
    },
    {
    "ID": "185",
    "VALUE": "Lead"
    }
  ]
const locationQuoteItems = [
  {
  "ID": "277",
  "VALUE": "РФ",
  },
  {
  "ID": "279",
  "VALUE": "РФ + РБ",
  },
  {
  "ID": "283",
  "VALUE": "РФ + Дружественные страны",
  },
  {
  "ID": "285",
  "VALUE": "Вне РФ",
  },
]

const gradeQuoteItems = [
  {
  "ID": "289",
  "VALUE": "Junior",
  },
  {
  "ID": "291",
  "VALUE": "Middle",
  },
  {
  "ID": "293",
  "VALUE": "Middle+",
  },
  {
  "ID": "295",
  "VALUE": "Senior",
  },
  {
  "ID": "297",
  "VALUE": "Lead",
  }
  ]

const locationDealItems = [
    {
    "ID": "167",
    "VALUE": "РФ"
    },
    {
    "ID": "187",
    "VALUE": "РФ + РБ"
    },
    {
    "ID": "169",
    "VALUE": "РФ + Дружественные страны"
    },
    {
    "ID": "173",
    "VALUE": "Вне РФ"
    },
  ]
export const SpecialistInfoForm = ({ register, control, watch, errors, setValue }: IProps) => {
  const fileName = watch('resume')  
  const searchParams = useSearchParams()
  const activeRequestName = searchParams.get('active_request_name')
  const isQuote = !!activeRequestName
  const gradeItems = isQuote ? gradeQuoteItems : gradeDealItems
  return (
    <Stack rowGap={1.5}>
      <TextField label="ФИО специалиста" required {...register('specialistName', { required:  'Поле обязательно к заполнению' })} error={!!errors.specialistName?.message} helperText={errors.specialistName?.message} />
      <Controller control={control} name="grade" rules={{ required: 'Поле обязательно к заполнению' }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required error={!!errors.grade?.message}>
            <InputLabel>Грейд</InputLabel>
            <Select input={<OutlinedInput label="Грейд"  />} value={value ?? ''} onChange={onChange}>
              {gradeItems.map(({ ID, VALUE }) => <MenuItem key={ID} value={ID}>{VALUE}</MenuItem>)}
            </Select>
            {errors.grade?.message && <FormHelperText>{errors.grade?.message}</FormHelperText>}
          </FormControl>
          );
        }} />
      <Controller control={control} name="birthdate" rules={{ required: 'Поле обязательно к заполнению' }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required error={!!errors.birthdate?.message}>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                  <DatePicker
                      label="Дата Рождения"
                      {...field}
                  />
              </LocalizationProvider>
            {errors.birthdate?.message && <FormHelperText>{errors.birthdate?.message}</FormHelperText>}
          </FormControl>
          );
        }} />
      <TextField label="Локация специалиста, страна" required {...register('country', { required:  'Поле обязательно к заполнению' })} error={!!errors.country?.message} helperText={errors.country?.message} />
      <TextField label="Локация специалиста, город" required {...register('city', { required:  'Поле обязательно к заполнению' })} error={!!errors.city?.message} helperText={errors.city?.message} />
      <TextField label="Ставка, руб" required type="number" {...register('rate', { required:  'Поле обязательно к заполнению' })} error={!!errors.rate?.message} helperText={errors.rate?.message} />
      <TextField label="Образование, учебное заведение" required {...register('education', { required:  'Поле обязательно к заполнению' })} error={!!errors.rate?.message} helperText={errors.rate?.message} />
      <TextField label="Образование, Специальность" required  {...register('educationProf', { required:  'Поле обязательно к заполнению' })} error={!!errors.rate?.message} helperText={errors.rate?.message} />
      <TextField label="Образование, год выпуска" required type="number" {...register('educationYear', { required:  'Поле обязательно к заполнению' })} error={!!errors.rate?.message} helperText={errors.rate?.message} />
      <TextField label="Чек-лист по требованиям" multiline rows={5} {...register('comment')} />
      <Controller control={control} name="resume" rules={{ required:  'Поле обязательно к заполнению' }} render={
        ({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl error={!!errors.resume?.message}>
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  id="file-input"
                  accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(event) => {
                    if (event.target.files) {
                      onChange(event.target.files[0]);
                    }}}
                  {...field} 
                />
                <Button startIcon={<FileUploadOutlined />} onClick={() => document.getElementById("file-input")?.click()} variant="outlined">{"Файл резюме в формате doc, docx"}</Button>
                {errors.resume?.message && <FormHelperText>{errors.resume?.message}</FormHelperText>}
              </FormControl>
          );
        }
      } />
      {fileName && <Stack direction="row" justifyContent="space-between"><Typography>{fileName.name}</Typography><CloseOutlined onClick={() => { setValue('resume', undefined) }}/></Stack>}
    </Stack>
  )
}