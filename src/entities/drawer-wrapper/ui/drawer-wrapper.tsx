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

export const DrawerWrapper = ({children, form}:{children:ReactNode, form:ReactNode}) => {
    const [isOpen, setIsOpen] = useState(false)
    
    
    return(
        <Drawer open={isOpen} onOpenChange={e => setIsOpen(e)} >
            <DrawerTrigger>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Озадач друзей своим списком!</DrawerTitle>
                <DrawerDescription>Задайте параметры для вашего вишлиста</DrawerDescription>
                </DrawerHeader>
                <DrawerIsOpenContext.Provider value={setIsOpen} >
                    {form}
                </DrawerIsOpenContext.Provider>
                
            </DrawerContent>
        </Drawer>

    )
}