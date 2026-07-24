import type { AuthError, User } from "firebase/auth";

export interface UseAuth {
    authError: AuthError;
    loading: boolean;
    auth: User | undefined;
    createUser: () => void;
}