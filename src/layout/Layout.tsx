
import Footer from "@/component/Footer.tsx";
import Header from "@/component/Header.tsx";
import type {ReactNode} from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-slate-50 flex flex-col">
            <Header/>
            <main className="flex-1">
                <div className="mx-auto max-w-5xl px-4 py-8">
                    {children}
                </div>
            </main>
            <Footer/>
        </div>
    );
}