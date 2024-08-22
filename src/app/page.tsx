"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  let id:any;
  let userName:any;
  let url:any;
  let bg:any
  useEffect(() => {
    id = window?.Telegram?.WebApp.initDataUnsafe.user?.id
    userName = window?.Telegram?.WebApp.initDataUnsafe.user?.username
    url = window?.Telegram?.WebApp.initDataUnsafe.user?.photo_url
    bg = window.Telegram.WebApp.backgroundColor
  }, [])
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-6 items-center " >
        <p>{bg} check</p>
        {url &&
          <Image src={url} alt='avatar' width={300} height={300} />
        } 
        <p className="text-base " >id: {id}</p>
        <p className="text-base " >user name: {userName}</p>
      </div>
    </main>
  );
}
