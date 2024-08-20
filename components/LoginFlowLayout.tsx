import React from "react";
import { Alert, Box, Card, CardContent, Snackbar, Stack } from "@mui/material";

interface IProps {
  children: React.ReactNode
  error: string
  setError: (error: string) => void
}
export const LoginFlowLayout = ({ children, error, setError }: IProps) => {
  return (
    <Box sx={{ color: 'text.primary', flexGrow: 1, height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ width: 300 }}>
        <CardContent>
          <Stack rowGap={1}>
            {children}
          </Stack>
        </CardContent>
      </Card>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => { setError('') }}>
        <Alert onClose={() => { setError('') }} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}

