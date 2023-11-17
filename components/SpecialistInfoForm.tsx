import { Button, InputLabel, MenuItem, OutlinedInput, Select, Stack, Typography } from "@mui/material"
import FileUploadOutlined from "@mui/icons-material/FileUploadOutlined";

import { Control, Controller, UseFormRegister, UseFormWatch } from "react-hook-form"
import { Inputs } from "../app/types"
import { FormControl, TextField } from "./TextField";
import TechStackSelect from "./TechStackSelect";
interface IProps {
  register: UseFormRegister<Inputs>
  control: Control<Inputs, any>
  watch: UseFormWatch<Inputs>
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
    "ID": "189",
    "VALUE": "Не важно (Любая локация)"
    },
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
    "ID": "171",
    "VALUE": "Вне РФ и Дружественных стран"
    },
    {
    "ID": "173",
    "VALUE": "Вне РФ"
    },
    {
    "ID": "175",
    "VALUE": "Нет данных"
    }
  ]
}
export const SpecialistInfoForm = ({ register, control, watch }: IProps) => {
  const fileName = watch('resume')  
  return (
    <Stack rowGap={1.5}>
      <TextField label="ФИО специалиста" required {...register('specialistName', { required: true })} />
      <Controller control={control} name="techStack" rules={{ required: true }} render={({ field: { value, onChange, ...field } }) => {          
          return <TechStackSelect techStack={value} setTechStack={onChange} />;
        }} />
      <Controller control={control} name="grade" rules={{ required: true }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required {...field}>
            <InputLabel>Грейд</InputLabel>
            <Select input={<OutlinedInput label="Грейд" />} value={value} onChange={onChange}>
              {gradeFieldSettings.items.map(({ ID, VALUE }) => <MenuItem key={ID} value={ID}>{VALUE}</MenuItem>)}
            </Select>
          </FormControl>
          );
        }} />
      <Controller control={control} name="location" rules={{ required: true }} render={({ field: { value, onChange, ...field } }) => {          
          return (
            <FormControl required {...field}>
              <InputLabel>Локация</InputLabel>
              <Select input={<OutlinedInput label="Локация" />} value={value} onChange={onChange}>
                {locationFieldSettings.items.map(({ ID, VALUE }) => <MenuItem key={ID} value={ID}>{VALUE}</MenuItem>)}
              </Select>
          </FormControl>
          );
        }} />
      <TextField label="Комментарий" multiline minRows={5} {...register('comment')} />
      <Controller control={control} name="resume" rules={{ required: true }} render={
        ({ field: { value, onChange, ...field } }) => {          
          return <>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    hidden
                    id="file-input"
                    onChange={(event) => {
                      if (event.target.files) {
                        onChange(event.target.files[0]);
                      }}}
                    {...field} 
                  />
                  <Button startIcon={<FileUploadOutlined />} onClick={() => document.getElementById("file-input")?.click()} variant="outlined">{"Файл резюме"}</Button>
          </>;
        }
      } />
      {fileName && <Typography>{fileName.name}</Typography>}
    </Stack>
  )
}