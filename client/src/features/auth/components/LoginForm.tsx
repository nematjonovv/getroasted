'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/src/features/auth/useAuth'
import Loader, { Spinner } from '@/src/shared/ui/Loader'
import { useNotification } from '@/src/shared/lib/NotificationProvider'
import axios, { AxiosError } from 'axios'
function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { success, error1 } = useNotification()

  const { mutate: login, isPending, isError, error } = useLogin()
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login(
      { username, password },
      {
        onSuccess: () => success("Muvaffaqiyatli kirdingiz!")
      }
    )
  }

  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col space-y-5'>
      <input onChange={(e) => setUsername(e.target.value)} value={username} className='border border-(--text-10) rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition' type="text" placeholder='Username' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-(--text-10) rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition' type="password" placeholder='Password' />
      <div className='w-full flex justify-between items-center text-(--text-20)'>
        <Link className='transition hover:text-(--text-50) font-syne' href={"/register"}>Don't have an account?</Link>
        <Link className='transition hover:text-(--text-50) font-syne' href={"#"}>Forgot password?</Link>
      </div>

      <button type='submit' className='border border-(--text-50) text-(--text) py-3 rounded-2xl cursor-pointer hover:bg-(--primary) active:scale-99 transition flex justify-center items-center'>
        {isPending ? <Spinner /> : "Sign In"}
      </button>
    </form>
  );
}

export default LoginForm;