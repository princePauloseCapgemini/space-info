import { createAsyncThunk } from "@reduxjs/toolkit";
import { companyInfoQuery, spaceShipsQuery } from "../helpers/queries";
import { getSpacexData } from "../helpers/services";

export const fetchCompanyInfo = createAsyncThunk(
  "space/companyInfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getSpacexData(companyInfoQuery);
      return response?.data?.data?.company || null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchShipsInfo = createAsyncThunk(
  "space/shipsInfo",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await getSpacexData(spaceShipsQuery);
      return response?.data?.data?.ships || null;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
