import axios from "axios"
import { ApiInputs } from "../../types"
import { activeRequestsColumn } from "../../../utils/constants"

// const dealRateFieldName = 'UF_CRM_1657089293199'
// const dealProjectFieldName = 'UF_CRM_1657089402507'
const findDealByTitle = 'crm.deal.list?filter[STAGE_ID]=C21:UC_NGHX3A&filter[TITLE]=Back%20Python&select[]=*&select[]=UF_*'
export async function POST(request: Request) {
  const data: ApiInputs & { activeRequestName: string | null} = await request.json()
  const { comment, company, contactEmail, contactName, contactPhone, contactPosition, contactTelegram, grade, location, fileData, specialistName, techStack, rate, activeRequestName } = data
  const contactInfo = `
    Компания: ${company};\n
    ФИО: ${contactName};\n
    Должность: ${contactPosition};\n
    Телеграм: ${contactTelegram};\n
    E-mail: ${contactEmail};\n
    ${contactPhone ? `Телефон: ${contactPhone};\n` : ''}
    Доп коммент: ${comment}
  `

  const activeRequestId = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?filter[STAGE_ID]=${activeRequestsColumn}&filter[TITLE]=${encodeURIComponent(activeRequestName ?? '')}&select[]=*&select[]=UF_*`).then(({ data }) => data.result.at(0)?.ID)
  const { UF_CRM_1657089402507: project, UF_CRM_1657089293199: rate1 } = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.get?id=${activeRequestId ?? ''}`).then(({ data }) => data.result)
  
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
  
  const quoteId = await axios.post(`${process.env.BITRIX_WEBHOOK}/crm.quote.add`, {
		fields
	}).then(async ({ data: { result } }) => {
    if (contactInfo) {
      axios.post(`${process.env.BITRIX_WEBHOOK}/crm.timeline.comment.add`, {
        fields: {
          ENTITY_ID: result,
          ENTITY_TYPE: "quote",
          COMMENT: `Контактная информация:\n${contactInfo}`,
        }
      })
    }
    return result
  })
 
  return Response.json({ message: `Форма успешно отправлена ${quoteId}` })
}