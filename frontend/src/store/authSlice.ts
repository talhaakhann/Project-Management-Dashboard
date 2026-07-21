import { createSlice } from "@reduxjs/toolkit";
import { User } from "@/Schemas/user.schema";
import { PayloadAction } from "@reduxjs/toolkit";

type AuthSlice = {
  isLoggedIn: boolean;
  user: User | null;
  loading:boolean
};

const initialState: AuthSlice = {
  isLoggedIn: false,
  user: null,
  loading:true
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user=null;
    },
    setLoading(state,action){
      state.loading=action.payload
    },
    updateUserDetails(state,action:PayloadAction<User>){
      state.user=action.payload;
    }
  },
});

export const { login, logout,updateUserDetails,setLoading } = authSlice.actions;

export default authSlice.reducer;
