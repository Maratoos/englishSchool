import { collection, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';

export const getCollection = <T>(collectionName: string): { documents: T[], error: string | null, isPending: boolean } => {
    const [documents, setDocuments] = useState<Array<T>>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    useEffect(() => {
        const collectionRef = query(collection(firestore, collectionName));
        const unsubscribe = onSnapshot(collectionRef, (snap) => {
            try {
                setIsPending(true)
                const fetchedData: Array<T> = []

                snap.docs.forEach((doc) => {
                    fetchedData.push({ id: doc.id, ...doc.data() } as T)
                });

                setDocuments(fetchedData)
                setError(null)
                setIsPending(false)
            } catch (e: any) {
                setError(e.message)
                setIsPending(false)
            }
        })

        return () => {
            unsubscribe()
        }
    }, [collection])

    return { documents, error, isPending };
};
