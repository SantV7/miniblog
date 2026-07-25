import { type ReactNode, useContext, createContext } from "react"
import type { User } from "firebase/auth"

interface AuthContextType {
  user: User | null | undefined
}

interface AuthProviderProps {
  children: ReactNode
  value: AuthContextType
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children, value }: AuthProviderProps) => {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthValue = () => {
  const context = useContext(AuthContext);

  if(!context) throw new Error('useAuthValue deve ser usado dentro de um AuthProvider');

  return context;
}



export default AuthContext