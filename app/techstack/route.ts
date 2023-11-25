import axios from 'axios'
import { NextResponse } from 'next/server'
 
export async function GET() {
  const res = await axios
    .get(`${process.env.BITRIX_WEBHOOK}/crm.deal.userfield.get?id=1037`)
  return NextResponse.json(res.data, { status: 200 })
}