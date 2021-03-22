import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { fireAuth, fireDatabase } from "../../firebase"
interface IUser {
  name: string;
  bill: number;
}


interface AuthState {
  user: IUser | null;
  userError: any;
}

interface IUserDTO {
  email: string;
  password: string;
  name?: string;
}

const initialState: AuthState = {
  user: null,
  userError: null
};

const getUid = () => {
  const user = fireAuth.currentUser
  return user ? user.uid : null;
}

export const login = createAsyncThunk("user/login", async ({ email, password }: IUserDTO, { dispatch }) => {
  try {
    await fireAuth.signInWithEmailAndPassword(email, password)
    const uid = getUid();
    const userInfo = (await fireDatabase.ref(`users/${uid}/info`).once("value")).val()
    return userInfo;
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
      console.log(action.payload);

      state.user = action.payload;
    },
    ["login.rejected"]: (state, action) => {
      throw new Error(action.payload);
    },
    [logout.fulfilled.toString()]: (state) => {
      console.log("logout");

    },
    [logout.rejected.toString()]: (state, action) => {
      state.userError = action
      throw new Error("no user");
    },
    ["register.fulfilled"]: (state, action) => {
      state.user = action.payload
    },
    ["register.rejected"]: (state, action) => {
      state.userError = action
      throw new Error("no user");
    },
  }
});

export default authSlice.reducer;
