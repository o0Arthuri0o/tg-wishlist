"use client"
 
import { Button, createNewList, DrawerClose, DrawerFooter, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateListFormSchema } from "../model/create-list-form.model"
import { useToast } from "@/shared"
import { useContext, useState } from "react"
import { DrawerIsOpenContext } from "@/entities"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function CreateListForm() {
    const router = useRouter()
    const setIsOpenDrawer = useContext(DrawerIsOpenContext)
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof CreateListFormSchema>>({
        resolver: zodResolver(CreateListFormSchema),
        defaultValues:{
            title:'',
        }
    })

    const onSumit = (data:z.infer<typeof CreateListFormSchema>) => {
        const id = window.Telegram.WebApp.initDataUnsafe.user?.id
        const userName = window.Telegram.WebApp.initDataUnsafe.user?.first_name
        setIsLoading(true)
        if(id && userName) {
            setIsLoading(true)
            createNewList(`${id}`, data.title, userName).then((id) => {
                toast({
                    variant: "default",
                    title: "Ура! Список создался",
                })
                setIsOpenDrawer?.(false)
                router.push(`/[${id}]`)
                setIsLoading(false)

            }).catch(() => {
                toast({
                    variant: "destructive",
                    title: "Ой, список не создался",
                    description: "Попробуйте заново",
                })
                setIsLoading(false)
            })
        }
        
    }

    return(
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSumit)} className="px-[16px] " >
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название списка</FormLabel>
                        <FormControl>
                            <Input placeholder="Др Вити" {...field} />
                        </FormControl>
                        <FormDescription>
                            Можете указать навание вашего праздника
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