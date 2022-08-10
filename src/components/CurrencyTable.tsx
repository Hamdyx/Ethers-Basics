import { EntityId } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";
import { fetchCoins, selectCoinsIds } from "feature/coins/coinsSlice";
import Main from "layout/Main";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";

const CurrencyTable: React.FC = () => {
    const dispatch = useAppDispatch();
    const coinsIds = useSelector((state: RootState) => selectCoinsIds(state));
    console.log(coinsIds);
    const tableRows = coinsIds.map((id: EntityId, i: number) => (
        <TableRow key={id} coinId={id} index={i} />
    ));

    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);
    return (
        <Main>
            <div className="currency_table border-separate border-2  border-slate-500 shadow-lg rounded-t-2xl rounded-b-2xl m-auto w-1/2">
                <div className="flex items-center border-b-2 border-b-gray-500  rounded-t-2xl h-12 text-lg px-4">
                    <p className="">#</p>
                    <p className="pl-16">Coin</p>
                    <p></p>
                    <p className="ml-auto pr-24">Price</p>
                </div>
                <ol className="table_content list-decimal list-inside">
                    {tableRows}
                </ol>
            </div>
        </Main>
    );
};

export default CurrencyTable;
