import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import authSlice from '../reducers/authSlice';
import categorySlice from '../reducers/categorySlice';
import moneySlice from '../reducers/moneySlice';

export const store = configureStore({

  reducer: {
    auth: authSlice,
    currency: moneySlice,
    category: categorySlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
