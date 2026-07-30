import {  database } from "../firebase/settings"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"
import { useState } from "react"
import type { dataAutentification } from "../types/user.type"


interface LoginProps {
    email: string;
    password: string
}

const useAutentication = () => {
    const [authError, setAuthError] = useState<null | string>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const auth = getAuth()

    const createUser = async (data: unknown) => {
        setLoading(true)

        setAuthError(null)

        try {
            setLoading(true)
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
            console.error("Ocorreu um erro desconhecido:", err)

            if(err instanceof Error) {
                console.log(err.message)
            
                if(err.message.includes("Password")) {
                    msgError = "A senha precisa conter pelo menos 8 caracteres."
                }
                else if(err.message.includes("email-already")) {
                    msgError = "E-mail já cadastrado."
                } 
            }  

            setAuthError(msgError)
        } finally {
            setLoading(false)
        }
    }

    const login = async (data: LoginProps) => {
        const { email , password } = data 

        setAuthError(null);
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password)
        } catch (err) {

            let systemErrorMsg: string = "Erro ao realizar o login. Tente novamente."

            console.log('Ocorreu um erro inesperado, por favor tente mais tarde.');
            if(err instanceof Error) {
                if(err.message.includes("user-not-found") || err.message.includes("invalid-credential")) {
                    systemErrorMsg = "Usuário não encontrado."
                } else if(err.message.includes("wrong-password")) {
                    systemErrorMsg = "Senha incorreta"
                }

               

                setAuthError(systemErrorMsg)
            }
        } finally {
            setLoading(false)
        }
    }

    const logout = () => signOut(auth)

  return {authError, loading, auth, createUser, login, logout}
}

export default useAutentication