import axios from "axios"
import { ApiInputs } from "../../types"
import { activeRequestsColumn } from "../../../utils/constants"

// const dealRateFieldName = 'UF_CRM_1657089293199'
// const dealProjectFieldName = 'UF_CRM_1657089402507'
export async function POST(request: Request) {
  const data: ApiInputs & { activeRequestName: string | null} = await request.json()
  const { comment, company, education, educationProf, educationYear, contactName, contactTelegram, grade, country, city, fileData, specialistName,  rate, activeRequestName } = data
  const contactInfo = `Компания: ${company};\nФИО: ${contactName};\nТелеграм: ${contactTelegram};`

  const activeRequestId = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?filter[STAGE_ID]=${activeRequestsColumn}&filter[TITLE]=${encodeURIComponent(activeRequestName ?? '')}&select[]=*&select[]=UF_*`).then(({ data }) => data.result.at(0)?.ID)
  const { UF_CRM_1657089402507: project, UF_CRM_1657089293199: rate1, UF_CRM_1699960799: techStackId } = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.get?id=${activeRequestId ?? ''}`).then(({ data }) => data.result)
  const resDealStacks = await axios
  .get(`${process.env.BITRIX_WEBHOOK}/crm.deal.userfield.get?id=1037`)
  const resQuoteStacks = await axios
  .get(`${process.env.BITRIX_WEBHOOK}/crm.quote.userfield.get?id=1039`)
  const techStackValue = resDealStacks.data.result.LIST.find(({ ID }) => `${ID}` === techStackId)?.VALUE
  const techStackQuoteId = resQuoteStacks.data.result.LIST.find(({ VALUE }) => `${VALUE}` === techStackValue)?.ID
  
  const fields = {
    TITLE: `${techStackValue} ${specialistName} Предложение от ${company}`,
    STATUS_ID: "C21:UC_NGHX3A", // Колонка - Прямые запросы в работе, воронки - аутстафф запросы
    DEAL_ID: activeRequestId,
    ASSIGNED_BY_ID: '65', // Денис Веказин
    UF_CRM_65538905109A3: techStackQuoteId, // Направление / Стек технологий
    UF_CRM_QUOTE_1723705907780: '629', // Источник ресурса - Внешний
    // UF_CRM_64CCB79D102EB: location, // Локация
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
          COMMENT: `Локация: ${country}, ${city}\nОбразование: ${education}, ${educationProf}, ${educationYear}\nКонтактная информация:\n${contactInfo}\nЧек-лист по требованиям:\n${comment}`,
        }
      })
    }
    return result
  })
  
  return Response.json({ message: `Форма успешно отправлена ${quoteId}` })
}