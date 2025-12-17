import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "@/context/AuthContext.tsx";
import {useLanguage} from "@/context/LanguageContext.tsx";




export default function LoginPage() {

    const { login } = useAuth();
    const { t } = useLanguage();

    const navigate = useNavigate();



    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const username = name.trim();
        if (!username) return;

        setIsLoading(true);


        const success = await login(username, "password");

        setIsLoading(false);

        if (success) {

            navigate("/");
        } else {

            setError(t("loginError"));
        }
    };

    return (
        <section className="max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 space-y-4">
            <div>

                <h2 className="text-xl font-semibold">{t("loginTitle")}</h2>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                    {t("loginDescription")}
                </p>
            </div>


            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder={t("namePlaceholder")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="px-3 py-2 rounded-md border border-slate-300 bg-white text-sm dark:bg-slate-900 dark:border-slate-600"
                />

                <button
                    type="submit"

                    disabled={!name.trim() || isLoading}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 disabled:opacity-50"
                >

                    {isLoading ? t("loggingIn") : t("loginButton")}
                </button>
            </form>

            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                En la app real, aquí llamaríamos a una API. En esta demo solo guardamos
                el nombre en el contexto global. (Credenciales de prueba: 'test@user.com' y 'password')
            </p>
        </section>
    );
}