import { DialogType, MessageType } from '../redux/messenger/types'
import api from './api'

export type FetchDialogsApiType = DialogType[]
export interface FetchDialogsApiResponse extends FetchDialogsApiType {}

export interface FetchMessagesApiResponse {
  items: MessageType[],
  error: string
}

export const fetchDialogsApi = () => api.get<FetchDialogsApiResponse>('dialogs')

export const fetchMessagesApi = (userId: number) => api.get<FetchMessagesApiResponse>(`dialogs/${userId}/messages?page=1&count=20`)