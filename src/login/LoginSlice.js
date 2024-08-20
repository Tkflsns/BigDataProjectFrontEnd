import { createSlice } from "@reduxjs/toolkit"

const initState = {
	isAuthenticated: false, // 로그인 상태
  	user: null,
	token: null,
}

const loginSlice = createSlice({
	name: 'login',
	initialState: initState,
	reducers: {
		loginSuccess: (state, action) => {
			console.log("login......");
			state.isAuthenticated = true;
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logoutSuccess: (state) => {
			console.log("logout......");
			state.isAuthenticated = false;
			state.user = null;
			state.token = null;
		}
	}
})

export const {loginSuccess, logoutSuccess} = loginSlice.actions;
export default loginSlice.reducer;