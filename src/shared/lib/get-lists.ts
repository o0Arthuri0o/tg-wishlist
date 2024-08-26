"use server"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api";

interface List {
    id: string
    title: string
}

export const getLists = async(id:string) => {
    const listsArray:List[] = []
    const querySnapshot = await getDocs(collection(db, "users", id, "lists"));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        listsArray.push({id: doc.id, title: doc.data().title});
    });
    return listsArray
}