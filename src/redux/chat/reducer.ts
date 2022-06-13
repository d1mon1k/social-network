import { MessageType } from "../messenger/types"
import { ChatAction, SetMessages, SetStatus } from "./actions"
import { ChatConstants, ChatMessageType, StatusType } from "./types"

/* ------------- State ------------- */
type ChatStateType = typeof initialState
export interface ChatState extends ChatStateType {}

const initialState = {
  messages: [] as MessageType[],
  requests: {
    fetchChatMessagesStatus: 'pending' as StatusType,
  }
}

/* ------------- Reducers ------------- */
const setMessages = (state: ChatState, action: SetMessages): ChatState => {
  return {
    ...state, 
    messages: [...state.messages, ...action.payload]
  }
}

const setStatus = (state: ChatState, action: SetStatus): ChatState => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchChatMessagesStatus: action.payload
    }
  }
}

const chatReducer = (state = initialState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatConstants.SET_MESSAGES:
      return setMessages(state, action)
    case ChatConstants.SET_STATUS:
      return setStatus(state, action)
    default:
      return state
  }
}

export default chatReducer
