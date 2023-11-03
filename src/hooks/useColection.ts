import { DocumentData, PartialWithFieldValue, addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../firebase/config";

export const useCollection = (collectionName: string) => {
    const [isCancelled, setIsCancelled] = useState<boolean>(false)

    const collectionRef = collection(firestore, collectionName)

    const addDocument = async <T>(newDocument: Omit<T, "id" | "createdAt">): Promise<void> => {
        try {
            await addDoc(collectionRef, { ...newDocument, createdAt: new Date(), })
        } catch (err: any) {
            console.error(err.message)
        }
    }

    const updateDocument = async (docId: string, newData: PartialWithFieldValue<DocumentData>): Promise<void> => {
        try {
            await setDoc(doc(firestore, collectionName, docId), newData, { merge: true })
        } catch (err: any) {
            console.error(err.message)
        }
    }

    const deleteDocument = async (docId: string): Promise<void> => {
        try {
            await deleteDoc(doc(firestore, collectionName, docId))
        } catch (err: any) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { addDocument, isCancelled, updateDocument, deleteDocument }
}