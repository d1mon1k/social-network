export enum ChatConstants {
  SET_MESSAGES = 'chat/SET_MESSAGES'
}

export interface ChatMessageType {
  message: string,
  photo: string,
  userId: number,
  userName: string
} 