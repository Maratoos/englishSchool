import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { firestore } from '../firebase/config';
import { IApplication } from '../models/models';

export const getCollection = (collectionName: string) => {
    const [documents, setDocuments] = useState<Array<IApplication>>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPending, setIsPending] = useState<boolean>(false);

    const collectionRef = query(collection(firestore, collectionName));

    const getDocuments = async () => {
        try {
            setIsPending(true);
            const querySnapshot = await getDocs(collectionRef);
            const fetchedData: Array<IApplication> = []
            querySnapshot.forEach((doc) => {
                fetchedData.push({ id: doc.id, ...doc.data() } as IApplication)
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
