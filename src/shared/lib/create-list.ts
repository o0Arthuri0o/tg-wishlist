import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../api";


export const createNewList = async(id:string , title:string) => {
    const docRef = await addDoc(collection(db, `users/${id}/lists`), {
        title
    });
    return docRef.id
}