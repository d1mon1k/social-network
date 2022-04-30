export enum AppActionTypes {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS'
}

export interface SetIsInitialized {
  type: AppActionTypes.INITIALIZED_SUCCESS
}

export type AppAction = SetIsInitialized