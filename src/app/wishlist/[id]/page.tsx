
import { DrawerWrapper } from "@/entities";
import { GiftCard } from "@/entities/gift-card/ui/gift-card";
import { CreateGiftForm } from "@/features/create-gift";
import { Button, getList } from "@/shared";
import { getGifts } from "@/shared/lib/get-gifts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default async function ListUsersPage({params}:{params: {id: string}}) {
  const id = params.id
  const list = await getList(id)
  const giftArr = await getGifts(id)

  return (
    <div className="p-2 flex flex-col gap-6" >
    
    <div className="flex flex-col gap-1" >
        <p className="text-base" >{list?.title}</p>
        <p className="text-sm text-slate-200 ">{list?.author}</p>
    </div>

      
      
    {giftArr.length > 0 ?
        <div className="mt-6 grid grid-cols-1 gap-3 " >
        {giftArr.map(gift => 
            <GiftCard listId={id} gift={gift} key={gift.id} />
        )}
        </div>
        :
        <p>Здесь пока еще нет подарков...</p>
    }
      
    </div>
    
  )
}
