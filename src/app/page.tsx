"use client"
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [bg, setBg] = useState<string | undefined>(undefined);

  const handleClick = () => {
    if (typeof window !== "undefined" && window.Telegram?.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setId(user?.id);
      setUserName(user?.username);
      setUrl(user?.photo_url);
      setBg(window.Telegram.WebApp.backgroundColor);
      console.log(id)
    }
  }

  console.log(id, userName)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col gap-6 items-center " >
        <p>{bg} check</p>
        {url &&
          <Image src={url} alt='avatar' width={300} height={300} />
        } 
        <p className="text-base " >id: {id}</p>
        <p className="text-base " >user name: {userName}</p>
        <button onClick={handleClick} >test</button>
      </div>
    </main>
  );
}
