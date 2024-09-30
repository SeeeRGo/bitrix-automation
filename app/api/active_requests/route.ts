import axios from "axios"
import { activeRequestsColumn } from "../../../utils/constants";

export const revalidate = 0
export async function GET() {
                  
  const list = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.deal.list?filter[STAGE_ID]=${activeRequestsColumn}&select[]=*&select[]=UF_*`).then(({ data }) => {        
    return data.result;
  })  
  
 
  return Response.json(list)
}