import axios from "axios"
import { ApiInputs } from "../../types"

// const personSourceOptions = [
//   {
//   "ID": "627",
//   "VALUE": "Штатный"
//   },
//   {
//   "ID": "629",
//   "VALUE": "Внешний"
//   }
// ]

// const locationOptions = [
//   {
//   "ID": "275",
//   "VALUE": "Не важно (Любая локация)"
//   },
//   {
//   "ID": "277",
//   "VALUE": "РФ"
//   },
//   {
//   "ID": "279",
//   "VALUE": "РФ + РБ"
//   },
//   {
//   "ID": "281",
//   "VALUE": "РФ + РБ + КЗ"
//   },
//   {
//   "ID": "283",
//   "VALUE": "РФ + Дружественные страны"
//   },
//   {
//   "ID": "285",
//   "VALUE": "Вне РФ"
//   },
//   {
//   "ID": "287",
//   "VALUE": "Нет данных"
//   }
//   ]

const gradeQuoteOptions = [
  {
  "ID": "289",
  "VALUE": "Junior"
  },
  {
  "ID": "291",
  "VALUE": "Middle"
  },
  {
  "ID": "293",
  "VALUE": "Middle+"
  },
  {
  "ID": "295",
  "VALUE": "Senior"
  },
  {
  "ID": "297",
  "VALUE": "Lead"
  }
  ]
const gradeDealOptions = [
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
// const dealRateFieldName = 'UF_CRM_1657089293199'
// const dealProjectFieldName = 'UF_CRM_1657089402507'
export async function POST(request: Request) {
  const data: ApiInputs & { activeRequestId: string | null} = await request.json()
  const { comment, company, contactEmail, contactName, contactPhone, contactPosition, contactTelegram, grade, location, fileData, specialistName, techStack, rate, activeRequestId } = data
  const contactInfo = `
    Компания: ${company};\n
    ФИО: ${contactName};\n
    Должность: ${contactPosition};\n
    Телеграм: ${contactTelegram};\n
    E-mail: ${contactEmail};\n

    ${contactPhone ? `Телефон: ${contactPhone};\n` : ''}
    Доп коммент: ${comment}
  `

  const { UF_CRM_1657089402507: project, UF_CRM_1657089293199: rate1 } = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?id=${activeRequestId ?? ''}`).then(({ data }) => data.result)
  const dealGrade = gradeDealOptions.find(({ ID }) => grade === ID)?.VALUE
  const quoteGrade = dealGrade ? gradeQuoteOptions.find(({ VALUE }) => VALUE)?.ID : null
 
  const list = await axios.post(`${process.env.BITRIX_WEBHOOK}/crm.quote.add`, {
		fields:
		{
			TITLE: `${techStack.VALUE} ${specialistName} Предложение от ${company}`,
			STATUS_ID: "C21:UC_NGHX3A", // Колонка - Прямые запросы в работе, воронки - аутстафф запросы
      DEAL_ID: activeRequestId,
			ASSIGNED_BY_ID: '65', // Денис Веказин
      UF_CRM_65538905109A3: techStack.ID, // Направление / Стек технологий
      UF_CRM_QUOTE_1723705907780: '629', // Источник ресурса - Внешний
      UF_CRM_64CCB79D102EB: location, // Локация
      UF_CRM_64CCB79BB913B: project, // Проект
      UF_CRM_64CCB79BAEAA3: rate1, // Ставка 1
      UF_CRM_QUOTE_1724244327601: rate, // Ставка специалиста
      UF_CRM_654100304A99D: fileData, // Файл резюме
      UF_CRM_64CCB79D1DDA6: quoteGrade ? [quoteGrade] : [], // Грейд
      COMMENTS: contactInfo,
		}
	}).then(({ data }) => data.result)
 
  return Response.json(list)
}