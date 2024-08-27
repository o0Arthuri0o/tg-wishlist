"use server"

import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../api";


export const createNewList = async(id:string , title:string, author:string) => {
    const docRef = await addDoc(collection(db, `users/${id}/lists`), {
        title:title
    });
    //console.log('add new list', docRef.id)
    await setDoc(doc(db, "lists", docRef.id), {
        title: title,
        author: author,
      });
    return docRef.id
}