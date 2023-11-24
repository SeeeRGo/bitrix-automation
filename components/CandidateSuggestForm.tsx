// import { Button, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
"use client"
import React, { useState } from 'react'
import { Inputs } from '../app/types';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { SpecialistInfoForm } from './SpecialistInfoForm';
import { ContactInfoForm } from './ContactInfoForm';
import axios from 'axios';
import Image from 'next/image';
import Logo from '../assets/COSYSOFT LOGO.png';
import { Submitted } from './Submitted';

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

const convertBase64 = (file: File) => new Promise((resolve, reject) => {
  const fileReader = new FileReader()
  fileReader.readAsDataURL(file)

  fileReader.onload = () => {
    resolve(fileReader.result)
  }

  fileReader.onerror = (error) => {
    reject(error)
  }
})

export const CandidateSuggestForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm<Inputs>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(true)

  return (
      <Box padding={3} style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        {isLoading ? (
      <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center'}}>
        <CircularProgress />
      </div>
    ) : isSubmitted ? <Submitted onReturn={() => {
          resetField('comment');
          resetField('grade');
          resetField('location');
          resetField('rate');
          resetField('resume');
          resetField('specialistName');
          resetField('techStack');
          setIsSubmitted(false);
        }} /> : (
      <Stack rowGap={2} sx={{ width: '100%', height: '100%', minWidth: 500, maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center', rowGap: '12px' }}>
            <Image src={Logo} alt='Лого' width={192} height={108} />
            <Typography variant='h4' fontWeight="bold">Форма предложения кандидата</Typography>
          </div>
          <Typography variant='h6'>Информация о специалисте</Typography>
          <SpecialistInfoForm register={register} control={control} watch={watch} setValue={setValue} errors={errors} />
          <Typography variant='h6'>Контактная информация</Typography>
          <ContactInfoForm register={register} errors={errors} />
          <Button
            variant="contained"
            onClick={() => {
              setIsLoading(true)
              handleSubmit(async (data) => {
                const { comment, company, contactEmail, contactName, contactPhone, contactPosition, contactTelegram, grade, location, resume, specialistName, techStack, rate } = data
                const contactInfo = `
                  Компания: ${company};\n
                  ФИО: ${contactName};\n
                  Должность: ${contactPosition};\n
                  Телеграм: ${contactTelegram};\n
                  E-mail: ${contactEmail};\n
                  ${contactPhone ? `Телефон: ${contactPhone};\n` : ''}
                `
                let encodedResume: string = ''
                if (resume) {
                  encodedResume = await convertBase64(resume) as string
                  encodedResume = encodedResume.split(',').at(-1) ?? ''     
                }
                                
                await axios.post(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.deal.add`, {
                  fields: {
                    UF_CRM_1684418451: "197", // Аутстафф
                    TITLE: `${specialistName} ${techStack.VALUE}`,
                    SOURCE_ID: "1", // Источник: Телеграм чат с партнёрами
                    CATEGORY_ID: '19', // Воронка Рекрутинг внешних аутстафферов
                    UF_CRM_1679398819: [grade], // Грейд
                    UF_CRM_1679398471982: location, // Локация
                    UF_CRM_1657089293199: rate,  // Ставка
                    UF_CRM_1699960799: techStack.ID, // Направление стек технологий
                    UF_CRM_653B806285E93: { fileData: [resume?.name, encodedResume] }, // Резюме
                    ASSIGNED_BY_ID: "125",  // Алекксандр Меренчук
                    UF_CRM_1700553861085: contactInfo
                  }
                })
                .then(async ({ data: { result } }) => {
                  if (comment) {
                    axios.post(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.timeline.comment.add`, {
                      fields: {
                        ENTITY_ID: result,
                        ENTITY_TYPE: "deal",
                        COMMENT: `Комментарий партнера: ${comment}`,
                      }
                    })
                  }
                  return result
                })
                setIsLoading(false)          
                setIsSubmitted(true)
              })()
            }}
          >
            Предложить специалиста
          </Button>
        </Stack>
    )}
      </Box>
  )
}
