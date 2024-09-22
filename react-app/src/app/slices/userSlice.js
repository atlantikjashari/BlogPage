import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    token: "",
    firstName: "",
    userName: "",
    roli: "",
    email: "",
  },
  reducers: {
    setUser: (state, payload) => {
      state.token = payload.payload.token;
      state.firstName = payload.payload.firstName;
      state.userName = payload.payload.userName;
      state.roli = payload.payload.roli;
      state.email = payload.payload.email;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
