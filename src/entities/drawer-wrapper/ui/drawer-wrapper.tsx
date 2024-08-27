'use client'
import {
    Button,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/shared"
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react"
  
export const DrawerIsOpenContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null)

export const DrawerWrapper = ({children, form, type}:{children:ReactNode, form:ReactNode, type:'list'|'gift'}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    
    return(
        <Drawer open={isOpen} onOpenChange={e => setIsOpen(e)} >
            <DrawerTrigger>
                {children}
            </DrawerTrigger>
            <DrawerContent className="max-h-[80%]" >
            <div className="overflow-y-auto " >
                <DrawerHeader>
                <DrawerTitle>{type === 'list' ? 'Озадач друзей своим списком!' : 'Добававь подарок'}</DrawerTitle>
                <DrawerDescription>{type === 'list' ? 'Задайте название для вашего вишлиста' : 'Заполните карточку подарка'}</DrawerDescription>
                </DrawerHeader>
                <DrawerIsOpenContext.Provider value={setIsOpen} >
                    {form}
                </DrawerIsOpenContext.Provider>
            </div>
                
            </DrawerContent>
        </Drawer>

    )
}