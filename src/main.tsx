import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {RouterProvider} from "react-router-dom";
import {router} from "./router";
import {ThemeProvider} from "@/context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    /**
     <React.StrictMode>
     <ThemeProvider>
     <LanguageProvider>
     <AuthProvider>
     <RouterProvider router={router} />
     </AuthProvider>
     </LanguageProvider>
     </ThemeProvider>
     </React.StrictMode>
     **/
    <React.StrictMode>
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
    </React.StrictMode>
);
