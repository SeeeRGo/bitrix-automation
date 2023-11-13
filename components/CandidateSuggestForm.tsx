// import { Button, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Stack, TextField } from '@mui/material'
"use client"
import React, { useState } from 'react'
import CompanySelect from './CompanySelect'
import { Company, Contact } from '../app/types';
import ContactsSelect from './ContactsSelect';
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
// const assignedFieldSettings = {
//   fieldName: 'ASSIGNED_BY_ID',
//   fieldLabel: 'Ответственный',
//   type: 'select',
//   items: [
//     {
//     "ID": "55",
//     "VALUE": "Наталья Ведянова"
//     },
//     {
//     "ID": "125",
//     "VALUE": "Александр Меренчук"
//     },
//   ]
// }

// const getStageID = (status: IMessage['status']) => {
//   switch (status) {
//     case MessageStatus.INTERESTING:
//       return 'C21:PREPAYMENT_INVOIC'
//       case MessageStatus.APPROVED:
//       return 'C21:NEW'
//     default:
//       return 'NEW'
//   }
// }

// Relevant deals (STAGE_ID - стадия сделки интересное/потенциально интересное)
// {NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.deal.list?order[ID]=desc&filter[CATEGORY_ID]=21
// Воронки (Categories - запросы аутстафф это ID=21)
// {NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.category.list?entityTypeId=2

interface IProps {
  id: string
}

export const CandidateSuggestForm = ({ id }: IProps ) => {
  const [company, setCompany] = React.useState<Company | null>(null);
  const [contact, setContact] = React.useState<Contact | null>(null);
  const [isLoading, setIsLoading] = useState(false)

  return isLoading ? (
    <div style={{ display: 'flex', width: '100%', minHeight: '100%', alignItems: 'center', justifyContent: 'center'}}>
      Loading...
    </div>
  ) : (
    <div>
      <CompanySelect company={company} setCompany={setCompany} />
      <ContactsSelect contact={contact} setContact={setContact} />
      <button
        onClick={() => {
          setIsLoading(true)
          // axios.post(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.deal.add`, {
          //   fields: {
          //     UF_CRM_1684418451: "197", // Аутстафф
          //     COMPANY_ID: company ? company.id : null,
          //     TITLE: title,
          //     SOURCE_ID: "1", // Источник: Телеграм чат с партнёрами
          //     STAGE_ID: getStageID(status),
          //     CATEGORY_ID: '21', // Воронка запросы аутстафф
          //     UF_CRM_1679398819: grade, // Грейд
          //     UF_CRM_1679398471982: location, // Локация
          //     UF_CRM_1657089402507: project, // Проект
          //     UF_CRM_1657089293199: rate,  // Ставка
          //     UF_CRM_1679397609465: numPeople, // Кол-во специалистов
          //     ASSIGNED_BY_ID: assigned,
          //   }
          // })
          console.log('ID ' + id);
          setIsLoading(false)          
        }}
      >
        Создать сделку
      </button>
    </div>
  )
}