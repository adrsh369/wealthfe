import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,

  authToken: "",
  userId: "",
  customerId: "",

  mobileNo: "",
  isMobile: 0,

  roles: [],
  permissions: [],

  profile: {
    name: "",
    email: ""
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthFromLogin: (state, action) => {
      const data = action.payload;

      state.isAuthenticated = true;
      state.authToken = data.authToken;
      state.userId = data.userId;
      state.customerId = data.customerId;

      state.mobileNo = data.mobileNo;
      state.isMobile = data.isMobile;

      state.roles = data.roles || [];
      state.permissions = data.permissions || [];

      state.profile.name = data.name || "";
      state.profile.email = data.email || "";
    },

    logout: () => initialState
  }
});

export const { setAuthFromLogin, logout } = authSlice.actions;
export default authSlice.reducer;
