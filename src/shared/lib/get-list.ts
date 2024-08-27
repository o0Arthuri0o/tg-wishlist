import { doc, getDoc } from "firebase/firestore";
import { db } from "../api";

interface List {
    id: string
    title: string
    author: string
}

export const getList = async(id:string) => {
    const docRef = doc(db, 'lists', id);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) return {id: docSnap.id, title: docSnap.data().title, author: docSnap.data().author} as List
}