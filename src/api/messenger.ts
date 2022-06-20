import axios from 'axios'
import { DialogType, MessageType } from '../redux/messenger/types'
import api from './api'

/* ------------- Types ------------- */
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

export interface CreateDialogApiResponse {
  fieldsError: string[],
  messages: string[],
  resultCode: 0 | 1,
}

/* ------------- Api ------------- */
export const fetchDialogsApi = () => api.get<FetchDialogsApiResponse>('dialogs')

export const fetchMessagesApi = (userId: number) => api.get<FetchMessagesApiResponse>(`dialogs/${userId}/messages?page=1&count=20`)

export const sendMessageApi = (userId: number, messageBody: string) => api.post<SendMessageApiResponse>(`dialogs/${userId}/messages`, {body: messageBody})

export const createDialogApi = (userId: number) => api.put<CreateDialogApiResponse>(`dialogs/${userId}`, {userId}) 



/* -------------  ------------- */
interface getBasesApiResponse {
  records: [
    {
      id: string,
      createdTime: string,
      fields: {
        id: string,
        body: string,
        image: string,
        likes: string
      }
    }
  ]
}

const getBasesApi = () => {
 const data = axios.get<getBasesApiResponse>('https://api.airtable.com/v0/appUhsO5GYI6yhdGh/posts', {
  headers: {
    'Authorization': 'Bearer keyWGxEtchCC8dAmA'
  }
})

let result = data.then(res => res.data.records.map(e => {
  return { id: e.fields.id, body: e.fields.body, image: e.fields.image, likes: e.fields.likes }
})).then(res => console.log(res))

}

getBasesApi()

/* -------------  ------------- */

const data =  {
  "fields": {
    "likes": "10",
    "body": "This is my first post!",
    "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2..."
  }
}

const postBasesApi = () => {
  return axios.post(
    'https://api.airtable.com/v0/appUhsO5GYI6yhdGh/posts',
    data,
    {
      headers: {
        Authorization: 'Bearer keyWGxEtchCC8dAmA',
        'Content-Type': 'application/json',
      },
    }
  )
}
//  postBasesApi()

/* ------------- put ------------- */
const putData = {
  "fields": {
    "id": "1",
    "body": "This is my first post you fucking idiot!",
    "image": "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2...",
    "likes": "4"
  }
}

const putBasesApi = () => {
  return axios.put(
    'https://api.airtable.com/v0/appUhsO5GYI6yhdGh/posts/recSTrvN2xTx8EjfQ',
    putData,
    {
      headers: {
        'Authorization': 'Bearer keyWGxEtchCC8dAmA',
        'Content-Type': 'application/json',
      },
    }
  )
}

putBasesApi()