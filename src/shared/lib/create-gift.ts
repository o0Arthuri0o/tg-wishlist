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

export const createNewGift = async(gift:Gift, id:string) => {

    const docRef = await addDoc(collection(db, `lists/${id}/gifts`), {
        name: gift.name, 
        description: gift.description,
        link: gift.link ? gift.link : '',
        price: gift.price
    });
    revalidatePath('/[id]', 'page')
   
    return docRef.id
}