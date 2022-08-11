import { EntityId } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { selectCoinsIds } from "feature/coins/coinsSlice";
import Main from "layout/Main";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";

const CurrencyTable: React.FC = () => {
    const coinsIds = useSelector((state: RootState) => selectCoinsIds(state));
    console.log(coinsIds);
    const tableRows = coinsIds.map((id: EntityId, i: number) => (
        <TableRow key={id} coinId={id} index={i} />
    ));

    return (
        <Main>
            <div className="currency_table border-2 border-slate-500 shadow-lg rounded-t-2xl rounded-b-2xl m-auto w-11/12 2xl:w-1/2 xl:w-2/3 lg:w-3/4 md:w-4/5 sm:w-11/12">
                <div className="flex items-center border-b-2 border-b-gray-500  rounded-t-2xl h-12 text-lg px-4">
                    <p className="basis-1/12">#</p>
                    {/* pl-16 */}
                    <p className=" basis-6/12">Coin</p>
                    <p></p>
                    <p className="ml-auto basis-5/12 text-end pr-10 2xl:pr-24 lg:pr-20 md:pr-16">
                        Price
                    </p>
                </div>
                <ol className="table_content list-decimal list-inside">
                    {tableRows}
                </ol>
            </div>
        </Main>
    );
};

export default CurrencyTable;
