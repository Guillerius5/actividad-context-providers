// src/context/AuthContext.tsx
import { createContext, useContext, useState, type ReactNode, useEffect } from 'react';



interface User {
    name: string;

}

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;

    login: (username: string, password: string) => Promise<boolean>;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | undefined>(undefined);


const USER_STORAGE_KEY = 'auth_user';


export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const isAuthenticated = !!user;


    useEffect(() => {
        if (user) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }, [user]);


    const login = async (username: string, password: string): Promise<boolean> => {

        await new Promise(resolve => setTimeout(resolve, 1000));


        if (username.trim() && password === 'password') {
            const newUser: User = { name: username.trim() };
            setUser(newUser);
            return true;
        }


        return false;
    };


    const logout = () => {
        setUser(null);
    };

    const contextValue = {
        isAuthenticated,
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de <AuthProvider>");
    }
    return ctx;
}