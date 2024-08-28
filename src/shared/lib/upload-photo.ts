"use server"

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../api";
export const uploadPhoto = (idGift:string, gift:FormData ) => {
    const giftObj = Object.fromEntries(gift)
    const file = giftObj.photo as File 
    console.log(file, file.name, 'file check')
    const storageRef = ref(storage, `${idGift}/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    }).catch((err) => console.log('error upload', err))
}