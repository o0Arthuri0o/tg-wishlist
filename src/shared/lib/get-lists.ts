"use server"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../api";

export const getLists = (id:string) => {
    const unsub = onSnapshot(doc(db, 'users', 'id', 'lists'), (doc) => {
        console.log("Current data: ", doc.data());
        return doc.data()
    });
}