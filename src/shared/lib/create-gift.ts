"use server"

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { db } from "../api";
import { revalidatePath } from "next/cache";

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
        const storage = getStorage();
        const storageRef = ref(storage, `${id}/${gift.photo[0].name}`);
    
        uploadBytes(storageRef, gift.photo[0]).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    revalidatePath('/[id]', 'page')
   
    return docRef.id
}