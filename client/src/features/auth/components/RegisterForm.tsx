'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useLogin, useRegister } from '@/src/features/auth/useAuth'
import Loader, { Spinner } from '@/src/shared/ui/Loader'
import { useNotification } from '@/src/shared/lib/NotificationProvider'
function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { success, error1 } = useNotification()

  const { mutate: register, isPending, isError, error } = useRegister()
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    register({ password, username, email }, {
      onSuccess: () => success("Muvaffaqiyatli ro'yxatdan o'tdingiz!"),
      onError: (err) => console.log(err.message)
    })
  }
  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col space-y-5'>
      <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-(--text-10) rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition' type="email" placeholder='Email' />
      <input onChange={(e) => setUsername(e.target.value)} value={username} className='border border-(--text-10) rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition' type="text" placeholder='Username' />
      <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-(--text-10) rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition' type="password" placeholder='Password' />
      <div className='w-full flex justify-between items-center text-(--text-20)'>
        <Link className='transition hover:text-(--text-50) font-syne' href={"/login"}>Already have an account?</Link>
      </div>

      <button type='submit' className='border border-(--text-50) text-(--text) py-3 rounded-2xl cursor-pointer hover:bg-(--primary) active:scale-99 transition flex justify-center items-center'>
        {isPending ? <Spinner /> : "Create account"}
      </button>
    </form>
  );
}

export default RegisterForm;