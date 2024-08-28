'use server'

import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../api";

export const getPhotoUrlsInFolder = async (folderName: string) => {
    try {
        // Create a reference to the folder
        const folderRef = ref(storage, folderName);

        // List all items (files) in the folder
        const listResult = await listAll(folderRef);

        // Map through the items and get download URLs
        const urlsPromises = listResult.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return url;
        });

        // Wait for all URLs to be fetched
        const urls = await Promise.all(urlsPromises);

        // Log or return the URLs
        console.log(urls);
        return urls;
    } catch (error) {
        console.error('Error getting photo URLs:', error);
        throw error;
    }
};
