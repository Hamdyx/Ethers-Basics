import Icons from "../assets/icons";
import { RootState } from "../app/store";
import { selectCoinById } from "feature/coins/coinsSlice";
import { useSelector } from "react-redux";
import { EntityId } from "@reduxjs/toolkit";

const TableRow: React.FC<{ coinId: EntityId; index: number }> = ({
    coinId,
    index
}) => {
    const coin = useSelector((state: RootState) =>
        selectCoinById(state, coinId)
    );

    type ObjectKey = keyof typeof coin;
    const icon = coin?.symbol as ObjectKey;

    const formatPrice = (price: number) => {
        return price
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return (
        <li className="flex items-center gap-8 text-lg border-b-2 border-gray-500 h-24  px-4">
            <p className="basis-6">{index + 1}</p>
            <p className="basis-1/3">
                <span className="flex items-center font-normal gap-3">
                    <img
                        src={Icons[icon]}
                        alt="coin icon"
                        className="coin_icon inline-block h-8 w-8"
                    />
                    {coin?.name}
                </span>
            </p>
            <p className="text-center basis-1/4 font-light pr-4">
                {coin?.symbol}
            </p>
            <p className="ml-auto font-light basis-1/4 text-end pr-16">
                ${formatPrice(coin!.last_price)}
            </p>
        </li>
    );
};

export default TableRow;
