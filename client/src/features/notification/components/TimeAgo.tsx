"use client"
import { useEffect, useState } from "react"

export default function TimeAgo({ createdAt, className }: { createdAt: string, className: string }) {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate(n => n + 1) // qayta render qiladi
    }, 60000) // har 1 daqiqada

    return () => clearInterval(interval)
  }, [])

  const diff = Math.floor((Date.now() - new Date(createdAt).getTime()) / 1000)
  const minutes = Math.floor(diff / 60)
  const hours = Math.floor(diff / 3600)

  if (minutes < 1) return <span className={className}>just now</span>
  if (minutes < 60) return <span className={className}>{minutes}m ago</span>
  if (hours < 24) return <span className={className}>{hours}h ago</span>

  return (
    <span className={className}>
      {new Date(createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })}
    </span>
  )
}