import { AppConstants } from "./types"

/* ------------- Types ------------- */
export interface AppInitializationSuccess extends ReturnType<typeof appInitializationSuccess> {}

export type AppAction = AppInitializationSuccess

/* ------------- Actions ------------- */
export const appInitializationSuccess = () => {
  return <const>{ type: AppConstants.APP_INITIALIZATION_SUCCESS }
}