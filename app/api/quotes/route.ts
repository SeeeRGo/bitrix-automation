import axios from "axios"
import { ApiInputs } from "../../types"

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
  const fields = {
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
    UF_CRM_QUOTE_1724244360471: fileData, // Файл резюме
    UF_CRM_64CCB79D1DDA6: [grade], // Грейд
    COMMENTS: contactInfo,
  }
  console.log('quote fields', fields);
  
  const list = await axios.post(`${process.env.BITRIX_WEBHOOK}/crm.quote.add`, {
		fields
	}).then(({ data }) => data.result)
 
  return Response.json(list)
}