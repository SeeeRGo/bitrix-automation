import axios from "axios";
import { CandidateSuggestForm } from "../components/CandidateSuggestForm";
import Link from "next/link";
import { Stack } from "@mui/material";

export default async function Home() {
  const { data: { result } } = await axios.get(`${process.env.NEXT_PUBLIC_BITRIX_WEBHOOK_URL}/crm.deal.list?filter[UF_CRM_1684418451]=197`)
  const requests = result.slice(0, 5)
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      HOME
      <Stack>
        {requests.map(({ TITLE, ID }: {TITLE: string, ID: string}) => <Link key={ID} href={"/form/" + ID}>{TITLE}</Link>)}
      </Stack>
    </main>
  )
}
