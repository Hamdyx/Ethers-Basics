import { RootState, useAppDispatch } from "app/store";
import icons from "assets/icons";
import { selectCoinById } from "feature/coins/coinsSlice";
import { fetchBalance } from "feature/users/userSlice";
import { useEffect } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import { calcTokensValue } from "../feature/users/userSlice";

const ConnectedUser: React.FC = () => {
    const dispatch = useAppDispatch();
    const userAddress = useSelector(
        (state: RootState) => state.user.currAddress
    );
    const token = useSelector((state: RootState) =>
        selectCoinById(state, "ETH")
    );
    const tokensValue = useSelector(
        (state: RootState) => state.user.tokensValue
    );

    const tokensBalance = useSelector(
        (state: RootState) => state.user.tokensBalance
    );

    console.log("token", token);

    function copyToClipboard() {
        window.navigator.clipboard.writeText(userAddress);
    }

    useEffect(() => {
        if (userAddress) dispatch(fetchBalance(userAddress));
    }, [dispatch, userAddress]);

    useEffect(() => {
        console.log("tokensBalance", tokensBalance);
        console.log("token", token);
        if (token) {
            console.log("dispatch(calcTokensValue(token?.last_price));");
            dispatch(calcTokensValue(token?.last_price));
        }
    }, [dispatch, tokensBalance, token]);

    const formatAddress = (add: string) => {
        const firstSec = add.slice(0, 5);
        const secondSec = add.slice(add.length - 8);
        return `${firstSec}....${secondSec}`;
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 dark:bg-slate-600 w-3/5 rounded-xl m-auto">
            <div className="flex items-center justify-center py-4 w-11/12 border-b-2 border-slate-400">
                <div className="flex items-center gap-3">
                    <img
                        src={icons.NRG}
                        className="fill-white h-8 w-8"
                        alt=""
                    />
                    <h3>Energi Network</h3>
                </div>
                <div className="flex items-center gap-2 ml-auto">
                    <span className="h-2 w-2 bg-emerald-400 rounded-full" />
                    <p className="text-emerald-400">Connected</p>
                </div>
            </div>
            <div className="flex flex-col items-center h-96 w-11/12 py-4">
                <div className="flex items-center w-full">
                    <div className="flex items-center gap-2 ">
                        <img src={icons.Metamask} className="h-6 w-6" alt="" />
                        <input
                            className="text-slate-600 dark:text-slate-300 bg-transparent"
                            defaultValue={formatAddress(userAddress)}
                            disabled
                            id="address_field"
                        />
                    </div>
                    <div className="flex items-center gap-6 ml-auto">
                        <button onClick={copyToClipboard}>
                            <MdContentCopy className="h-6 w-6" />
                        </button>
                        <button>
                            <FaExternalLinkAlt className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div className="flex flex-col py-4 gap-4">
                    <h6 className="text-slate-500 dark:text-slate-400 text-end">
                        Total Balance
                    </h6>
                    <p className="text-4xl dark:text-slate-100 flex items-center gap-2">
                        <span>
                            <img
                                src={icons.ETH}
                                className="dark:fill-white h-10 w-10"
                                alt=""
                            />
                        </span>
                        {tokensBalance}
                    </p>
                    <p className="text-3xl text-center dark:text-slate-100">
                        {`$ ${tokensValue}`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConnectedUser;
