import { useReducer } from "react"
import { database } from '../firebase/settings'
import { collection, addDoc, Timestamp, type DocumentReference, type DocumentData } from "firebase/firestore"

interface StateProps {
    loading: boolean;
    error: null | string;
}

type Action =
    | { type: "LOADING" }
    | { type: "INSERTED_DOC"; payload: DocumentReference<DocumentData> }
    | { type: "ERROR"; payload: string }

const init: StateProps = {
    loading: false,
    error: null
}

const insertReducer = (state: StateProps, action: Action): StateProps => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "INSERTED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useInsertDocument = (docCollection: string) => {
    const [response, dispatch] = useReducer(insertReducer, init)

    const insertDocument = async (document: DocumentData) => {
        dispatch({ type: "LOADING" })

        try {
            const newDocument = { ...document, createdAt: Timestamp.now() }

            const insertedDocument = await addDoc(
                collection(database, docCollection),
                newDocument
            )

            dispatch({
                type: "INSERTED_DOC",
                payload: insertedDocument
            })
        } catch (err) {
            let errorMessage = "Ocorreu um erro inesperado."

            if (err instanceof Error) {
                errorMessage = err.message
            }

            dispatch({
                type: "ERROR",
                payload: errorMessage
            })
        }
    }

    return { insertDocument, response }
}

export default useInsertDocument