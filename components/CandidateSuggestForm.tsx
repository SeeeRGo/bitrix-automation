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
import { convertBase64 } from '../utils/convertBase64';

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
    setValue,
    resetField,
    formState: { errors },
  } = useForm<Inputs>()
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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
              handleSubmit(async ({ resume, ...data}) => {
                let encodedResume: string = ''
                if (resume) {
                  encodedResume = await convertBase64(resume) as string
                  encodedResume = encodedResume.split(',').at(-1) ?? ''     
                }
                const res = await axios.post('/api', { ...data, fileData: {fileData: [resume?.name ?? '', encodedResume]} })
                console.log('res data', res.data);
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
