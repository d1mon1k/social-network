import {
  DialogsAction,
  FetchDialogsFailure,
  FetchDialogsSuccess,
  FetchMessagesFailure,
  FetchMessagesSuccess,
} from './actions'
import { DialogsConstants, DialogType, MessageType } from './types'

/* ------------- Types ------------- */
type MessengerStateType = typeof initialState
interface MessengerState extends MessengerStateType {}

const initialState = {
  dialogs: [] as DialogType[] | [],
  messages: [] as MessageType[] | [],
  requests: {
    fetchDialogsPending: false,
    fetchDialogsError: null as string | null,
    fetchMessagesPending: false,
    fetchMessagesError: null as string | null,
  },
}

/* ------------- Reducers ------------- */
const fetchDialogsRequest = (state: MessengerState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchDialogsPending: true,
      fetchDialogsError: null,
    },
  }
}

const fetchDialogsSuccess = ( state: MessengerState, action: FetchDialogsSuccess ) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchDialogsPending: false,
    },
    dialogs: action.payload,
  }
}

const fetchDialogsFailure = ( state: MessengerState, action: FetchDialogsFailure ) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchDialogsPending: false,
      fetchDialogsError: action.payload,
    },
  }
}

const fetchMessagesRequest = (state: MessengerState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchMessagesPending: true,
      fetchMessagesError: null,
    },
  }
}

const fetchMessagesSuccess = ( state: MessengerState, action: FetchMessagesSuccess ) => {
  return {
    ...state,
    messages: action.payload,
    requests: {
      ...state.requests,
      fetchMessagesPending: false,
    },
  }
}

const fetchMessagesFailure = ( state: MessengerState, action: FetchMessagesFailure ) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchMessagesPending: false,
      fetchMessagesError: action.payload,
    },
  }
}

const messengerReducer = ( state = initialState, action: DialogsAction ): MessengerState => {
  switch (action.type) {
    case DialogsConstants.FETCH_DIALOGS_REQUEST:
      return fetchDialogsRequest(state)
    case DialogsConstants.FETCH_DIALOGS_SUCCESS:
      return fetchDialogsSuccess(state, action)
    case DialogsConstants.FETCH_DIALOGS_FAILURE:
      return fetchDialogsFailure(state, action)
    case DialogsConstants.FETCH_MESSAGES_REQUEST:
      return fetchMessagesRequest(state)
    case DialogsConstants.FETCH_MESSAGES_SUCCESS:
      return fetchMessagesSuccess(state, action)
    case DialogsConstants.FETCH_MESSAGES_FAILURE:
      return fetchMessagesFailure(state, action)
    default:
      return state
  }
}

export default messengerReducer
