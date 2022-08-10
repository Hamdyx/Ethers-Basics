import { EntityId } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";
import icons from "assets/icons";
import { fetchCoins } from "feature/coins/coinsSlice";
import Main from "layout/Main";
import { useEffect, useState } from "react";
import ConnectedUser from "./ConnectedUser";

const WalletPage: React.FC = () => {
    const [isConnected, setIsConnected] = useState<boolean>(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);

    const handleConnectWallet = () => {
        console.log("handleConnectWallet");
    };
    return (
        <Main>
            {isConnected ? (
                <ConnectedUser />
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 m-auto">
                    <img
                        src={icons.Metamask}
                        alt="wallet icon"
                        className="inline-block h-40 w-40"
                    />
                    <h1 className="text-5xl tracking-widest uppercase font-medium">
                        Metamask
                    </h1>
                    <button
                        onClick={handleConnectWallet}
                        className="mt-12 bg-emerald-600 py-2 px-4 rounded-lg text-white"
                    >
                        Connect wallet
                    </button>
                </div>
            )}
        </Main>
    );
};

export default WalletPage;
