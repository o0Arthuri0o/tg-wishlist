"use server"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../api";
import { Gift } from "./get-gifts";
import { revalidatePath } from "next/cache";

export const updateGift = async(idList:string, idGift:string, newGift: FormData) => {

    const giftRef = doc(db, `lists/${idList}/gifts`, idGift);
    const giftObj = Object.fromEntries(newGift)

    await updateDoc(giftRef, {
        name: giftObj.name,
        description: giftObj.description,
        link: giftObj.link,
        price: giftObj.price,
        taken: Boolean(giftObj.taken),
    });
    revalidatePath('/[id]', 'page')
    revalidatePath('/wishlist/[id]', 'page')
}