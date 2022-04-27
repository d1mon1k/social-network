import { connect, ConnectedProps } from 'react-redux'
import { setNewPost, setPosts } from '../../../redux/action-creators/profile-ac'
import { RootState } from '../../../redux/store'
import MyPosts from './MyPosts'

const mapStateToProps = (state: RootState) => {
  return { profilePage: state.profilePage }
}

const actionCreators = {
  setNewPostActionCreator: setNewPost,
  setPostsActionCreator: setPosts
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>
const MyPostsContainer = connector(MyPosts)

export default MyPostsContainer

//note MapStateToProps (Сопоставить state с props) - определяет будет ли связанный компонент ререндерится

// const mapDispatchToProps = (dispatch: AppDispatch) => {
  //   return {
    //     onPostChange: (message: string) => {
      //       dispatch(setNewPostActionCreator(message))
      //     },
//     addPost: () => {
//       dispatch(setPostsActionCreator())
//     },
//   }
// } 
