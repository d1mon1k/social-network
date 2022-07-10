import { connect, ConnectedProps } from 'react-redux';
import { compose } from 'redux';
import { RootState } from '../../redux/store';
import { IUser } from '../../redux/users/types';
import FriendsBlock from './FriendsBlock';

/* ------------- Types ------------- */
interface FriendsBlockContainerProps extends FriendsBlockContainerReduxProps {
  friendsAmount: number;
  friendsList: IUser[];
}

/* ------------- Component ------------- */
const FriendsBlockContainer: React.FC<FriendsBlockContainerProps> = ({
  friendsAmount,
  friendsList,
  isFriendsFetching,
}) => {
  return <FriendsBlock isFriendsFetching={isFriendsFetching} friendsAmount={friendsAmount} friendsList={friendsList} />;
};

/* ------------- Container ------------- */
const mapStateToProps = (state: RootState) => {
  return {
    friendsAmount: state.users.users.friends.totalItemsCount,
    isFriendsFetching: state.users.requests.fetchUsersPending,
  };
};

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type FriendsBlockContainerReduxProps = ConnectedProps<typeof connector>;

export default compose<any>(connector)(FriendsBlockContainer);
