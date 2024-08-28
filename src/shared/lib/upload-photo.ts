'use client'

import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../api";
export const uploadPhoto = (id:string,idGift:string,file:File ) => {

    const storageRef = ref(storage, `files/${id}/${idGift}/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}