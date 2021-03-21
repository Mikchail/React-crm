import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { fireAuth, fireDatabase } from "../../firebase"
interface IUser {
  email: string;
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
    const user = await fireAuth.signInWithEmailAndPassword(email, password)
    return user;
  } catch (error) {
    // let error = await e.json()
    console.log(error);
    
    dispatch(authSlice.actions.error(error.message));
    throw error;
  }
});

export const register = createAsyncThunk("user/register", async ({ email, password, name }: IUserDTO, { dispatch }) => {
  try {
    const user = await fireAuth.createUserWithEmailAndPassword(email, password)
    const uid = await getUid();
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
    login: state => {
      state.user = { email: "test@we.we" }
    },
    error: (state, action) => {
      state.userError = action.payload
    },
  },
  extraReducers: {
    [login.fulfilled.toString()]: (state, action) => {
      state.user = action.payload;
    },
    [login.rejected.toString()]: (state, action) => {
      authSlice.caseReducers.error(state,action)
      throw new Error(action.payload);
    },
    [logout.fulfilled.toString()]: (state) => {
      console.log("logout");

    },
    [logout.rejected.toString()]: (state, action) => {
      state.userError = action
      throw new Error("no user");
    },
    [register.fulfilled.toString()]: (state, action) => {
      state.user = action
    },
    [register.rejected.toString()]: (state, action) => {
      state.userError = action
      throw new Error("no user");
    },
  }
});

export default authSlice.reducer;
