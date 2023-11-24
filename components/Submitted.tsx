import { CheckCircle } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"

interface IProps {
  onReturn: () => void
}
export const Submitted = ({ onReturn }: IProps) => {
  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ width: '400px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 72, lineHeight: 1 }}>
          <CheckCircle color="success" fontSize="inherit" />
        </div>
        <div style={{ display: 'flex',flexDirection: 'column', rowGap: '16px' }}>
          <Typography variant="h6">
            Информация о кандидате отправлена в CosySoft. Благодарим за сотрудничество!
          </Typography>
          <Button fullWidth variant="contained" onClick={onReturn}>Предложить ещё специалиста</Button>
        </div>

      </div>
    </div>
  )
}