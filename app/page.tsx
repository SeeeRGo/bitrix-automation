'use client'
import { Stack } from "@mui/material";
import { CandidateSuggestForm } from "../components/CandidateSuggestForm";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams()
  const activeRequestName = searchParams.get('active_request_name')
  
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Stack direction="row">
        <CandidateSuggestForm activeRequestName={activeRequestName} />
      </Stack>
    </main>
  )
}
