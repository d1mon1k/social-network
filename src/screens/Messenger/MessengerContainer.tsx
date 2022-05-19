import { useEffect } from "react";
import { compose } from "redux";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../redux/store";
import { withAuthenticatedRedirect } from "../../components/hoc/withAuthRedirect";
import { RouteType, withRoute } from "../../components/hoc/withRoute";
import { fetchDialogsThunk, fetchMessagesThunk } from '../../redux/messenger/thunks'
import Messenger from "./Messenger";

const MessengerContainerApi: React.FC<MessengerContainerProps> = ({
  dialogs,
  messages,
  fetchDialogsThunk,
  fetchMessagesThunk,
  route,
  authProfileId,
  authProfilePhoto
}) => {
  const userId = parseInt(route.params.userId)

  useEffect(() => {
    fetchDialogsThunk()
  }, [fetchDialogsThunk])

  useEffect(() => {
    fetchMessagesThunk(userId)
  }, [userId])

  return <Messenger authProfilePhoto={authProfilePhoto} authProfileId={authProfileId} messages={messages} dialogs={dialogs} />
}

const mapStateToProps = (state: RootState) => {
  return {
    dialogs: state.messenger.dialogs,
    messages: state.messenger.messages,
    authProfileId: state.auth.user?.data.id,
    authProfilePhoto: state.auth.user?.data.photos?.small
  };
};

const mapDispatchToProps = {
  fetchDialogsThunk,
  fetchMessagesThunk,
}

const connector = connect(mapStateToProps, mapDispatchToProps)
export type MessengerContainer = ConnectedProps<typeof connector>
interface MessengerContainerProps extends MessengerContainer, RouteType {}

export default compose<any>(
  connector,
  withAuthenticatedRedirect,
  withRoute
)(MessengerContainerApi)