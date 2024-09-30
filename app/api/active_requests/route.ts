import axios from "axios"

const activeRequestsColumn = 'C21:UC_NGHX3A'
export const revalidate = 0
export async function GET() {
                  
  const list = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?filter[STAGE_ID]=${activeRequestsColumn}&select[]=*&select[]=UF_*`).then(({ data }) => {    
    console.log('data', data);
    
    return data.result;
  })  
  console.log('list', list);
  
 
  return Response.json(list)
}