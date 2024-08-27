"use client"
import { initializeUser, Button } from "@/shared";
import { useState, useEffect, use, Suspense } from "react";
import { DrawerWrapper } from "@/entities";
import { CreateListForm } from "@/features";
import { getLists } from "@/shared/lib/get-lists";
import { ListCard, ListCardSkeleton } from "@/entities/list-card";

interface List {
  id: string
  title: string
}

export default function Home() {
  const [id, setId] = useState<number | undefined>(undefined);
  const [userName, setUserName] = useState<string | undefined>(undefined);
  const [lists, setLists] = useState<List[]>([])

  useEffect(() => {
    const getAllLists = async(id:string) => {
      const listsArr = await getLists(`${id}`)
      setLists(listsArr)
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
    <main className="p-6 flex flex-col gap-6 items-center ">

      <div className="flex flex-col gap-6 items-center " >
        <p> <span className="font-bold " >{userName}</span>, создавай списки желаний и делись ими с друзьями!</p>
      </div>


      <DrawerWrapper form={<CreateListForm/>} >
        <Button>Создать новый список</Button>
      </DrawerWrapper>

      <div>
        {lists.map(list => 
          // <li key={list.id} >{list.title}</li>
          <Suspense fallback={<ListCardSkeleton/>} key={list.id} >
            <ListCard id={list.id} title={list.title}/>
          </Suspense>
        )}
      </div>
    </main>
  );
}
