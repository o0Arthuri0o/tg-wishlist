"use client"
 
import { Button, createNewGift, createNewList, DrawerClose, DrawerFooter, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea, uploadPhoto } from "@/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateGiftFormSchema } from "../model"
import { useToast } from "@/shared"
import { useContext, useState } from "react"
import { DrawerIsOpenContext } from "@/entities"
import { Loader2 } from "lucide-react"
import { useParams } from "next/navigation"
import { Gift } from "@/shared/lib/get-gifts"
import { updateGift } from "@/shared/lib/update-gift"

export function CreateGiftForm({gift}:{gift?:Gift}) {
    const params = useParams()
    const setIsOpenDrawer = useContext(DrawerIsOpenContext)
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof CreateGiftFormSchema>>({
        resolver:zodResolver(CreateGiftFormSchema),
        defaultValues:{
            name: gift?.name ? gift?.name : '',
            description: gift?.description ? gift?.description : '',
            link: gift?.link ? gift?.link : '',
            photo: undefined,
            price: gift?.price ? gift?.price : ''
        }
    })
    const fileRef = form.register("photo")
    const onSumit = (data:z.infer<typeof CreateGiftFormSchema>) => {
        console.log(data, params?.id)
        setIsLoading(true)
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.price)
        formData.append('link', data.link ? data.link : '')
        formData.append('taken', `${gift?.taken}`)
        if(data.photo?.[0]) formData.append('photo', data.photo[0])

        if(!gift) createNewGift(formData, params?.id as string).then((id) => {
            if(setIsOpenDrawer) setIsOpenDrawer(false)
            if(data.photo?.[0]) uploadPhoto(id, formData)
        })
        else if(gift) {
            updateGift(params?.id as string, gift.id, formData).then(() => {
                uploadPhoto(gift.id, formData)
                if(setIsOpenDrawer) setIsOpenDrawer(false)
            })
        }
        

    }

    return(
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSumit)} className="px-[16px] overflow-y-auto flex flex-col gap-3" >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название подарка</FormLabel>
                        <FormControl>
                            <Input placeholder="Крутой кофе" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            Можете указать навание вашего подарка
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Расскажи нюансы</FormLabel>
                    <FormControl>
                        <Textarea
                            placeholder="Только спешалти кофе от обжарщиков! И не из кантаты"
                            className="resize-none"
                        {...field}
                        />
                    </FormControl>
                    {/* <FormDescription>
                        Отметьте важные подробности подарка
                    </FormDescription> */}
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Стоимость</FormLabel>
                        <FormControl>
                            <Input type="number" className="remove-number" placeholder="777" {...field} />
                        </FormControl>
                        {/* <FormDescription>
                            Уточните примерную стоимоть подарка в рублях
                        </FormDescription> */}
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Ссылка</FormLabel>
                        <FormControl>
                            <Input placeholder="https://shop.tastycoffee.ru/" {...field} />
                        </FormControl>
                        <FormDescription>
                            Можете оставить ссылку на магазин
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="photo"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Фото</FormLabel>
                        <FormControl>
                            <Input type="file" accept="image/png, image/jpeg" {...fileRef} />
                        </FormControl>
                        <FormDescription>
                            Можете по желанию загрузить фото подарка
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />





                 <DrawerFooter className="px-0 " >
                    <Button>
                        {isLoading ?
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Загрузка
                            </>
                            :
                            'Создать'
                        }
                    </Button>
                    <DrawerClose>
                        <Button variant="outline" className="w-full">Назад</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    )
}