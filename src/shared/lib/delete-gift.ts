'use server'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../api";
import { revalidatePath } from "next/cache";


export const deleteGift = async(idGift:string, idList:string) => {
    await deleteDoc(doc(db, `lists/${idList}/gifts`, idGift))
    revalidatePath('/[id]', 'page')
}