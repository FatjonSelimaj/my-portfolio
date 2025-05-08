import { Suspense } from "react";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-center text-white mt-10">Caricamento modulo...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
