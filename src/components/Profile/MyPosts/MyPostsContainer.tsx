import { connect, ConnectedProps } from 'react-redux'
import {
  setNewPostActionCreator,
  setPostsActionCreator,
} from '../../../redux/reducers/profile-reducer'
import { AppDispatch, RootState } from '../../../redux/store'
import MyPosts from './MyPosts'

const mapStateToProps = (state: RootState) => {
  //note Данная функция определяет будет ли связанный компонент ререндерится
  //note Сопоставить state с props
  return {
    profilePage: state.profilePage,
  }
}

const mapDispatchToProps = (dispatch: AppDispatch) => {
  //note this is react-redux library.
  return {
    onPostChange: (message: string) => {
      dispatch(setNewPostActionCreator(message))
    },
    addPost: () => {
      dispatch(setPostsActionCreator())
    },
  }
} 

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PropsFromRedux = ConnectedProps<typeof connector>
const MyPostsContainer = connector(MyPosts)

export default MyPostsContainer
