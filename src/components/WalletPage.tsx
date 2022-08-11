import { RootState, useAppDispatch } from "app/store";
import icons from "assets/icons";
import Main from "layout/Main";
import { useEffect } from "react";
import ConnectedUser from "./ConnectedUser";
import { connectWallet, fetchSigner } from "../feature/users/userSlice";
import { useSelector } from "react-redux";

const WalletPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const isConnected = useSelector(
        (state: RootState) => state.user.isConnected
    );

    useEffect(() => {
        if (!isConnected) dispatch(fetchSigner());
        console.log("isConnected Init", isConnected);
    }, [dispatch, isConnected]);

    const handleConnectWallet = async () => {
        console.log("handleConnectWallet");
        await dispatch(connectWallet());
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
