import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window!.ethereum, "any");
const signer = provider.getSigner();

provider.on("network", (newNetwork, oldNetwork) => {
    // When a Provider makes its initial connection, it emits a "network"
    // event with a null oldNetwork along with the newNetwork. So, if the
    // oldNetwork exists, it represents a changing network
    console.log("userSlice network - newNetwork", newNetwork);
    console.log("userSlice network - oldNetwork", oldNetwork);
    if (oldNetwork) {
        window.location.reload();
    }
});

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

export const getProvider = createAsyncThunk("user/getProvider", async () => {
    console.log("getProvider - AsyncThunk");
    const _provider = new ethers.providers.Web3Provider(
        window!.ethereum,
        "any"
    );
    console.log("getProvider - _provider", _provider);

    return _provider;
});

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        lockWallet: (state) => {
            console.log("lockWallet");
            state.currAddress = "";
            state.isConnected = false;
        },
        calcTokensValue: (state, action) => {
            const price = action.payload.toFixed(2);
            console.log("calcTokensValue - price", price);
            console.log("calcTokensValue - action.payload", action.payload);
            state.tokensValue = String(state.tokensBalance * price);
        }
    },
    extraReducers: (builder) => {
        // ********************** fetchSigner **********************
        builder.addCase(fetchSigner.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchSigner.rejected, (state, action) => {
            console.log("fetchSigner.rejected - action.error", action.error);
            state.loading = false;
            state.error = true;
            state.currAddress = "";
            state.isConnected = false;
        });
        builder.addCase(fetchSigner.fulfilled, (state, action) => {
            console.log(
                "fetchSigner.fulfilled - action.payload",
                action.payload
            );
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
            console.log("connectWallet.rejected - action.error", action.error);
            state.loading = false;
            state.isConnected = false;
            state.error = true;
        });
        builder.addCase(connectWallet.fulfilled, (state, action) => {
            console.log("connectWallet.fulfilled", action.payload);
            state.loading = false;
            state.error = false;
            state.isConnected = true;
            state.currAddress = action.payload;
        });
        // ********************** getSigner **********************
        builder.addCase(getSigner.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getSigner.rejected, (state, action) => {
            console.log("getSigner- action.error", action.error);
            state.loading = false;
            state.error = true;
            state.isConnected = false;
            state.currAddress = "";
        });
        builder.addCase(getSigner.fulfilled, (state, action) => {
            console.log("getSigner - action.payload", action.payload);
            state.loading = false;
            state.error = false;
            state.isConnected = true;
            state.currAddress = action.payload;
        });
        // ********************** fetchBalance **********************
        builder.addCase(fetchBalance.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchBalance.rejected, (state, action) => {
            console.log("fetchBalance - action.error", action.error);
            state.loading = false;
            state.error = true;
        });
        builder.addCase(fetchBalance.fulfilled, (state, action) => {
            console.log("fetchBalance - action.payload", action.payload);
            state.loading = false;
            state.error = false;
            state.tokensBalance = action.payload;
        });
    }
});

export default userSlice.reducer;

export const { calcTokensValue, lockWallet } = userSlice.actions;

// Export the customized selectors for this adapter using `getSelectors`
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUsersIds
    // Pass in a selector that returns the posts slice of state
} = userAdapter.getSelectors((state: RootState) => state.user);
