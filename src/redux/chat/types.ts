export enum ChatConstants {
  SET_MESSAGES = 'chat/SET_MESSAGES',
  SET_STATUS = 'chat/SET_STATUS',
  CLEAR_MESSAGES_STATE = 'chat/CLEAR_MESSAGES_STATE',
}

export interface ChatMessageType {
  message: string,
  photo: string,
  userId: number,
  userName: string
} 

export type StatusType = 'pending' | 'ready' | 'error'