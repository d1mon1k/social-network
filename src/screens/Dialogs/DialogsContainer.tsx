import { connect, ConnectedProps } from "react-redux";
import { compose } from "redux";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { setMessages } from "../../redux/dialogs/dialogs-ac";
import { RootState } from "../../redux/store";
import Dialogs from "./Dialogs";

const mapStateToProps = (state: RootState) => {
  return {
    ProfilePhoto: state.profile.profile && state.profile.profile.photos.small,
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = {
  setMessages,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type PropsFromRedux = ConnectedProps<typeof connector>

export default compose<any>(
  connector,
  withAuthenticatedRedirect
)(Dialogs)