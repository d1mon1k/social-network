import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { setMessages } from "../../redux/dialogs/dialogs-ac";
import { RootState } from "../../redux/store";
import Dialogs from "./Dialogs";

const mapStateToProps = (state: RootState) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const actionCreators = {
  setMessages,
}

const connector = connect(mapStateToProps, actionCreators)
export type PropsFromRedux = ConnectedProps<typeof connector>

// const WithAuthRedirectComponent = AuthRedirect(Dialogs)
// const DialogsContainer = connector(WithAuthRedirectComponent);

export default compose<any>(
  connector,
  withAuthenticatedRedirect
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