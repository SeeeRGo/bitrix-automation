import { CandidateSuggestForm } from "../../../components/CandidateSuggestForm";

export default function Form({params}: { params: { id: string }}) {
  return (
    <div>
      <CandidateSuggestForm id={params.id} />
    </div>
  )
}