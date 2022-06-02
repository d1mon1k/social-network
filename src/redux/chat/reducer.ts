import { ChatAction } from "./actions"
import { ChatConstants, ChatMessageType } from "./types"

/* ------------- State ------------- */
type ChatStateType = typeof initialState
export interface ChatState extends ChatStateType {}

const initialState = {
  messages: [] as ChatMessageType[],
}

/* ------------- Reducers ------------- */
const setMessages = (state: ChatState, action: ChatAction): ChatState => {
  return { 
    ...state, 
    messages: [...state.messages, ...action.payload]
  }
}

const chatReducer = (state = initialState, action: ChatAction): ChatState => {
  switch (action.type) {
    case ChatConstants.SET_MESSAGES:
      return setMessages(state, action)
    default:
      return state
  }
}

export default chatReducer
