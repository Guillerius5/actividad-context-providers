

import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

export default function HomePage() {

    const { user, logout } = useAuth();
    const { t } = useLanguage();

    const handleLogout = () => {
        logout();
    };


    const userName = user?.name || t("defaultUserName");

    return (
        <section className="p-8">
            <h1 className="text-3xl font-bold mb-4">
                {t("homeWelcome")}, {userName}!
            </h1>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
                {t("homeDescription")}
            </p>
            <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md bg-red-600 text-white font-medium hover:bg-red-700 transition"
            >
                {t("logoutButton")}
            </button>
        </section>
    );
}