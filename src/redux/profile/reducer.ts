import {
  FetchProfileFailure,
  FetchProfilePostsFailure,
  FetchProfilePostsSuccess,
  FetchProfileSuccess,
  ProfileAction,
  SetProfileFailure,
  SetProfilePhotoSuccess,
  SetProfileStatusFailure,
  SetProfileStatusSuccess,
  ToggleFollowOnProfileFailure,
} from './actions';
import { ProfileConstants, UserProfile } from './types';

/* ------------- State ------------- */
type ProfileStateType = typeof initialState;
export interface ProfileState extends ProfileStateType {}

const initialState = {
  profile: undefined as UserProfile | undefined,
  status: null as string | null,
  requests: {
    setProfileStatusPending: false,
    setProfileStatusError: null as string | null,
    setProfilePostsPending: false,
    setProfilePostsError: null as string | null,
    fetchProfilePending: false,
    fetchProfileError: null as string | null,
    setProfilePhotoPending: false,
    setProfilePhotoError: null as string | null,
    setProfilePending: false,
    setProfileError: null as string | null,
    toggleFollowOnProfileError: null as string | null,
    toggleFollowOnProfilePending: false,
  },
};

/* ------------- Reducers ------------- */
const clearProfileState = (state: ProfileState) => {
  return {
    ...state,
    profile: undefined,
    status: null,
  };
};

const fetchProfilePostsRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: { ...state.requests, setProfilePostsPending: true },
  };
};

const fetchProfilePostsSuccess = (state: ProfileState, action: FetchProfilePostsSuccess) => {
  return {
    ...state,
    requests: { ...state.requests, setProfilePostsPending: false },
    posts: [...action.payload],
  };
};

const fetchProfilePostsFailure = (state: ProfileState, action: FetchProfilePostsFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePostsPending: false,
      setProfilePostsError: action.payload,
    },
  };
};

const fetchProfileRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchProfilePending: true,
      fetchProfileError: null,
      setProfileStatusError: null,
      setProfilePostsError: null,
      setProfilePhotoError: null,
      setProfileError: null,
    },
  };
};

const fetchProfileSuccess = (state: ProfileState, action: FetchProfileSuccess) => {
  return {
    ...state,
    requests: { ...state.requests, fetchProfilePending: false },
    profile: { ...state.profile, ...action.payload },
  };
};

const fetchProfileFailure = (state: ProfileState, action: FetchProfileFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      fetchProfilePending: false,
      fetchProfileError: action.payload,
    },
  };
};

const setProfileStatusRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: { ...state.requests, setProfileStatusPending: true, setProfileStatusError: null },
  };
};

const setProfileStatusSuccess = (state: ProfileState, action: SetProfileStatusSuccess) => {
  return {
    ...state,
    requests: { ...state.requests, setProfileStatusPending: false },
    status: action.payload,
  };
};

const setProfileStatusFailure = (state: ProfileState, action: SetProfileStatusFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfileStatusPending: false,
      setProfileStatusError: action.payload,
    },
  };
};

const setProfilePhotoRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePhotoPending: true,
      setProfilePhotoError: null,
    },
  };
};

const setProfilePhotoSuccess = (state: ProfileState, action: SetProfilePhotoSuccess) => {
  return {
    ...state,
    profile: {
      ...state.profile!,
      photos: {
        ...state.profile!.photos,
        ...action.payload,
      },
    },
    requests: {
      ...state.requests,
      setProfilePhotoPending: false,
    },
  };
};

const setProfilePhotoFailure = (state: ProfileState, error: string) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePhotoPending: false,
      setProfilePhotoError: error,
    },
  };
};

const setProfileRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePending: true,
      setProfileError: null,
    },
  };
};

const setProfileSuccess = (state: ProfileState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePending: false,
    },
  };
};

const setProfileFailure = (state: ProfileState, action: SetProfileFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      setProfilePending: false,
      setProfileError: action.payload,
    },
  };
};

const toggleFollowOnProfileRequest = (state: ProfileState) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnProfileError: null,
      toggleFollowOnProfilePending: true,
    },
  };
};

const toggleFollowOnProfileSuccess = (state: ProfileState) => {
  return {
    ...state,
    profile: state.profile ? { ...state.profile, followed: !state.profile.followed } : undefined,
    requests: {
      ...state.requests,
      toggleFollowOnProfilePending: false,
    },
  };
};

const toggleFollowOnProfileFailure = (state: ProfileState, action: ToggleFollowOnProfileFailure) => {
  return {
    ...state,
    requests: {
      ...state.requests,
      toggleFollowOnProfilePending: false,
      toggleFollowOnProfileError: action.payload,
    },
  };
};

export const profileReducer = (state = initialState, action: ProfileAction): ProfileState => {
  switch (action.type) {
    case ProfileConstants.FETCH_PROFILE_POSTS_REQUEST:
      return fetchProfilePostsRequest(state);
    case ProfileConstants.FETCH_PROFILE_POSTS_SUCCESS:
      return fetchProfilePostsSuccess(state, action);
    case ProfileConstants.FETCH_PROFILE_POSTS_FAILURE:
      return fetchProfilePostsFailure(state, action);
    case ProfileConstants.FETCH_PROFILE_REQUEST:
      return fetchProfileRequest(state);
    case ProfileConstants.FETCH_PROFILE_SUCCESS:
      return fetchProfileSuccess(state, action);
    case ProfileConstants.FETCH_PROFILE_FAILURE:
      return fetchProfileFailure(state, action);
    case ProfileConstants.SET_PROFILE_STATUS_REQUEST:
      return setProfileStatusRequest(state);
    case ProfileConstants.SET_PROFILE_STATUS_SUCCESS:
      return setProfileStatusSuccess(state, action);
    case ProfileConstants.SET_PROFILE_STATUS_FAILURE:
      return setProfileStatusFailure(state, action);
    case ProfileConstants.SET_PROFILE_PHOTO_REQUEST:
      return setProfilePhotoRequest(state);
    case ProfileConstants.SET_PROFILE_PHOTO_SUCCESS:
      return setProfilePhotoSuccess(state, action);
    case ProfileConstants.SET_PROFILE_PHOTO_FAILURE:
      return setProfilePhotoFailure(state, action.payload);
    case ProfileConstants.SET_PROFILE_REQUEST:
      return setProfileRequest(state);
    case ProfileConstants.SET_PROFILE_SUCCESS:
      return setProfileSuccess(state);
    case ProfileConstants.SET_PROFILE_FAILURE:
      return setProfileFailure(state, action);
    case ProfileConstants.TOGGLE_FOLLOW_ON_PROFILE_REQUEST:
      return toggleFollowOnProfileRequest(state);
    case ProfileConstants.TOGGLE_FOLLOW_ON_PROFILE_SUCCESS:
      return toggleFollowOnProfileSuccess(state);
    case ProfileConstants.TOGGLE_FOLLOW_ON_PROFILE_FAILURE:
      return toggleFollowOnProfileFailure(state, action);
    case ProfileConstants.CLEAR_PROFILE_STATE:
      return clearProfileState(state);
    default:
      return state;
  }
};

export default profileReducer;
