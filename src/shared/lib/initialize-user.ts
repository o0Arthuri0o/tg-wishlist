"use server"

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../api";

export async function initializeUser(id:string, userName?:string, ) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    await setDoc(doc(db, "users", id), {
      firstName: userName ? userName : '',
    });
    console.log("Create new user", id, userName);
  }
}