import {AppRootState} from "./store";

export const selectStatus = (state:AppRootState) => state.App.status
export const selectInitialized = (state:AppRootState) => state.App.isInitialized