import CurrencyTable from "components/CurrencyTable";
import WalletPage from "components/WalletPage";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
    useEffect(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        console.log(document.documentElement);

        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "dark");
        }
    }, []);
    return (
        <Routes>
            <Route path="/" element={<CurrencyTable />} />
            <Route path="/wallet" element={<WalletPage />} />
        </Routes>
    );
}

export default App;
