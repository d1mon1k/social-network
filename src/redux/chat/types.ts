export enum ChatConstants {
  SET_MESSAGES = 'chat/SET_MESSAGES',
  SET_STATUS= 'chat/SET_STATUS'
}

export interface ChatMessageType {
  message: string,
  photo: string,
  userId: number,
  userName: string
} 

export type StatusType = 'pending' | 'ready' | 'error'