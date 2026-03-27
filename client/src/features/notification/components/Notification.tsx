"use client"
import { useState } from "react";
import BellIcon from "./BellIcon";
import { useGetMessages, useMarkAllRead } from "../useNotification";
import TimeAgo from "./TimeAgo";

function Notification() {
  const [show, setShow] = useState(false)
  const { data: messages } = useGetMessages()
  const { mutate: read } = useMarkAllRead()

  const onOpen = () => {
    setShow(true)

  }
  const onClose = () => {
    setShow(false)
    read()
  }

  return (
    <div>
      <BellIcon onOpen={() => onOpen()} onClose={() => onClose()} />
      <div className={`w-[90%] mx-auto round15 overflow-hidden overflow-y-scroll h-100 feed-scroll bg-(--surface) border border-(--text-10) ${show ? "block" : "hidden"}`}>
        {
          messages?.data.map((m) => (
            <div key={m.id} className="relative w-full py-4 border-b border-(--text-10) bg-(--card) flex items-center px-2 justify-between">
              <div className="flex items-center gap-2">
                <span className="px-4 py-3 uppercase text-(--primary) rounded-full bg-(--primary)/20">
                  {m.fromUser.username.slice(0, 1)}
                  {m.fromUser.username.slice(1, 2)}
                </span>
                <p>{m.message}</p>
              </div>
              <div className="flex">
                <TimeAgo createdAt={m.createdAt} className="text-(--text-20) text-sm" />
                <span className={`absolute left-2 top-2 block w-2 h-2 rounded-full bg-(--primary) ${m.isRead ? "bg-transparent" : "bg-(--primary)"} `}></span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Notification;