'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRegister } from '@/src/features/auth/useAuth'
import { Spinner } from '@/src/shared/ui/Loader'
import { useNotification } from '@/src/shared/lib/NotificationProvider'
import axios from 'axios'
import { IErrorFields } from '@/src/shared/types/type'
function RegisterForm() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { success, error1 } = useNotification()
  const [err, serErr] = useState<IErrorFields<{ password: string[], username: string[], email: string[] }> | null>(null)
  const [showErr, setShowErr] = useState(false)
  const { mutate: register, isPending, isError, error } = useRegister()
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    register({ password, username, email }, {
      onSuccess: () => success("Muvaffaqiyatli ro'yxatdan o'tdingiz!"),
      onError: ((err) => {
        if (axios.isAxiosError(err) && err.response?.data) {
          const data = err.response.data as IErrorFields<{ username: string[]; password: string[], email: string[] }>;
          serErr(data);
          setShowErr(true);

          if (!data.errors || Object.keys(data.errors).length === 0) {
            error1(data.message);
          }
        }
      })
    })
  }
  useEffect(() => {
    if (showErr) {
      const timeout = setTimeout(() => setShowErr(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showErr]);
  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col space-y-5'>
      <label className='relative w-full mt-10'>
        <p className={`${showErr ? "block" : "hidden"} transition duration-300 ease-in-out text-sm text-red-600 absolute -top-7 left-2`}>
          {err?.errors?.email?.join(", ") ?? ""}
        </p>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Email"
          className={`
      border w-full rounded-2xl transition duration-300 ease-in-out bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary)
      ${err?.errors?.email && showErr ? "ring-1 ring-red-600 border-red-600" : "border-(--text-10)"}
    `}
        />
      </label>

      <label className='relative mt-3 w-full'>
        <p className={`${showErr ? "block" : "hidden"} transition duration-300 ease-in-out text-sm text-red-600 absolute -top-7 left-2`}>
          {err?.errors?.username?.join(", ") ?? ""}
        </p>
        <input
          onChange={(e) => setUsername(e.target.value)} value={username}
          className={`border border-(--text-10) w-full rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition ${err?.errors?.username && showErr ? "ring-1 ring-red-600 border-red-600" : "border-(--text-10)"}`}
          type="text"
          placeholder='Username' />
      </label>
      <label className='relative mt-3 w-full'>
        <p className={`${showErr ? "block" : "hidden"} transition duration-300 ease-in-out text-sm text-red-600 absolute -top-7 left-2`}>
          {err?.errors?.password?.join(", ") ?? ""}
        </p>
        <input
          onChange={(e) => setPassword(e.target.value)} value={password}
          className={`border border-(--text-10) w-full rounded-2xl bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary) transition ${err?.errors?.password && showErr ? "ring-1 ring-red-600 border-red-600" : "border-(--text-10)"}`}
          type="password"
          placeholder='Password' />
      </label>


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