import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { fetchCompanyInfo, fetchShipsInfo } from "./actions";
import { CompanyProps, SpaceShipProps } from "./types";

interface SpaceProps {
  company: CompanyProps | null;
  isLoading: boolean;
  ships: SpaceShipProps[] | null;
}

const initialState: SpaceProps = {
  company: null,
  isLoading: false,
  ships: null,
};

export const spaceSlice = createSlice({
  name: "space",
  initialState,
  reducers: {
    updateCompanyList: (state, action: PayloadAction<CompanyProps>) => {
      state.company = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCompanyInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCompanyInfo.fulfilled, (state, action) => {
      state.company = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCompanyInfo.rejected, (state, action) => {
      state.isLoading = false;
      alert(action.error.message || "Network Request Failed");
    });
    builder.addCase(fetchShipsInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchShipsInfo.fulfilled, (state, action) => {
      state.ships = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchShipsInfo.rejected, (state, action) => {
      state.isLoading = false;
      alert(action.error.message || "Network Request Failed");
    });
  },
});

export const { updateCompanyList } = spaceSlice.actions;

export default spaceSlice.reducer;
