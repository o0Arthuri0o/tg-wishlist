"use server"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../api";


export interface Gift {
    id:string
    name:string
    description:string
    link:string
    price:string
}

export const getGifts = async(idList:string) => {
    const giftsArr:Gift[] = []

    const querySnapshot = await getDocs(collection(db, `lists/${idList}/gifts`)) 
    if(querySnapshot.docs.length > 0) {
        querySnapshot.forEach((doc) => {
            giftsArr.push({id: doc.id, name: doc.data().name, description: doc.data().description, link: doc.data().link, price: doc.data().price});
        });
    }  
    return giftsArr
}