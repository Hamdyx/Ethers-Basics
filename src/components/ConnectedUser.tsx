import icons from "assets/icons";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

const ConnectedUser: React.FC = () => {
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
                        <p className="text-slate-600 dark:text-slate-300">
                            0xBf9....18F8Fb89
                        </p>
                    </div>
                    <div className="flex items-center gap-6 ml-auto">
                        <button>
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
                                src={icons.NRG}
                                className="dark:fill-white h-10 w-10"
                                alt=""
                            />
                        </span>
                        1,000
                    </p>
                    <p className="text-3xl text-center dark:text-slate-100">
                        $ 2,500
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ConnectedUser;
