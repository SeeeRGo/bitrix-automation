import axios from "axios"

const activeRequestsColumn = 'C21:UC_NGHX3A'

export async function GET() {
                  
  const list = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?filter[STAGE_ID]=${activeRequestsColumn}&select[]=*&select[]=UF_*`).then(({ data }) => {    
    return data.result;
  })  
 
  return Response.json(list)
}