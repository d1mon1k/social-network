import { AppAction } from './actions';
import { AppConstants } from './types';

/* ------------- State ------------- */
type AppStateType = typeof initialState
export interface AppState extends AppStateType {}

const initialState = {
  isInitialized: false,
}

/* ------------- Reducers ------------- */
const appInitializationSuccess = (state: AppState): AppState => {
  return {
    ...state, isInitialized: true
  }
}

const appReducer = (state = initialState, action: AppAction):AppState  => {
  switch (action.type) {
    case AppConstants.APP_INITIALIZATION_SUCCESS:
      return appInitializationSuccess(state)
    default:
      return state
  }
}

export default appReducer