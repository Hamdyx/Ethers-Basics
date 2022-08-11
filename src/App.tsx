import { useAppDispatch } from "app/store";
import CurrencyTable from "components/CurrencyTable";
import WalletPage from "components/WalletPage";
import { fetchCoins } from "feature/coins/coinsSlice";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";

function App() {
    const dispatch = useAppDispatch();
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
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "dark");
        }
    }, []);
    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);
    return (
        <Routes>
            <Route path="/" element={<CurrencyTable />} />
            <Route path="/wallet" element={<WalletPage />} />
        </Routes>
    );
}

export default App;
