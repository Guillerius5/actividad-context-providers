// src/context/ThemeContext.tsx (CÓDIGO CORREGIDO)

import {createContext, useState, type ReactNode, useEffect, useContext} from 'react';

type Theme = 'light' | 'dark';

type ThemeContextType = {
    theme: Theme;
    toggleTheme: () => void;
};

const themeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
    children: ReactNode;
};


export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            return (savedTheme as Theme) || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        root.classList.add(theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev)=>(prev === 'light' ? 'dark' : 'light'));
    };

    const contextValue: ThemeContextType = {
        theme,
        toggleTheme,
    };

    return (
        <themeContext.Provider value={contextValue}>
            {children}
        </themeContext.Provider>
    );
}

export function useTheme() {
    const ctx=useContext(themeContext);
    if (!ctx) {
        throw new Error("useTheme debe usarse dentro de <ThemeProvider>");
    }
    return ctx
}