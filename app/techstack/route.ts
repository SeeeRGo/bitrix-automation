import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const isQuote = searchParams.get('is_quote')

  const fieldId = isQuote === 'true' ? '1039' : '1037'
  const entity = isQuote === 'true' ? 'quote' : 'deal'
  const res = await axios
    .get(`${process.env.BITRIX_WEBHOOK}/crm.${entity}.userfield.get?id=${fieldId}`)
  return NextResponse.json(res.data, { status: 200 })
}