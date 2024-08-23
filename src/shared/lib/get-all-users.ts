"use server"

import { collection, getDocs } from "firebase/firestore";
import { db } from "../api";


export async function getUsers() {
    const querySnapshot = await getDocs(collection(db, "cities"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
    console.log(querySnapshot)
}