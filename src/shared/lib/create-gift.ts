"use server"

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../api";
import { revalidatePath } from "next/cache";
import { uploadPhoto } from "./upload-photo";

interface Gift {
    name:string, 
    description: string
    link?:string
    price:string
    photo?:File
}

export const createNewGift = async(gift:FormData, id:string) => {

    const giftObj = Object.fromEntries(gift) 
    const docRef = await addDoc(collection(db, `lists/${id}/gifts`), {
        name: giftObj.name, 
        description: giftObj.description,
        link: giftObj.link,
        price: giftObj.price
    });
    revalidatePath('/[id]', 'page')
   
    return docRef.id
}