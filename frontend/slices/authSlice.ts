import {
  authState,
  ResetPasswordConfirm,
  Signup,
  User,
} from "@/interface/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authService } from "@/services/authService";
import { getErrorMessage } from "@/lib/helper";
import Cookies from "js-cookie";

const loadInitialState = (): authState => {
  return {
    user: null,
    isAuthenticated: false,
    token: null,
    loading: false,
    error: null,
    success: false,
  };
};

const initialState: authState = loadInitialState();

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(start());
      const response = await authService.login({ email, password });

      if (!response.access) {
        return rejectWithValue("Login failed: No access token received");
      }

      // Store token in localStorage for persistence
      localStorage.setItem("token", response.access);

      // fetch user
      const user = await authService.getUser(response.access);

      if (!user) {
        return rejectWithValue("Failed to fetch user details");
      }

      // Update auth state
      dispatch(success({ token: response.access }));
      dispatch(
        setUser({
          ...user,
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          email: user.email || "",
          avatar: user.avatar || "",
        })
      );

      return true;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(failure(message));
      return rejectWithValue(message);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: Signup, { dispatch }) => {
    try {
      dispatch(start());
      const response = await authService.signup({
        ...data,
      });
      dispatch(signupSuccess());
      return response;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(failure(message));
      throw new Error(message);
    }
  }
);

export const activateAccount = createAsyncThunk(
  "auth/activate",
  async (
    { uid, token }: { uid: string; token: string },
    { dispatch, rejectWithValue }
  ) => {
    // Only require token to be present (uid can be empty for activation codes)
    if (!token) {
      return rejectWithValue(
        "Invalid activation link. Missing activation token."
      );
    }

    try {
      dispatch(start());
      const response = await authService.activate({ uid, token });
      dispatch(activateSuccess());
      return response;
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(activationFailure(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string, { dispatch, rejectWithValue }) => {
    try {
      dispatch(start());
      await authService.resetPassword({ email });
      dispatch(resetPasswordSuccess());
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(failure(message));
      return rejectWithValue(message);
    }
  }
);

export const resetPasswordConfirm = createAsyncThunk(
  "auth/resetPasswordConfirm",
  async (data: ResetPasswordConfirm, { dispatch, rejectWithValue }) => {
    try {
      dispatch(start());
      await authService.resetPasswordConfirm(data);
      dispatch(resetPasswordSuccess());
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      dispatch(failure(message));
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    start: (state) => {
      state.loading = true;
      state.error = null;
    },
    success: (state, action: PayloadAction<{ token: string }>) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);

      Cookies.set("token", action.payload.token, {
        expires: 1,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      });
    },
    failure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    signupSuccess: (state) => {
      state.loading = false;
    },
    activateSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    activationFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    hydrate: (state) => {
      if (typeof window === "undefined") return;
      const token = Cookies.get("token");
      const userData = localStorage.getItem("user");

      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
      if (userData) {
        state.user = JSON.parse(userData);
      }
    },
  },
});

export const {
  start,
  success,
  failure,
  logout,
  reset,
  setUser,
  signupSuccess,
  activateSuccess,
  activationFailure,
  resetPasswordSuccess,
  hydrate,
} = authSlice.actions;
export default authSlice.reducer;
