// src/features/user/userSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id?: string;
  email?: string;
  role?: 'Admin' | 'Student' | 'ElectionOfficer';
}

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, clearUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;