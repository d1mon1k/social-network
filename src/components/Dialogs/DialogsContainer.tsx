import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { setMessages, setNewMessage } from "../../store/action-creators/dialogs-ac";
import { RootState } from "../../store/store";
import Dialogs from "./Dialogs";

const mapStateToProps = (state: RootState) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const actionCreators = {
  setMessagesActionCreator: setMessages,
  setNewMessageActionCreator: setNewMessage
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

// const WithAuthRedirectComponent = AuthRedirect(Dialogs)
// const DialogsContainer = connector(WithAuthRedirectComponent);

export default compose<React.ComponentType>(
  connector,
  withAuthRedirect
)(Dialogs)


// const mapDispatchToProps = (dispatch: AppDispatch) => {
//   return {
//     addNewMessage: () => {
//       dispatch(setMessagesActionCreator());
//     },
//     setNewMessage: (message: string) => {
//       dispatch(setNewMessageActionCreator(message));
//     },
//   };
// };