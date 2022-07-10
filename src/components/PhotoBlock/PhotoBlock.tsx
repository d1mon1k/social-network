import React, { Dispatch, SetStateAction, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import photoPlaceholder from '../../assets/images/jpeg/no-photo.jpg';
import { ArrowUpSvg, CrossSvg } from '../../helpers/icons/icons';
import { UserProfile } from '../../redux/profile/types';
import MyButton from '../common/MyButton/MyButton';
import SendMessagePopUp from '../SendMessagePopUp/SendMessagePopUp';
import cl from './PhotoBlock.module.scss';

/* ------------- Types ------------- */
interface PhotoBlockProps {
  profile: UserProfile | undefined;
  authUserId: number | undefined;
  isPhotoSending: boolean;
  isSubscribePending: boolean;
  isProfileFetching: boolean;
  isEdit: boolean;
  setIsEdit: Dispatch<SetStateAction<boolean>>;
  toggleSubscribe: (userId: number, followed: boolean) => void;
  setProfilePhoto: (file: File) => void;
  sendMessage: (userId: number, messageBody: string) => void;
  createDialog: (userId: number) => void;
}

/* ------------- Component ------------- */
const PhotoBlock: React.FC<PhotoBlockProps> = ({
  isPhotoSending,
  isSubscribePending,
  isProfileFetching,
  profile,
  authUserId,
  setProfilePhoto,
  isEdit,
  setIsEdit,
  toggleSubscribe,
  sendMessage,
  createDialog,
}) => {
  const [isPopUp, setIsPopUp] = useState(false);
  const isAuthenticatedUser = authUserId === profile?.userId;
  const isProfile = !isProfileFetching && profile;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => setProfilePhoto(e.target.files![0]);

  const handleWriteMessageClick = () => setIsPopUp(true);

  const handleSaveChanges = () => {
    if (isEdit) {
      document.getElementById('myForm')!.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
    setIsEdit((prev) => !prev);
  };

  const ProfileImgComponent =
    isPhotoSending || !isProfile ? (
      <Skeleton className={cl.imgPreloader} />
    ) : (
      <img className={cl.photo} src={profile?.photos.large || photoPlaceholder} alt='' />
    );

  const ProfileInterfaceComponent = isAuthenticatedUser ? (
    <MyButton className={cl.btn} callBack={handleSaveChanges}>
      {isEdit ? 'Save' : 'Edit'}
    </MyButton>
  ) : (
    <>
      <MyButton callBack={handleWriteMessageClick}>Write message</MyButton>
      <MyButton
        disabled={isSubscribePending}
        callBack={() => {
          toggleSubscribe(profile!.userId, profile!.followed);
        }}
        children={profile?.followed ? 'Unfollow' : 'Follow'}
      />
    </>
  );

  const ProfileInterfacePreloader = <Skeleton className={cl.btnPreloader} count={2} inline height={30} />;

  return (
    <>
      <SendMessagePopUp
        createDialog={createDialog}
        sendMessage={sendMessage}
        interlocutorId={profile?.userId}
        interlocutorName={profile?.fullName}
        interlocutorPhoto={profile?.photos.small}
        isPopUp={isPopUp}
        setIsPopUp={setIsPopUp}
      />
      <div className={cl.photoBlockWrapper}>
        <div className={cl.photoBlock}>
          <div className={cl.photoContainer}>
            {ProfileImgComponent}
            {isProfile && (
              <>
                <div className={`${cl.deletingPhotoBtn} ${isEdit && cl.hover}`}>
                  <CrossSvg />
                </div>
                <div className={`${cl.updatingPhotoBlock} ${isEdit && cl.hover}`}>
                  <label htmlFor='file-upload'>
                    <ArrowUpSvg className={cl.updatePhotoSvg} />
                    <span>Update photo</span>
                  </label>
                  <input id='file-upload' onChange={handleFileUpload} type='file' />
                </div>
              </>
            )}
          </div>
          {isProfile ? ProfileInterfaceComponent : ProfileInterfacePreloader}
        </div>
      </div>
    </>
  );
};

export default PhotoBlock;
