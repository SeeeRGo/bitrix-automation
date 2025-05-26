import axios from "axios"
import { ApiInputs } from "../types"

export async function POST(request: Request) {
  const data: ApiInputs = await request.json()
  // const { comment, company, contactEmail, contactName, contactPhone, contactPosition, contactTelegram, grade, location, fileData, specialistName, techStack, rate } = data
  // const contactInfo = `
  //   Компания: ${company};\n
  //   ФИО: ${contactName};\n
  //   Должность: ${contactPosition};\n
  //   Телеграм: ${contactTelegram};\n
  //   E-mail: ${contactEmail};\n
  //   ${contactPhone ? `Телефон: ${contactPhone};\n` : ''}
  // `
  // const fields = {
  //   UF_CRM_1684418451: "197", // Аутстафф
  //   TITLE: `${specialistName} ${techStack.VALUE}`,
  //   SOURCE_ID: "1", // Источник: Телеграм чат с партнёрами
  //   CATEGORY_ID: '19', // Воронка Рекрутинг внешних аутстафферов
  //   UF_CRM_1679398819: [grade], // Грейд
  //   UF_CRM_1679398471982: location, // Локация
  //   UF_CRM_1657089293199: rate,  // Ставка
  //   UF_CRM_1699960799: techStack.ID, // Направление стек технологий
  //   UF_CRM_653B806285E93: fileData, // Резюме
  //   ASSIGNED_BY_ID: "125",  // Алекксандр Меренчук
  //   UF_CRM_1700553861085: contactInfo
  // }
  
  // const dealId = await axios.post(`${process.env.BITRIX_WEBHOOK}/crm.deal.add`, {
  //   fields
  // })
  // .then(async ({ data: { result } }) => {
  //   if (comment) {
  //     axios.post(`${process.env.BITRIX_WEBHOOK}/crm.timeline.comment.add`, {
  //       fields: {
  //         ENTITY_ID: result,
  //         ENTITY_TYPE: "deal",
  //         COMMENT: `Комментарий партнера: ${comment}`,
  //       }
  //     })
  //   }
  //   return result
  // })
 
  return Response.json({ message: `Форма успешно отправлена` })
}