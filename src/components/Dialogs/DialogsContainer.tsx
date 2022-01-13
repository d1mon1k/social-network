import { connect, ConnectedProps } from "react-redux";
import { setMessagesActionCreator, setNewMessageActionCreator } from "../../store/action-creators/dialogs-ac";
import { AppDispatch, RootState } from "../../store/store";
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

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PropsFromRedux = ConnectedProps<typeof connector>
const DialogsContainer = connector(Dialogs);

export default DialogsContainer