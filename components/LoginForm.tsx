"use client"
import { Button, FormHelperText, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { LoginFlowLayout } from "./LoginFlowLayout";
import { signIn } from "../utils/signIn";
import { createSession } from "../app/lib/session";

const schema = z.object({
  email: z.string().email({ message: 'Юзернейм не юзернейм, выйди и зайди нормально' }),
  password: z.string().min(1, { message: 'Если у вас нет пароля... Его невозможно украсть. Все понимаю, но в приложение не пущу' }),
});

export const LoginForm = () => {
  const { push } = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <LoginFlowLayout error="" setError={() => {}}>
      <Typography variant="h6">Адмииииин!!!</Typography>
      <TextField label="Email" InputLabelProps={{ shrink: true }} {...register('email')} />
      {errors.email?.message && <FormHelperText error>{errors.email.message}</FormHelperText>}
      <TextField 
        label="Пароль" 
        InputLabelProps={{ shrink: true }}               
        inputProps={{ type: "password" }}
        {...register('password')}
      />
      {errors.password?.message && <FormHelperText error>{errors.password.message}</FormHelperText>}
      <Button variant="contained" onClick={() => handleSubmit(async (data) => {
          await signIn(data)
          push('/admin')
    })()}>Войти</Button>
    </LoginFlowLayout>
  );
}
