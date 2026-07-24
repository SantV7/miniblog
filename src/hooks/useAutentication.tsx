import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import type { dataAutentification } from "../types/user.type"


const useAutentication = () => {
    const [authError, setAuthError] = useState<null | string>(null)
    
    const [loading, setLoading] = useState<boolean>(false)

    const [canceled, setCanceled] = useState<boolean>(false)

    const auth = getAuth()

    function checkIfisCancelled() {
        if(canceled) return;
    }

    const createUser = async (data: unknown) => {
        checkIfisCancelled()

        setLoading(true)

        try {
            const { email, password, displayName } = data as dataAutentification
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            updateProfile(user, {
                displayName: displayName
            })
            return user
        } catch (err) {
            if(err instanceof Error) console.log(err.message)  

            console.error("Ocorreu um erro desconhecido:", err)
        } finally {
            setAuthError(null)
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCanceled(true)
    }, [])

return {authError, loading, auth, createUser}

}

export default useAutentication