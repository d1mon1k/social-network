import { connect } from "react-redux";
import { setMessagesActionCreator, setNewMessageActionCreator } from "../../redux/reducers/dialogs-reducer";
import { AppDispatch, RootState } from "../../redux/store";
import Dialogs from "./Dialogs";

const mapStateToProps = (state: RootState) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    addNewMessage: () => {
      dispatch(setMessagesActionCreator());
    },
    setNewMessage: (message: string) => {
      dispatch(setNewMessageActionCreator(message));
    },
  };
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
