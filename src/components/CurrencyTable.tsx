import { EntityId } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";
import { fetchCoins, selectCoinsIds } from "feature/coins/coinsSlice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";

const CurrencyTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const coinsIds = useSelector((state: RootState) => selectCoinsIds(state));
    console.log(coinsIds);
    const tableRows = coinsIds.map((id: EntityId) => (
        <TableRow key={id} coinId={id} />
    ));

    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);
    return (
        <div className="App ">
            <header className="App-header">
                <div className="currency_table border-separate border-2  border-slate-500 shadow-lg rounded-t-2xl rounded-b-2xl">
                    <div className="flex items-center border-b-2 border-b-gray-500  rounded-t-2xl h-12 text-lg px-4">
                        <p className="">#</p>
                        <p className="pl-16">Coin</p>
                        <p></p>
                        <p className="ml-auto pr-16">Price</p>
                    </div>
                    <div className="table_content">
                        {tableRows}
                        {/* <TableRow coin={{ name: "Bitcoin", abbr: "BTC" }} /> */}
                        {/* <TableRow coin={{ name: "Ethereum", abbr: "ETH" }} /> */}
                        {/* <TableRow coin={{ name: "BNB", abbr: "BNB" }} /> */}
                        {/* <TableRow coin={{ name: "Cardano", abbr: "ADA" }} /> */}
                    </div>
                </div>
            </header>
        </div>
    );
};

export default CurrencyTable;
