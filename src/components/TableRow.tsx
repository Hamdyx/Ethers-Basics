import Icons from "../assets/icons";

const TableRow: React.FC<{ coin: { name: string; abbr: string } }> = ({
    coin
}) => {
    return (
        <div className="flex items-center gap-16 border-b-2 border-gray-500 h-24  px-4">
            <p>1</p>
            <p className="flex-1">
                <span className="flex items-center gap-3">
                    <img
                        src={Icons.BTC}
                        alt="coin icon"
                        className="coin_icon inline-block"
                    />
                    {coin.name}
                </span>
            </p>
            <p className="coin_abb text-center pr-4">{coin.abbr}</p>
            <p className="ml-auto">$20,752.69</p>
        </div>
    );
};

export default TableRow;
