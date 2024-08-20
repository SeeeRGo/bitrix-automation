import axios from "axios"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  const res = await axios.get(`${process.env.BITRIX_WEBHOOK}/crm.quote.get?id=${id}`).then(({ data }) => data.result)
  return Response.json(res)

}