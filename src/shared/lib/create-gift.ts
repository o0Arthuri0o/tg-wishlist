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
    photo?:FileList
}

export const createNewGift = async(gift:Gift, id:string) => {

    const docRef = await addDoc(collection(db, `lists/${id}/gifts`), {
        name: gift.name, 
        description: gift.description,
        link: gift.link ? gift.link : '',
        price: gift.price
    });
    //console.log('add new list', docRef.id)
    if(gift?.photo?.[0]) {
        try {
            uploadPhoto(id, gift.photo[0])
        } catch(err) {
            console.log(err)
        }
    }
    revalidatePath('/[id]', 'page')
   
    return docRef.id
}