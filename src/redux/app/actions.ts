import { AppConstants } from "./types"

/* ------------- Types ------------- */
export interface AppInitializationRequest extends ReturnType<typeof appInitializationRequest> {}
export interface AppInitializationSuccess extends ReturnType<typeof appInitializationSuccess> {}

export type AppAction = AppInitializationRequest | AppInitializationSuccess

/* ------------- Actions ------------- */
export const appInitializationRequest = () => {
  return <const>{ type: AppConstants.APP_INITIALIZATION_REQUEST }
}

export const appInitializationSuccess = () => {
  return <const>{ type: AppConstants.APP_INITIALIZATION_SUCCESS }
}