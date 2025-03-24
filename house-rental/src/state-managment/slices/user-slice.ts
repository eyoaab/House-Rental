import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "@/types/user-type";
import Axios from "axios";

// Define API URLs
const REGISTER_URL =
  "https://house-rental-backend-tc9z.onrender.com/api/user/signup";
const LOGIN_URL =
  "https://house-rental-backend-tc9z.onrender.com/api/user/login";

// Async thunk for user registration
export const registerUser = createAsyncThunk<
  User,
  { username: string; password: string; fullName: string },
  { rejectValue: string }
>(
  "user/signUp",
  async ({ username, password, fullName }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(REGISTER_URL, {
        username,
        password,
        fullName,
        role: "admin",
      });

      // If status is not 201, extract message from the response
      if (response.status !== 201) {
        localStorage.setItem("authToken", response.data.token);
        return rejectWithValue(
          response.data?.message || "Registration failed."
        );
      }

      return response.data.user; // Return user object
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  }
);

// Async thunk for user login
export const loginUser = createAsyncThunk<
  { message: string; token: string; user: User },
  { username: string; password: string },
  { rejectValue: string }
>("user/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await Axios.post(LOGIN_URL, { username, password });

    // If status is not 200, extract error message
    if (response.status !== 200) {
      return rejectWithValue(response.data?.message || "Login failed.");
    }
    console.log(response.data);

    // Save token to local storage
    localStorage.setItem("token", response.data.token);

    return { ...response.data, user: response.data.user }; // Return success message, token, and user
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "An error occurred during login."
    );
  }
});

// Initial State
const initialState: UserState = {
  user: null,
  isSignUpLoading: false,
  isLoginLoading: false,
  signUpError: null,
  loginError: null,
  signUpSuccess: null,
  loginSuccess: null,
};

// User Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isSignUpLoading = false;
      state.isLoginLoading = false;
      state.signUpError = null;
      state.loginError = null;
      state.signUpSuccess = null;
      state.loginSuccess = null;
      localStorage.removeItem("token"); // Clear token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle registration
      .addCase(registerUser.pending, (state) => {
        state.isSignUpLoading = true;
        state.signUpError = null;
        state.signUpSuccess = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isSignUpLoading = false;
        state.user = action.payload;
        state.signUpSuccess = "User registered successfully!";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isSignUpLoading = false;
        state.signUpError = action.payload || "Failed to register user.";
      })

      // Handle login
      .addCase(loginUser.pending, (state) => {
        state.isLoginLoading = true;
        state.loginError = null;
        state.loginSuccess = null;
      })
      .addCase(
        loginUser.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; token: string; user: User }>
        ) => {
          state.isLoginLoading = false;
          state.loginSuccess = action.payload.message;
          state.user = action.payload.user;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoginLoading = false;
        state.loginError = action.payload || "Failed to login.";
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
