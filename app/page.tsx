'use client'
import { Button, Modal } from "@mui/material";
import { CandidateSuggestForm } from "../components/CandidateSuggestForm";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

export default function Home() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <Button color='primary' variant="outlined" onClick={() => { setIsLoginOpen(true) }}>Admin</Button>
      </div>
      <CandidateSuggestForm />
      <Modal open={isLoginOpen}>
        <LoginForm />
      </Modal>
    </main>
  )
}
