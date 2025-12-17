// src/router.tsx

import {createBrowserRouter, Navigate, Outlet,} from "react-router-dom";

import Layout from "@/layout/Layout.tsx";
import LoginPage from "@/pages/LoginPage.tsx";
import HomePage from "@/pages/HomePage.tsx";
import { RequireAuth } from "@/component/RequireAuth";



function LayoutWrapper() {
    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutWrapper/>,
        children: [
            {
                path: "/login",
                element: <LoginPage/>,
            },
            {

                element: <RequireAuth/>,
                children: [
                    {
                        index: true,
                        element: <HomePage/>,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/" replace/>,
    },
]);