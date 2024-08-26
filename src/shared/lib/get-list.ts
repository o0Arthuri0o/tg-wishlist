import { doc, getDoc } from "firebase/firestore";
import { db } from "../api";

interface List {
    id: string
    title: string
  }

export const GetList = async(id:string) => {
    const docRef = doc(db, "users", id, 'lists');
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) return {id: docSnap.id, title: docSnap.data().title} as List
}