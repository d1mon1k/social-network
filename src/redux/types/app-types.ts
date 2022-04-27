export enum AppActionTypes {
  INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'
}

export interface SetIsInitialized {
  type: AppActionTypes.INITIALIZED_SUCCESS
}

export type AppAction = SetIsInitialized