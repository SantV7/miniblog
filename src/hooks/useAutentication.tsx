import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { useEffect, useState } from "react"


const useAutentication = () => {
    const [error, setError] = useState<null | string>(null)
    
    const [loading, setLoading] = useState<boolean>(false)

    const [canceled, setCanceled] = useState<boolean>(false)

    const auth = getAuth()

    function checkIfisCancelled() {
        if(canceled) return;
    }

    const createUser = async (data) => {
        checkIfisCancelled()

        setLoading(true)

        try {
            const {user} = createUserWithEmailAndPassword(
                auth,
                data
            )
        } catch (err) {
            if(err instanceof Error) console.log(err.message)  

            console.error("Ocorreu um erro desconhecido:", err);
        } finally {
            setError(null)
            setLoading(false)
        }
    }



}

export default useAutentication