"use server"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../api";
import { Gift } from "./get-gifts";

export const updateGift = async(idList:string, idGift:string, newGift: FormData) => {

    const giftRef = doc(db, `lists/${idList}/gifts`, idGift);
    const giftObj = Object.fromEntries(newGift)

    await updateDoc(giftRef, {
        name: giftObj.name,
        description: giftObj.description,
        link: giftObj.link,
        price: giftObj.price,
    });
}