import axios from "axios"

export async function GET() {
                  
  const list = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.quote.list`).then(({ data }) => data.result)
 
  return Response.json(list)
}