'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useLogin } from '@/src/features/auth/useAuth'
import { Spinner } from '@/src/shared/ui/Loader'
import { useNotification } from '@/src/shared/lib/NotificationProvider'
import axios from 'axios'
import { IErrorFields } from '@/src/shared/types/type'

function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { success, error1 } = useNotification()
  const [err, serErr] = useState<IErrorFields<{ password: string[], username: string[] }> | null>(null)
  const [showErr, setShowErr] = useState(false)
  const { mutate: login, isPending, isError } = useLogin()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    login(
      { username, password },
      {
        onSuccess: () => success("Muvaffaqiyatli kirdingiz!"),
        onError: ((err) => {
          if (axios.isAxiosError(err) && err.response?.data) {
            const data = err.response.data as IErrorFields<{ username: string[]; password: string[] }>;
            serErr(data);
            setShowErr(true);

            if (!data.errors || Object.keys(data.errors).length === 0) {
              error1(data.message);
            }
          }
        })

      }
    )
  }

  useEffect(() => {
    if (showErr) {
      const timeout = setTimeout(() => setShowErr(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [showErr]);

  console.log(err);

  return (
    <form onSubmit={handleSubmit} className='w-1/2 flex flex-col space-y-5'>
      <label className='relative w-full mt-10 '>
        <p className={`${showErr ? "block" : "hidden"} transition duration-300 ease-in-out text-sm text-red-600 absolute -top-7 left-2`}>
          {err?.errors?.username?.join(", ") ?? ""}
        </p>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
          className={`
      border w-full rounded-2xl transition duration-300 ease-in-out bg-(--card) h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary)
      ${err?.errors?.username && showErr ? "ring-1 ring-red-600 border-red-600" : "border-(--text-10)"}
    `}
        />
      </label>

      <label className='relative w-full mt-3 transition duration-300'>
        <p className={`${showErr ? "block" : "hidden"} transition duration-300 ease-in-out text-sm text-red-600 absolute -top-7 left-2`}>
          {err?.errors?.password?.join(", ") ?? ""}
        </p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Password"
          type="password"
          className={`
      border w-full rounded-2xl bg-(--card) transition duration-300 ease-in-out h-13 pl-5 placeholder:text-(--text-50) text-(--text) outline-none focus:ring-1 focus:ring-(--primary)
      ${err?.errors?.password && showErr ? "ring-1 ring-red-600 border-red-600" : "border-(--text-10)"}
    `}
        />
      </label>

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