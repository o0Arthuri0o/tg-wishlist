"use client"
import { DialogTaken } from "@/entities/dialog-taken/ui/dialog-taken";
import { DrawerWrapper } from "@/entities/drawer-wrapper";
import { CreateGiftForm } from "@/features/create-gift";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, cn, useToast } from "@/shared";
import { deleteGift } from "@/shared/lib/delete-gift";
import { Gift } from "@/shared/lib/get-gifts";
import { getPhotoUrlsInFolder } from "@/shared/lib/get-photo";
import { updateGift } from "@/shared/lib/update-gift";
import { DialogTrigger } from "@/shared/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { Gift as GiftSVG, Loader2, Pencil, RussianRuble, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function GiftCard({gift, listId, forUser=false}:{gift:Gift, listId:string, forUser?:boolean}) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState('')

    useEffect(() => {
        getPhotoUrlsInFolder(gift.id).then((urls) => {
            if(urls.length > 0) {
                const url = urls.at(-1)
               if(url) setUrl(url)
                console.log(url)
            }
        })
    }, [])
    
    const handleDelete = () => {
        setIsLoading(true)
        deleteGift(gift.id, listId).then(() => {
            toast({
                variant:'default',
                title:"Подарок удален"
            })
        })
    }

    const handleTake = (gift:Gift, setIsLoading:(value:boolean)=>void) => {
        const formData = new FormData()
        formData.append('name', gift.name)
        formData.append('description', gift.description)
        formData.append('price', gift.price)
        formData.append('link', gift.link ? gift.link : '')
        if(gift.taken) formData.append('taken', 'false')
        else formData.append('taken', 'true')

        setIsLoading(true)
        updateGift(listId, gift.id, formData).then(() => {
            toast({
                variant:'default',
                title: !gift.taken ? "Забронировано" : "Отменено"
            })
        })
    }

    

  return (
    <Card className={cn("p-2 w-full h-auto flex flex-col gap-2 relative")} >
        <div className="flex items-center gap-2 " >
            <div className="relative min-w-[70px] h-[70px] bg-slate-200 rounded-xl overflow-hidden flex justify-center items-center " >
                {url.length > 0 ?
                    <Image src={url} alt='Подарок' fill style={{objectFit:'cover'}} />
                    :
                    <GiftSVG width={40}  height={40} />
                }
            </div>
            <div className="flex flex-col gap-3 w-full " >
                <CardHeader className="p-0 " >
                    <CardTitle className="p-0">
                        {gift.name}
                    </CardTitle>
                    {gift.description.length > 0 &&
                        <CardDescription>
                            {gift.description}
                        </CardDescription>
                    }
                </CardHeader>
                <CardContent className=" p-0" >
                    <div className="grid grid-cols-2 justify-between gap-2 p-0 " >
                        {gift.link.length > 0 ?
                            <Link href={gift.link} className="p-1 text-blue-400" >В магазин</Link>
                            :
                            <p></p>
                        }
                        <p className="text-base p-1" >Цена: {gift.price}&#x20bd;</p>
                    </div>
                </CardContent>
            </div>
        </div>
        {forUser ?
            gift.taken ?
                <DialogTaken handleTake={() => handleTake(gift, setIsLoading)} >
                    <Button variant={'outline'} className="w-full"  >Забронировано</Button>
                </DialogTaken>
                :
                <Button className="w-full" onClick={() => handleTake(gift, setIsLoading)} >Забронировать</Button>
            :
            <div className="flex gap-2 items-center self-end" >
                <DrawerWrapper type="gift" form={<CreateGiftForm gift={gift} />} >
                    <Button variant={'secondary'} >
                        <Pencil/>
                    </Button>
                </DrawerWrapper>
                <Button variant={'destructive'} onClick={handleDelete} >
                    {isLoading ?
                        <Loader2 className="text-white animate-spin" />
                        :
                        <Trash2/>
                    }
                    
                </Button>
            </div>
        }
            
    </Card>
  )
}

