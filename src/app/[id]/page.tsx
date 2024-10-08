
import { DrawerWrapper } from "@/entities";
import { GiftCard } from "@/entities/gift-card/ui/gift-card";
import { CreateGiftForm } from "@/features/create-gift";
import { Button, getList } from "@/shared";
import { getGifts } from "@/shared/lib/get-gifts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


export default async function ListPage({params}:{params: {id: string}}) {
  const id = params.id
  const list = await getList(id)
  const giftArr = await getGifts(id)
  const url = process.env.URL
  const text = 'Привет, это мой список желаний! Смотрите и дарите:)'

  return (
    <div className="p-2 flex flex-col gap-6" >
      <div className="grid grid-cols-[auto_1fr] gap-3 " >
        <Link href={`/`} >
          <ArrowLeft/>
        </Link>
        <p className="text-base" >{list?.title} - {list?.author}</p>
      </div>

      <div className="flex flex-col gap-3 " >
        <Link className="w-full" href={`https://t.me/share/url?url=${encodeURI(`${url}/wishlist/${id}`)}&text=${encodeURI(text)}`} >
          <Button className="w-full" variant={'outline'} >
            Поделиться списком
          </Button>
        </Link>
        <DrawerWrapper type="gift" form={<CreateGiftForm/>} >
          <Button className="w-full " >Добавить подарок</Button>
        </DrawerWrapper>
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
