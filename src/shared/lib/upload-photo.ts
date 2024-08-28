'use client'

import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadPhoto = (id:string, file:File ) => {
    const storage = getStorage();
    const storageRef = ref(storage, `files/${file.name}`);

    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
    });
}