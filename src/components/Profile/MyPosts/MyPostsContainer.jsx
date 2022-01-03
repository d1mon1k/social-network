import { connect } from 'react-redux'
import {
  setNewPostActionCreator,
  setPostsActionCreator,
} from '../../../redux/reducers/profile-reducer'

import MyPosts from './MyPosts'

const mapStateToProps = (state) => {
  //note Данная функция определяет будет ли связанный компонент ререндерится
  //note Сопоставить state с props
  return {
    profilePage: state.profilePage,
  }
}

const mapDispatchToProps = (dispatch) => {
  //note this is react-redux library.
  return {
    onPostChange: (message) => {
      dispatch(setNewPostActionCreator(message))
    },
    addPost: () => {
      dispatch(setPostsActionCreator())
    },
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer
