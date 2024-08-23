"use server"

import { collection, getDocs } from "firebase/firestore";
import { db } from "../api";


export async function getUsers() {
    const users :any= []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const user = doc.data()
        users.push(user)
    });
    return users
    
}