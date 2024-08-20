'use client'
import { ContentCopy } from "@mui/icons-material";
import { Alert, Card, Grid, Snackbar, Typography } from "@mui/material";
import axios from "axios"
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([])
  const [success, setSuccess] = useState('')
  useEffect(() => {
    axios.get('/api/active_requests').then(({ data }) => setData(data))
  }, [])
  
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h5">Прямые запросы в работе</Typography>
      <Grid container rowGap={2} columnGap={2}>
        {data.map(({ ID, TITLE }) => (
          <Grid item key={ID}>
            <Card>
              <Typography>ID: {ID}</Typography>
              <Typography>TITLE: {TITLE}</Typography>
              <Typography><Link href={`https://bitrix-automation.vercel.app?active_request_id=${ID}`}>Ссылка для партнеров</Link><ContentCopy onClick={() => {
                navigator.clipboard.writeText(`https://bitrix-automation.vercel.app?active_request_id=${ID}`)
                setSuccess('Ссылка успешно скопирована')
              }} /></Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Snackbar open={!!success} autoHideDuration={6000} onClose={() => { setSuccess('') }}>
        <Alert onClose={() => { setSuccess('') }} severity="success" sx={{ width: '100%' }}>
          {success}
        </Alert>
      </Snackbar>
    </main>
  )
}
