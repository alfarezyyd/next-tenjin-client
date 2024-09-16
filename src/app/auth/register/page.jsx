import Login from "/src/components/auth/Login";
import AuthWrapper from "/src/components/auth/AuthWrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <Login/>
    </AuthWrapper>
  )
}