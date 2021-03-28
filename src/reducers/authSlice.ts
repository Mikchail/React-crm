import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../app/store';
import { fireAuth, fireDatabase } from "../firebase"
interface IUser {
  name: string;
  bill: number;
}


interface AuthState {
  user: IUser | null;
  userError: any;
  loading: boolean;
}

interface IUserDTO {
  email: string;
  password: string;
  name?: string;
}

const initialState: AuthState = {
  user: null,
  userError: null,
  loading: false,
};

const getUid = () => {
  const user = fireAuth.currentUser
  return user ? user.uid : null;
}

export const getUserInfo = createAsyncThunk("user/get_user_info", async () => {
  try {
    const uid = getUid();
    const userInfo = (await fireDatabase.ref(`users/${uid}/info`).once("value")).val()
    return userInfo;
  } catch (e) {
    console.log(e);

  }
})

export const login = createAsyncThunk("user/login", async ({ email, password }: IUserDTO, { dispatch }) => {
  try {
    await fireAuth.signInWithEmailAndPassword(email, password)
    return await getUserInfo();
  } catch (error) {
    console.log(error);

    throw error;
  }
});

export const register = createAsyncThunk("user/register", async ({ email, password, name }: IUserDTO, { dispatch }) => {
  try {
    const user = await fireAuth.createUserWithEmailAndPassword(email, password)
    const uid = getUid();
    await fireDatabase.ref(`users/${uid}/info`).set({
      bill: 1000,
      name
    })
    return user;
  } catch (e) {
    throw e;
  }
});

export const logout = createAsyncThunk("user/logout", async () => {
  try {
    await fireAuth.signOut()
  } catch (e) {
    throw e;
  }
});
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.user = action.payload.user;
    // },
    error: (state, action) => {
      state.userError = action.payload
    },
  },
  extraReducers: {
    [login.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    [login.pending.type]: (state, action) => {
      state.loading = true;
    },
    [login.rejected.type]: (state, action) => {
      state.loading = false;
      throw new Error(action.payload);
    },
    [logout.fulfilled.type]: (state) => {
      state.user = null;
      state.loading = false;
    },
    [logout.rejected.toString()]: (state, action) => {
      state.userError = action
      state.loading = false;
      throw new Error("no user");
    },
    [logout.pending.type]: (state, action) => {
      state.loading = true;
    },
    [register.fulfilled.type]: (state, action) => {
      state.user = action.payload
      state.loading = false;
    },
    [register.pending.type]: (state, action) => {
      state.loading = true;
    },
    [register.rejected.type]: (state, action) => {
      state.userError = action;
      state.loading = false;
      throw new Error("no user");
    },
    [getUserInfo.fulfilled.type]: (state,action) => {
      state.user = action.payload
      state.loading = false;
    },
    [getUserInfo.pending.type]: (state) => {
      state.loading = true;
    },
    [getUserInfo.rejected.type]: (state) => {
      state.loading = false;
    }
  }
});

export default authSlice.reducer;
