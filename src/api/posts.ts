import { postsApi } from "./api"

/* ------------- Types ------------- */
interface getPostsApiResponse {
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

/* ------------- Api ------------- */
export const getPostsApi = () => postsApi.get<getPostsApiResponse>('')

export const addPostApi = (body: string, image: string | null) => 
  postsApi.post('', { fields: { body, image, likes: '10' } }, {headers: {'Content-Type': 'application/json'}})

export const setPostApi = (id: string, body: string, image: string | null) => 
   postsApi.put(`${id}`, { fields: { body, image, likes: '4' } }, { headers: { 'Content-Type': 'application/json' } })

export const deletePostApi = (id: string) => postsApi.delete(`${id}`)




// export const getPostsApi = () => {
//   const data = postsApi.get<getPostsApiResponse>('')
 
//  let result = data.then(res => res.data.records.map(e => {
//    return { id: e.id, body: e.fields.body, image: e.fields.image, likes: e.fields.likes }
//  })).then(res => console.log(res))
//  }