import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window!.ethereum);
const signer = provider.getSigner();

type User = {
    address: string;
};

const userAdapter = createEntityAdapter<User>({
    selectId: (user: User) => user.address
});

interface SliceState {
    ids: any;
    entities: any;
    isConnected: boolean;
    currAddress: string;
    tokensBalance: number;
    tokensValue: string;
    status: string;
    loading: boolean;
    error: boolean;
}

const initialState: SliceState = {
    ids: [],
    entities: [],
    currAddress: "",
    tokensBalance: 0,
    tokensValue: "0",
    isConnected: false,
    status: "idle",
    loading: false,
    error: false
};

export const fetchSigner = createAsyncThunk("user/fetchSigner", async () => {
    console.log("fetchSigner AsyncThunk");
    const res = await signer.getAddress();

    return res;
});

export const fetchBalance = createAsyncThunk(
    "user/fetchBalance",
    async (acc: string) => {
        console.log("fetchBalance AsyncThunk");
        console.log(`acc => ${acc}`);

        const res = await provider.getBalance(acc);
        console.log("fetchBalance AsyncThunk res");
        console.log(res);
        const utilFormat = ethers.utils.formatEther(ethers.BigNumber.from(res));
        console.log("utilFormat", utilFormat);

        return parseFloat(utilFormat);
    }
);

export const connectWallet = createAsyncThunk(
    "user/connectWallet",
    async () => {
        console.log("connectWallet AsyncThunk");
        const res = await provider.send("eth_requestAccounts", []);
        console.log("connectWallet res");
        console.log(res);

        return res;
    }
);

export const getSigner = createAsyncThunk("user/getSigner", async () => {
    console.log("getSigner AsyncThunk");
    const myAddress = await signer.getAddress();
    console.log("myAddress", myAddress);

    return myAddress;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        calcTokensValue: (state, action) => {
            const price = action.payload.toFixed(2);
            console.log("calcTokensValue", action.payload);
            state.tokensValue = ethers.utils.commify(
                state.tokensBalance * price
            );
        }
    },
    extraReducers: (builder) => {
        // ********************** fetchSigner **********************
        builder.addCase(fetchSigner.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSigner.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(fetchSigner.fulfilled, (state, action) => {
            userAdapter.addOne(state, {
                ...state.entities[0],
                address: action.payload
            });
            console.log("fetchSigner.fulfilled");
            console.log(action.payload);
            state.loading = false;
            state.error = false;
            state.isConnected = true;
            state.currAddress = action.payload;
        });
        // ********************** connectWallet **********************
        builder.addCase(connectWallet.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(connectWallet.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            console.log("connectWallet.fulfilled action.payload");
            console.log(action.payload);
            userAdapter.addOne(state, { ...state, address: action.payload });
            state.loading = false;
            state.error = false;
            state.isConnected = true;
        });
        // ********************** getSigner **********************
        builder.addCase(getSigner.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getSigner.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.error);
        });
        builder.addCase(getSigner.fulfilled, (state, action) => {
            // userAdapter.setAll(state, action.payload);
            console.log(action.payload);
            state.loading = false;
            state.error = false;
            state.isConnected = true;
        });
        // ********************** fetchBalance **********************
        builder.addCase(fetchBalance.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchBalance.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
            console.log(action.error);
        });
        builder.addCase(fetchBalance.fulfilled, (state, action) => {
            console.log("fetchBalance action.payload");
            console.log(action.payload);
            state.loading = false;
            state.error = false;
            state.tokensBalance = action.payload;
        });
    }
});

export default userSlice.reducer;

export const { calcTokensValue } = userSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds
    // Pass in a selector that returns the posts slice of state
} = userAdapter.getSelectors((state: RootState) => state.user);
