"use client"
import { initializeUser, Button } from "@/shared";
import { useState, useEffect } from "react";
import { DrawerWrapper } from "@/entities";
import { CreateListForm } from "@/features";

export default function Home() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const user = window.Telegram.WebApp.initDataUnsafe.user
    setId(user?.id)
    setUserName(user?.first_name)

    if(user?.id) initializeUser(`${user?.id}`, user?.first_name)
  },[])

  return (
    <main className="p-6 flex flex-col gap-6 items-center ">

      <div className="flex flex-col gap-6 items-center " >
        <p> <span className="font-bold " >{userName}</span>, создавай списки желаний и делись ими с друзьями!</p>
      </div>

      <DrawerWrapper form={<CreateListForm/>} >
        <Button>Создать новый список</Button>
      </DrawerWrapper>

      <div>

      </div>
    </main>
  );
}
