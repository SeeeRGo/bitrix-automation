'use client'
import { Button, Card, Modal, Stack, Typography } from "@mui/material";
import { CandidateSuggestForm } from "../components/CandidateSuggestForm";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const searchParams = useSearchParams()
  const isAdmin = searchParams.get('admin') === 'true'
  const activeRequestId = searchParams.get('active_request_id')
  
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      {isAdmin ? <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Button color='primary' variant="outlined" onClick={() => { setIsLoginOpen(true) }}>Admin</Button>
      </div> : null}
      <Stack direction="row">
        <CandidateSuggestForm activeRequestId={activeRequestId} />
      </Stack>
      <Modal open={isLoginOpen}>
        <LoginForm />
      </Modal>
    </main>
  )
}
