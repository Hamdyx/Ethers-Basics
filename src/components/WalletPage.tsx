import { EntityId } from "@reduxjs/toolkit";
import { RootState, useAppDispatch } from "app/store";
import { fetchCoins, selectCoinsIds } from "feature/coins/coinsSlice";
import Main from "layout/Main";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TableRow from "./TableRow";

const WalletPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCoins());
    }, [dispatch]);
    return (
        <Main>
            <h1>Hello Metamask</h1>
        </Main>
    );
};

export default WalletPage;
