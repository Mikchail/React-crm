import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { fixerKey } from '../env';
import { fireAuth, fireDatabase } from "../firebase"


interface currency {
  currency: {
    success: boolean;
    date: Date;
    rates: {
      [key: string]: number;
      USD: number,
      EUR: number,
      RUB: number,
    };
  };
  loading: boolean;
  error: null | any;
}

const initialState: currency = {
  currency: {
    success: false,
    date: new Date(),
    rates: {
      USD: 1,
      EUR: 1,
      RUB: 1,
    }
  },
  loading: true,
  error: null
}
export const fetchCurrency = createAsyncThunk("fixer/fetchCurrency", async (_, { dispatch }) => {
  try {
    const currency = await fetch(`http://data.fixer.io/api/latest?access_key=${fixerKey}&symbols=USD,EUR,RUB`)
    return await currency.json()
  } catch (e) {
    throw e;
  }
});
export const moneySlice = createSlice({
  name: 'money',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  },
  extraReducers: {
    [fetchCurrency.fulfilled.type]: (state, action) => {
      state.currency = action.payload;
      state.loading = false;
    },
    [fetchCurrency.pending.type]: (state, action) => {
      state.loading = true;
    },
    [fetchCurrency.rejected.type]: (state, action) => {
      state.loading = false;
    },
  }
});

export default moneySlice.reducer;
