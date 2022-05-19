
export enum DialogsConstants {
  FETCH_DIALOGS_REQUEST = 'FETCH_DIALOGS_REQUEST',
  FETCH_DIALOGS_SUCCESS = 'FETCH_DIALOGS_SUCCESS',
  FETCH_DIALOGS_FAILURE = 'FETCH_DIALOGS_FAILURE',

  FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST',
  FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS',
  FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE',
}

export interface DialogType {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: {
    small: null | string
    large: null | string
  }
}

export interface MessageType {
  id: string
  body: string
  translatedBody: null
  addedAt: string
  senderId: number
  senderName: string
  recipientId: number
  viewed: boolean
}