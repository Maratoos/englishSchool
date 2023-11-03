import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';

export const getCollection = <T>(collectionName: string) => {
    const [documents, setDocuments] = useState<Array<T>>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const collectionRef = query(collection(firestore, collectionName));

    const getDocuments = async () => {
        try {
            setIsPending(true);
            const querySnapshot = await getDocs(collectionRef);
            const fetchedData: Array<T> = []
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() } as T)
            })
            setDocuments(fetchedData);
            setIsPending(false);
        } catch (err: any) {
            setError(err.message);
            setIsPending(false);
        }
    };

    useEffect(() => {
        getDocuments();
    }, []);

    return { documents, error, isPending };
};
