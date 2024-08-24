"use server"

import { addDoc, collection } from "firebase/firestore";
import { db } from "../api";


export const createNewList = async(id:string , title:string) => {
    const docRef = await addDoc(collection(db, `users/${id}/lists`), {
        title:title
    });
    console.log('add new list', docRef.id)
    return docRef.id
}