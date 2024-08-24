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
import { ReactNode } from "react"
  


export const DrawerWrapper = ({children, form}:{children:ReactNode, form:ReactNode}) => {
    
    return(
        <Drawer>
            <DrawerTrigger>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                <DrawerTitle>Озадач друзей своим списком!</DrawerTitle>
                <DrawerDescription>Задайте параметры для вашего вишлиста</DrawerDescription>
                </DrawerHeader>
                {form}
            </DrawerContent>
        </Drawer>

    )
}