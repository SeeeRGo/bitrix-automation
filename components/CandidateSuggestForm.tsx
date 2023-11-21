// import { Button, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
"use client"
import React, { useState } from 'react'
import { Inputs } from '../app/types';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SpecialistInfoForm } from './SpecialistInfoForm';
import { ContactInfoForm } from './ContactInfoForm';
import axios from 'axios';
// import axios from 'axios'


// const gradeFieldSettings = {
//   fieldName: 'UF_CRM_1679398819',
//   fieldLabel: 'Грейд',
//   type: 'select',
//   items: [
//     {
//     "ID": "177",
//     "VALUE": "Junior"
//     },
//     {
//     "ID": "179",
//     "VALUE": "Middle"
//     },
//     {
//     "ID": "181",
//     "VALUE": "Middle+"
//     },
//     {
//     "ID": "183",
//     "VALUE": "Senior"
//     },
//     {
//     "ID": "185",
//     "VALUE": "Lead"
//     }
//   ]
// }
// const locationFieldSettings = {
//   fieldName: 'UF_CRM_1679398471982',
//   fieldLabel: 'Локация',
//   type: 'select',
//   items: [
//     {
//     "ID": "189",
//     "VALUE": "Не важно (Любая локация)"
//     },
//     {
//     "ID": "167",
//     "VALUE": "РФ"
//     },
//     {
//     "ID": "187",
//     "VALUE": "РФ + РБ"
//     },
//     {
//     "ID": "169",
//     "VALUE": "РФ + Дружественные страны"
//     },
//     {
//     "ID": "171",
//     "VALUE": "Вне РФ и Дружественных стран"
//     },
//     {
//     "ID": "173",
//     "VALUE": "Вне РФ"
//     },
//     {
//     "ID": "175",
//     "VALUE": "Нет данных"
//     }
//   ]
// }
// "UF_CRM_1700553861085": {
//   "type": "string",
//   "isRequired": false,
//   "isReadOnly": false,
//   "isImmutable": false,
//   "isMultiple": false,
//   "isDynamic": true,
//   "title": "UF_CRM_1700553861085",
//   "listLabel": "Контактная информация из партнёрской формы",
//   "formLabel": "Контактная информация из партнёрской формы",
//   "filterLabel": "Контактная информация из партнёрской формы",
//   "settings": {
//   "SIZE": 20,
//   "ROWS": 1,
//   "REGEXP": "",
//   "MIN_LENGTH": 0,
//   "MAX_LENGTH": 0,
//   "DEFAULT_VALUE": null
//   }
//   }
//   }

export const CandidateSuggestForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const [isLoading, setIsLoading] = useState(false)

  return isLoading ? (
    <div style={{ display: 'flex', width: '100%', minHeight: '100%', alignItems: 'center', justifyContent: 'center'}}>
      Loading...
    </div>
  ) : (
    <Box style={{ display: 'flex', width: '100%', justifyContent: 'center'}}>
      <Stack rowGap={2} sx={{ width: '50%', minWidth: 500, maxWidth: 800, }}>
        <Typography variant='h5'>Форма предложения кандидата для CosySoft (коза)</Typography>
        <Typography variant='h6'>Информация о специалисте</Typography>
        <SpecialistInfoForm register={register} control={control} watch={watch} />
        <Typography variant='h6'>Контактная информация</Typography>
        <ContactInfoForm register={register} />
        <Button
          variant="contained"
          onClick={() => {
            setIsLoading(true)
            handleSubmit((data) => {
              const { comment, company, contactEmail, contactName, contactPhone, contactPosition, contactTelegram, grade, location, resume, specialistName, techStack } = data
              const contactInfo = `
                Компания: ${company};\n
                ФИО: ${contactName};\n
                Должность: ${contactPosition};\n
                Телеграм: ${contactTelegram};\n
                E-mail: ${contactEmail};\n
                ${contactPhone ? `Телефон: ${contactPhone};\n` : ''}
              `
              
              axios.post(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.deal.add`, {
                fields: {
                  UF_CRM_1684418451: "197", // Аутстафф
                  TITLE: techStack.VALUE,
                  SOURCE_ID: "1", // Источник: Телеграм чат с партнёрами
                  CATEGORY_ID: '19', // Воронка Рекрутинг внешних аутстафферов
                  UF_CRM_1679398819: grade, // Грейд
                  UF_CRM_1679398471982: location, // Локация
                  UF_CRM_1699960799: techStack.ID, // Направление стек технологий
                  ASSIGNED_BY_ID: "55",  // Наталья Ведянова
                  COMMENTS: comment, // Комментарий
                  UF_CRM_653B806285E93: resume, // Резюме
                  'ФИО Специалиста': specialistName,
                  UF_CRM_1700553861085: contactInfo
                }
              })
            })()
            setIsLoading(false)          
          }}
        >
          Предложить специалиста
        </Button>
      </Stack>
    </Box>
  )
}
