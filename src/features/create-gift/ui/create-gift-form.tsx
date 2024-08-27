"use client"
 
import { Button, createNewList, DrawerClose, DrawerFooter, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from "@/shared"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CreateGiftFormSchema } from "../model"
import { useToast } from "@/shared"
import { useContext, useState } from "react"
import { DrawerIsOpenContext } from "@/entities"
import { Loader2 } from "lucide-react"

export function CreateGiftForm({gift}:{gift?:z.infer<typeof CreateGiftFormSchema>}) {

    const setIsOpenDrawer = useContext(DrawerIsOpenContext)
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof CreateGiftFormSchema>>({
    })

    const onSumit = (data:z.infer<typeof CreateGiftFormSchema>) => {
       
        console.log(data)
        setIsLoading(true)
    }

    return(
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSumit)} className="px-[16px] " >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Название подарка</FormLabel>
                        <FormControl>
                            <Input placeholder="Крутой кофе" {...field} />
                        </FormControl>
                        <FormDescription>
                            Можете указать навание вашего подарка
                        </FormDescription>
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
                    <FormDescription>
                        Отметьте важные подробности подарка
                    </FormDescription>
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
                        <FormDescription>
                            Уточните примерную стоимоть подарка в рублях
                        </FormDescription>
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
                name="link"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Фото</FormLabel>
                        <FormControl>
                            <Input type="file" {...field} />
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