import Icons from "../assets/icons";
import { RootState } from "../app/store";
import { selectCoinById } from "feature/coins/coinsSlice";
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";

const TableRow: React.FC<{ coinId: EntityId }> = ({ coinId }) => {
    const coin = useSelector((state: RootState) =>
        selectCoinById(state, coinId)
    );

    console.log(coin);
    return (
        <div className="flex items-center gap-12 text-lg border-b-2 border-gray-500 h-24  px-4">
            <p>1</p>
            <p className="basis-1/3">
                <span className="flex items-center font-normal gap-3">
                    <img
                        src={Icons.BTC}
                        alt="coin icon"
                        className="coin_icon inline-block"
                    />
                    {coin?.name}
                </span>
            </p>
            <p className="coin_abb text-center basis-1/4 font-light pr-4">
                {coin?.symbol}
            </p>
            <p className="ml-auto font-light basis-1/4 text-end pr-16">
                ${coin?.last_price.toFixed(2)}
            </p>
        </div>
    );
};

export default TableRow;
