import { Button, FormHelperText, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material"
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

import { Control, Controller, FieldErrors, UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Inputs } from "../app/types"
import { FormControl, TextField } from "./TextField";
import TechStackSelect from "./TechStackSelect";
import { CloseOutlined } from "@mui/icons-material";
interface IProps {
  register: UseFormRegister<Inputs>
  control: Control<Inputs, any>
  watch: UseFormWatch<Inputs>
  errors: FieldErrors<Inputs>
  setValue: UseFormSetValue<Inputs>
}

const gradeFieldSettings = {
  fieldName: 'UF_CRM_1679398819',
  fieldLabel: 'Грейд',
  type: 'select',
  items: [
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
}

const locationFieldSettings = {
  fieldName: 'UF_CRM_1679398471982',
  fieldLabel: 'Локация',
  type: 'select',
  items: [
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
}
export const SpecialistInfoForm = ({ register, control, watch, errors, setValue }: IProps) => {
  const fileName = watch('resume')
  console.log('fileName', fileName);
  
  
  return (
    <Stack rowGap={1.5}>
      <TextField label="ФИО специалиста" required {...register('specialistName', { required:  'Поле обязательно к заполнению' })} error={!!errors.specialistName?.message} helperText={errors.specialistName?.message} />
      <Controller control={control} name="techStack" rules={{ required:  'Поле обязательно к заполнению' }} render={({ field: { value, onChange, ...field } }) => {          
          return <TechStackSelect techStack={value} setTechStack={onChange} error={errors.techStack?.message} />;
        }} />
      <Controller control={control} name="grade" rules={{ required: 'Поле обязательно к заполнению' }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required error={!!errors.grade?.message}>
            <InputLabel>Грейд</InputLabel>
            <Select input={<OutlinedInput label="Грейд"  />} value={value ?? ''} onChange={onChange}>
              {gradeFieldSettings.items.map(({ ID, VALUE }) => <MenuItem key={ID} value={ID}>{VALUE}</MenuItem>)}
            </Select>
            {errors.grade?.message && <FormHelperText>{errors.grade?.message}</FormHelperText>}
          </FormControl>
          );
        }} />
      <Controller control={control} name="location" rules={{ required: 'Поле обязательно к заполнению' }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required error={!!errors.location?.message} {...field}>
              <InputLabel>Локация</InputLabel>
              <Select input={<OutlinedInput label="Локация" />} value={value ?? ''} onChange={onChange}>
                {locationFieldSettings.items.map(({ ID, VALUE }) => <MenuItem key={ID} value={ID}>{VALUE}</MenuItem>)}
              </Select>
              {errors.location?.message && <FormHelperText>{errors.grade?.message}</FormHelperText>}
          </FormControl>
          );
        }} />
      <TextField label="Ставка" required {...register('rate', { required:  'Поле обязательно к заполнению' })} error={!!errors.rate?.message} helperText={errors.rate?.message} />
      <TextField label="Комментарий" multiline minRows={5} {...register('comment')} />
      <Controller control={control} name="resume" rules={{ required:  'Поле обязательно к заполнению' }} render={
        ({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl error={!!errors.resume?.message}>
                <input
                  style={{ display: "none" }}
                  type="file"
                  hidden
                  id="file-input"
                  accept="application/msword,application/vnd.openxmlformats-"
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