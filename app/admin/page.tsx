'use client'
import { Card, Grid, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";

export default function Admin() {
  const [data, setData] = useState([])
  useEffect(() => {
    axios.get('/api/quotes').then(({ data }) => setData(data))
  }, [])
  
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      Предложения
      <Grid container rowGap={2} columnGap={2}>
        {data.map(({ ID, TITLE }) => (
          <Grid item>
            <Card>
              <Typography>ID: {ID}</Typography>
              <Typography>TITLE: {TITLE}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </main>
  )
}
