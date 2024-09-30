import { Modal } from "@mui/material";
import { LoginForm } from "../../components/LoginForm";

export default function Login() {
    return (
      <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 16 }}>
      <Modal open>
        <LoginForm />
      </Modal>
      </main>
    )
}
