import { Timestamp } from "firebase/firestore";

export interface IApplication {
    name: string;
    email: string;
    country: string;
    whatsAppNumber: string;
    checked: boolean;
    id: string,
    createdAt: Timestamp
}

export interface IReview {
    name: string;
    instName: string;
    review: string;
    id?: string
    createdAt: Timestamp
}