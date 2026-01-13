import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "../../services/apiClient";
import { setAuthFromLogin } from "./auth.slice";

export const fetchLoginData = createAsyncThunk(
  "auth/fetchLoginData",
  async (payload, { dispatch }) => {
    const response = await postRequest("/loginData", payload);

    if (response?.statusCode === 1) {
      dispatch(setAuthFromLogin(response.data));
    }

    return response;
  }
);
