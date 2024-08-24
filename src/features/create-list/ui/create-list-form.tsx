"use client"
 
import { Button, createNewList, DrawerClose, DrawerFooter, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input } from "@/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateListFormSchema } from "../model/create-list-form.model"
import { useToast } from "@/shared"

export function CreateListForm() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof CreateListFormSchema>>({
        resolver: zodResolver(CreateListFormSchema),
        defaultValues:{
            title:'',
        }
    })

    const onSumit = (data:z.infer<typeof CreateListFormSchema>) => {
        const id = window.Telegram.WebApp.initDataUnsafe.user?.id
        if(id) {
                createNewList(`${id}`, data.title).then(() => {
                    toast({
                        variant: "default",
                        title: "Ура! Список создался",
                    })
                }).catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Ой, список не создался",
                        description: "Попробуйте заново",
                    })
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
                    <Button>Создать</Button>
                    <DrawerClose>
                        <Button variant="outline" className="w-full">Назад</Button>
                    </DrawerClose>
                </DrawerFooter>
            </form>
        </Form>
    )
}