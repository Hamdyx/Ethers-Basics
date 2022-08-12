import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window!.ethereum);

interface SliceState {
    chainId: number;
    ensAddress: string | undefined;
    name: string;
    loading: boolean;
    error: boolean;
}

const initialState: SliceState = {
    chainId: -1,
    ensAddress: "",
    name: "",
    loading: false,
    error: false
};

export const getNetwork = createAsyncThunk("network/getNetwork", async () => {
    console.log("getNetwork AsyncThunk");
    const network = await provider.getNetwork();
    console.log("getNetwork network", network);
    const { chainId, ensAddress, name } = network;
    return { chainId, ensAddress, name };
});

const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {
        setCurrNetwork: (state, action) => {
            console.log("setCurrNetwork - action.payload", action.payload);
        }
    },
    extraReducers: (builder) => {
        // ********************** getNetwork **********************
        builder.addCase(getNetwork.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getNetwork.rejected, (state, action) => {
            state.loading = false;
            state.error = true;
        });
        builder.addCase(getNetwork.fulfilled, (state, action) => {
            console.log("getNetwork.fulfilled");
            console.log(action.payload);
            state.chainId = action.payload.chainId;
            state.ensAddress = action.payload.ensAddress;
            state.name = action.payload.name;
            state.loading = false;
        });
    }
});

export default networkSlice.reducer;

export const { setCurrNetwork } = networkSlice.actions;
