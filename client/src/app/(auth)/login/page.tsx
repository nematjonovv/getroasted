
import LoginForm from '@/src/features/auth/components/LoginForm'
import Logo from '@/src/shared/ui/Logo'

export default function LoginPage() {

  return (
    <div className='w-1/2 h-screen flex flex-col gap-10 justify-center items-center'>
      <Logo />
      <LoginForm />
    </div>
  )
}