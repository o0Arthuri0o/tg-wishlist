"use client"
import { initializeUser, Button } from "@/shared";
import { useState, useEffect } from "react";
import { DrawerWrapper } from "@/entities";

export default function Home() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  // const [url, setUrl] = useState<string | undefined>(undefined);
  // const [bg, setBg] = useState<string | undefined>(undefined);
  // const [usersList, setUsersList] = useState<{firstName:string}[]>([])

  // const handleClick = () => {
  //   if (typeof window !== "undefined" && window.Telegram?.WebApp) {
  //     const user = window.Telegram.WebApp.initDataUnsafe.user;
  //     setId(user?.id);
  //     setUserName(user?.username);
  //     setUrl(user?.photo_url);
  //     setBg(window.Telegram.WebApp.backgroundColor);
  //     console.log(user)
  //   }
  // }

  useEffect(() => {
    const user = window.Telegram.WebApp.initDataUnsafe.user
    setId(user?.id)
    setUserName(user?.first_name)
    console.log(user)
    console.log('first load')
    initializeUser(`${user?.id}`, user?.first_name)
  },[])

  return (
    <main className="p-6 flex flex-col gap-6 items-center ">

      <div className="flex flex-col gap-6 items-center " >
        <p> <span className="font-bold " >{userName}</span>, создавай списки желаний и делись ими с друзьями!</p>
      </div>

      <DrawerWrapper form={<p>test</p>} >
        <Button>Создать новый список</Button>
      </DrawerWrapper>

      <div>

      </div>
    </main>
  );
}
