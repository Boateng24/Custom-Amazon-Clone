// userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  UserCredential,
  Auth
} from "firebase/auth";

interface UserState {
  user: UserCredential | null;
  status: "idle" | "loading";
  error: Error | null;
}

const initialState: UserState = {
  user: null,
  status: "idle",
  error: null,
};

interface LoginInput {
  email: string;
  password: string;
  auth: Auth;
}

interface RegisterInput extends LoginInput {
  username: string;
}

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, auth }: LoginInput) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredentials;
  }
);

export const register = createAsyncThunk(
  "user/register",
  async ({ username, email, password, auth }: RegisterInput) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredentials.user, { displayName: username });
    return userCredentials;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<UserCredential>) => {
          state.status = "idle";
          state.user = action.payload;
          localStorage.setItem("loginUser", JSON.stringify(state.user.user))
        }
      )
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<UserCredential>) => {
          state.status = "idle";
          state.user = action.payload;
          localStorage.setItem("userlogout", JSON.stringify(state.user.user))
        }
      );
  },
});

export default userSlice.reducer;
