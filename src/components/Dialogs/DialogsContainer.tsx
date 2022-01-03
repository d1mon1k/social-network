import { connect } from "react-redux";
import {
  setMessagesActionCreator,
  setNewMessageActionCreator,
} from "../../redux/reducers/dialogs-reducer.ts";
import Dialogs from "./Dialogs";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewMessage: () => {
      dispatch(setMessagesActionCreator());
    },
    setNewMessage: (message) => {
      dispatch(setNewMessageActionCreator(message));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
