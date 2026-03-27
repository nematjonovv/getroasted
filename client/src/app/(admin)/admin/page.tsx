"use client"
import { useMe } from '@/src/features/auth/useAuth';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';


function page() {
  const router = useRouter()
  const { data: user, isLoading, isError } = useMe()

  useEffect(() => {
    if (isLoading) return
    if (isError || !user) {
      router.push("/login")
    } else {
      redirect("/admin/overview")
    }
  }, [isLoading, isError, user])


}

export default page;