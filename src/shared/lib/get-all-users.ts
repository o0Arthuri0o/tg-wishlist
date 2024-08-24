"use server"

import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../api";


export async function getUsers() {
    const users:{firstName:string}[]= []
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      const user = doc.data() as {firstName:string}
        users.push(user)
    });
    return users
    
}

export async function initializeUser(id:string, userName?:string) {
  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    const docSnap = await setDoc(doc(db, "users", id), {
      userName: userName ? userName : ''
    });
    console.log("Create bew user", id, userName);
  }
}