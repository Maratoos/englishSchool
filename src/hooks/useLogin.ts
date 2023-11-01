import { User, signInWithEmailAndPassword } from "firebase/auth"
import { useState } from "react"
import { auth } from '../firebase/config'

type TypeLoginFn = (email: string, password: string) => Promise<User | undefined>

export const useLogin = () => {
    const [error, setError] = useState<null | string>(null)
    const [isPending, setIsPending] = useState<boolean>(false)

    const login: TypeLoginFn = async (email, password) => {
        setError(null)
        setIsPending(true)
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password)

            setIsPending(false)
            setError(null)
            return user
        }
        catch (err: any) {
            setError(err.message)
            setIsPending(false)
        }
    }
    return { login, error, isPending }
}