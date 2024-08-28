"use client"
import { DrawerWrapper } from "@/entities/drawer-wrapper";
import { CreateGiftForm } from "@/features/create-gift";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, useToast } from "@/shared";
import { deleteGift } from "@/shared/lib/delete-gift";
import { Gift } from "@/shared/lib/get-gifts";
import { getPhotoUrlsInFolder } from "@/shared/lib/get-photo";
import { Gift as GiftSVG, Loader2, Pencil, RussianRuble, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function GiftCard({gift, listId}:{gift:Gift, listId:string}) {
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const [url, setUrl] = useState('')

    useEffect(() => {
        getPhotoUrlsInFolder(gift.id).then((urls) => {
            if(urls[0]) setUrl(urls[0])
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

  return (
    <Card className="p-2 w-full h-auto flex flex-col gap-2" >
        <div className="flex items-center gap-2 " >
            <div className="relative min-w-[70px] h-[70px] bg-slate-200 rounded-xl flex justify-center items-center " >
                {url.length > 0 ?
                    <Image src={url} alt='Подарок' fill />
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
                    <div className="flex justify-between gap-3 p-0" >
                        {gift.link.length > 0 &&
                            <Link href={gift.link} className="p-2 text-blue-400" >В магазин</Link>
                        }
                        <p className="text-base p-2" >Цена: {gift.price}&#x20bd;</p>
                    </div>
                </CardContent>
            </div>
        </div>

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
    </Card>
  )
}

