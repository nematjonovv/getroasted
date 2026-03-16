import RegisterForm from "@/src/features/auth/components/RegisterForm";
import Logo from "@/src/shared/ui/Logo";

function RegisterPage() {


  return (
    <div className='w-1/2 h-screen flex flex-col gap-10 justify-center items-center'>
      <Logo />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;



