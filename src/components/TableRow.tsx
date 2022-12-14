import Icons from "../assets/icons";
import { RootState } from "../app/store";
import { selectCoinById } from "feature/coins/coinsSlice";
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";
import { formatPrice } from "../utils";

const TableRow: React.FC<{ coinId: EntityId; index: number }> = ({
    coinId,
    index
}) => {
    const coin = useSelector((state: RootState) =>
        selectCoinById(state, coinId)
    );

    type ObjectKey = keyof typeof coin;
    const icon = coin?.symbol as ObjectKey;

    return (
        <li className="flex items-center gap-2 2xl:gap-8 xl:gap-6 md:gap-4 text-lg border-b-2 border-gray-500 h-24 px-4">
            <p className=" basis-1/12">{index + 1}</p>
            <p className="basis-2/3 sm:basis-6/12">
                <span className="flex items-center font-normal gap-3">
                    <img
                        src={Icons[icon]}
                        alt="coin icon"
                        className="coin_icon inline-block h-8 w-8"
                    />
                    {coin?.name}
                </span>
            </p>
            <p className="text-center basis-1/12 font-light pr-4 hidden sm:block">
                {coin?.symbol}
            </p>
            <p className="ml-auto font-light basis-4/12 text-end pr-6 2xl:pr-16 xl:pr-14 lg:pr-10">
                ${formatPrice(coin!.last_price)}
            </p>
        </li>
    );
};

export default TableRow;
