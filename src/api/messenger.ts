import { DialogType, MessageType } from '../redux/messenger/types'
import api from './api'

export type FetchDialogsApiType = DialogType[]
export interface FetchDialogsApiResponse extends FetchDialogsApiType {}

export interface FetchMessagesApiResponse {
  items: MessageType[],
  error: string
}

export interface SendMessageApiResponse {
  data: {
    message: MessageType
  },
  fieldsError: string[],
  messages: string[],
  resultCode: 0 | 1,
}

export const fetchDialogsApi = () => api.get<FetchDialogsApiResponse>('dialogs')

export const fetchMessagesApi = (userId: number) => api.get<FetchMessagesApiResponse>(`dialogs/${userId}/messages?page=1&count=20`)

export const sendMessageApi = (userId: number, messageBody: string) => api.post<SendMessageApiResponse>(`dialogs/${userId}/messages`, {body: messageBody})