"use client"
import { initializeUser, Button } from "@/shared";
import { useState, useEffect, use, Suspense } from "react";
import { DrawerWrapper } from "@/entities";
import { CreateListForm } from "@/features";
import { getLists } from "@/shared/lib/get-lists";
import { ListCardWrapper, ListCardSkeleton } from "@/entities/list-card";
import { Loader2 } from "lucide-react";

interface List {
  id: string
  title: string
}

export default function Home() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [lists, setLists] = useState<List[]|undefined>([])

  useEffect(() => {
    const getAllLists = async(id:string) => {
      const listsArr = await getLists(`${id}`)
      if(listsArr.length > 0) setLists(listsArr)
      else setLists(undefined)
    }
    const user = window.Telegram.WebApp.initDataUnsafe.user
    
    setId(user?.id)
    setUserName(user?.first_name)

    if(user?.id) {
      initializeUser(`${user?.id}`, user?.first_name)
      getAllLists(`${user.id}`)
    }
  },[])

  if(id) getLists(`${id}`)

  return (
    <main className="p-2 flex flex-col gap-6 items-center ">

      <div className="flex flex-col gap-6 items-center " >
        <p> <span className="font-bold " >{userName}</span>, создавай списки желаний и делись с друзьями!</p>
      </div>


      <DrawerWrapper type="list" form={<CreateListForm/>} >
        <Button className="w-full " >Создать новый список</Button>
      </DrawerWrapper>

     
        {lists && lists.length > 0 ?
          <div className="grid grid-cols-2 gap-3 " >
            {lists.map(list => 
              <ListCardWrapper id={list.id} title={list.title} key={list.id} />
            )}
          </div>
          : lists ?
            <Loader2 className="mt-6 h-9 w-9 self-center animate-spin" />
          :
            <p>Пока тут нет никаких вишлистов :(</p>
        }
    </main>
  );
}
