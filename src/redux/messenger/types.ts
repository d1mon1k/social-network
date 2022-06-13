
export enum DialogsConstants {
  FETCH_DIALOGS_REQUEST = 'messenger/FETCH_DIALOGS_REQUEST',
  FETCH_DIALOGS_SUCCESS = 'messenger/FETCH_DIALOGS_SUCCESS',
  FETCH_DIALOGS_FAILURE = 'messenger/FETCH_DIALOGS_FAILURE',

  FETCH_MESSAGES_REQUEST = 'messenger/FETCH_MESSAGES_REQUEST',
  FETCH_MESSAGES_SUCCESS = 'messenger/FETCH_MESSAGES_SUCCESS',
  FETCH_MESSAGES_FAILURE = 'messenger/FETCH_MESSAGES_FAILURE',

  SEND_MESSAGE_REQUEST = 'messenger/SEND_MESSAGE_REQUEST',
  SEND_MESSAGE_SUCCESS = 'messenger/SEND_MESSAGE_SUCCESS',
  SEND_MESSAGE_FAILURE = 'messenger/SEND_MESSAGE_FAILURE',

  CREATE_DIALOG_REQUEST = 'messenger/CREATE_DIALOG_REQUEST',
  CREATE_DIALOG_SUCCESS = 'messenger/CREATE_DIALOG_SUCCESS',
  CREATE_DIALOG_FAILURE = 'messenger/CREATE_DIALOG_FAILURE',

  CLEAR_MESSAGES_STATE = 'messenger/CLEAR_MESSAGES_STATE',
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
  addedAt: string
  senderName: string
  senderId: number
  recipientId?: number
  viewed?: boolean
  translatedBody?: null
  photo?: string
}