import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  token: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const authActions = authSlice.actions;
