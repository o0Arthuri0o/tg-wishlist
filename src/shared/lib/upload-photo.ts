"use server"

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../api";
export const uploadPhoto = async(idGift:string, gift:FormData ) => {
    const giftObj = Object.fromEntries(gift)
    const file = giftObj.photo as File 
    console.log(file, file.name, 'file check', 'idGift', idGift)
    const imageRef = ref(storage, `${idGift}/${file.name}`);

    await uploadBytes(imageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!', snapshot);
    }).catch((err) => console.log('error upload', err))
}