import { dataBase } from "../firebase/settings"

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
        setAuthError(null)

        try {
            const { email, password, displayName } = data as dataAutentification
            const { user } = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            )

            await updateProfile(user, {
                displayName: displayName
            });

            return user;
        } catch (err) {
            let msgError: string = "Ocorreu um erro, tente mais tarde."

            if(err instanceof Error) {
                console.log(err.message)
            
                if(err.message.includes("Password")) {
                    msgError = "A senha precisa conter pelo menos 8 caracteres."
                }
                else if(err.message.includes("email-already")) {
                    msgError = "E-mail já cadastrado."
                } else {
                    msgError = "Ocorreu um erro desconhecido"
                    console.error("Ocorreu um erro desconhecido:", err)
                }
            }  

            setAuthError(msgError)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        return () => setCanceled(true)
    }, [])

return {authError, loading, auth, createUser}

}

export default useAutentication