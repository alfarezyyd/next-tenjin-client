import AuthWrapper from "/src/components/auth/AuthWrapper";
import Register from "@/components/auth/Register";

export default function Page() {
  return (
    <AuthWrapper>
      <Register/>
    </AuthWrapper>
  )
}