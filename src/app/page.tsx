"use client"
import Image from "next/image";

export default function Home() {
  const id = window.Telegram?.WebApp.initDataUnsafe.user?.id
  const userName = window.Telegram?.WebApp.initDataUnsafe.user?.username
  const url = window.Telegram?.WebApp.initDataUnsafe.user?.photo_url
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-6 items-center " >
        {url &&
          <Image src={url} alt='avatar' width={300} height={300} />
        } 
        <p className="text-base " >id: {id}</p>
        <p className="text-base " >user name: {userName}</p>
      </div>
    </main>
  );
}
