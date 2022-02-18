import {AppRootState} from "../../App/store";

export const selectIsLoggedIn = (state:AppRootState) => state.Login.isLoggedIn