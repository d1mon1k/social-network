import axios from "axios"
import { postsApi } from "./api"

/* ------------- Types ------------- */
interface GetPostsApiResponse {
  records: [
    {
      id: string
      createdTime: string
      fields: {
        id: string
        body: string
        image: string
        likes: string
      }
    }
  ]
}

interface AddPostApiResponse {
  id: string
  createdTime: string
  fields: {
    image: string
    id: string
    likes: number
    body: string
  }
}

interface SetPostApiResponse extends AddPostApiResponse {}

interface DeletePostApiResponse {
  id: string
  deleted: boolean
}

interface ErrorPostsApiResponse {
  error: {
    type: 'AUTHENTICATION_REQUIRED',
    message: 'Authentication required',
  }
} 

/* ------------- Api ------------- */
export const getPostsApi = () => postsApi.get<GetPostsApiResponse | ErrorPostsApiResponse>('')

export const addPostApi = (body: string, image?: string) => (
  postsApi.post<AddPostApiResponse | ErrorPostsApiResponse>
    ('', { fields: { body, image, likes: '10' } }, {headers: {'Content-Type': 'application/json'}})
)

export const setPostApi = (id: string, body: string, image: string | null) => (
   postsApi.put<SetPostApiResponse | ErrorPostsApiResponse>
    (`${id}`, { fields: { body, image, likes: '4' } }, { headers: { 'Content-Type': 'application/json' } })
)

export const deletePostApi = (id: string) => (
  postsApi.delete<DeletePostApiResponse | ErrorPostsApiResponse>(`${id}`)
)

export const postImage = (file: File) => { 
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'NAME-PRESET')
  return axios.post<{url: string}>('https://api.cloudinary.com/v1_1/doebeyofn/image/upload', formData)
}