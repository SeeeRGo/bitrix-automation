import { CandidateSuggestForm } from "../components/CandidateSuggestForm";

export default async function Home() {  
  return (
    <main style={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <CandidateSuggestForm />
    </main>
  )
}
