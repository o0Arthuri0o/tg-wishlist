import { DrawerWrapper } from "@/entities";
import { CreateGiftForm } from "@/features/create-gift";
import { Button, getList } from "@/shared";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default async function ListPage({params}:{params: {id: string}}) {
  const id = params.id
  const list = await getList(id)
  return (
    <div className="p-6 flex flex-col gap-6" >
      <div className="grid grid-cols-[auto_1fr] gap-3 " >
        <Link href={'/'} >
          <ArrowLeft/>
        </Link>
        <p className="text-base" >{list?.title} - {list?.author}</p>
      </div>

      <div className="flex flex-col gap-3 " >
        <Button>Поделиться списком</Button>
        <DrawerWrapper type="gift" form={<CreateGiftForm/>} >
          <Button>Добавить подарок</Button>
        </DrawerWrapper>
      </div>
      
      <div className="mt-6  " >
        список подарков
      </div>
    </div>
    
  )
}

