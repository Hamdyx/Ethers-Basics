import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "app/store";

const axios = require("axios").default;

type Coin = {
    name: string;
    symbol: string;
    last_price: number;
    maker_fee: number;
    taker_fee: number;
};

const coinsAdapter = createEntityAdapter<Coin>({
    selectId: (coin: Coin) => coin.symbol
});

interface SliceState {
    ids: any;
    entities: any;
    status: string;
    loading: boolean;
    error: boolean;
}

const initialState: SliceState = {
    ids: [],
    entities: [],
    status: "idle",
    loading: false,
    error: false
};

const EnergiApi = "https://api.energiswap.exchange/v1/assets";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
    const response = await axios.get(EnergiApi);
    const data = Object.values(response.data).slice(0, 10);
    return data;
});

const coinsSlice = createSlice({
    name: "coins",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCoins.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchCoins.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(fetchCoins.fulfilled, (state, action: any) => {
            coinsAdapter.setAll(state, action.payload);
            state.loading = false;
            state.error = false;
        });
    }
});

export default coinsSlice.reducer;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllCoins,
    selectById: selectCoinById,
    selectIds: selectCoinsIds
    // Pass in a selector that returns the posts slice of state
} = coinsAdapter.getSelectors((state: RootState) => state.coins);
