"use client"

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
  } from "@/shared"
import { Gift } from "@/shared/lib/get-gifts";
  
import { ReactNode } from "react";

export function DialogTaken({children, handleTake}:{children:ReactNode, handleTake:()=>void}) {
  return (
    <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Хотитет отменить бронь?</DialogTitle>
            <DialogDescription>
                Это действие может сбить кого-то столку, если отмените чужую бронь
            </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button onClick={handleTake} variant={'destructive'}>Отменить бронь</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

