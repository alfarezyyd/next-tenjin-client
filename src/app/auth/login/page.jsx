import Login from "/components/auth/Login";
import AuthWrapper from "/components/auth/AuthWrapper";

export default function Page() {
  return (
    <AuthWrapper>
      <Login/>
    </AuthWrapper>
  )
}