import { FormApi } from 'final-form';
import { useEffect, useState } from 'react';
import { Form } from 'react-final-form';
import { SetUserRequiredBodyApi } from '../../api/profile';
import { makeFirstLetterUppercase } from '../../helpers/helpers';
import { UserProfile } from '../../redux/profile/types';
import CountersRow from './CountersRow/CountersRow';
import Divider from './Divider/Divider';
import ExtraInfo from './ExtraInfo/ExtraInfo';
import cl from './InfoBlock.module.scss';
import InfoRow from './InfoRow/InfoRow';
import MainInfo from './MainInfo/MainInfo';

/* ------------- Types ------------- */
interface InfoBlockProps {
  authProfileId: number | undefined;
  profile: UserProfile | undefined;
  friendsAmount: number;
  status: string | null;
  isSetStatusPending: boolean;
  isProfileFetching: boolean;
  isEdit: boolean;
  setUserProfile: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void;
  setStatus: (status: string) => void;
}

type HandleSubmitType = (
  values: ProfileInfoFormValuesType,
  form: FormApi<ProfileInfoFormValuesType>,
  callBack: ProfileInfoFormCallBackType
) => Promise<void>;

export type ProfileInfoFormValuesType = SetUserRequiredBodyApi;
export type ProfileInfoFormCallBackType = ((errors: Object | undefined) => void) | undefined;

/* ------------- Component ------------- */
const InfoBlock: React.FC<InfoBlockProps> = ({
  authProfileId,
  profile,
  friendsAmount,
  status,
  isEdit,
  isSetStatusPending,
  isProfileFetching,
  setUserProfile,
  setStatus,
}) => {
  const [isInfo, setIsInfo] = useState(false);
  const fullNameUpperCase = makeFirstLetterUppercase(profile?.fullName);
  const isProfile = Boolean(!isProfileFetching && profile);
  const initialFormValues: ProfileInfoFormValuesType = {
    aboutMe: profile?.aboutMe,
    lookingForAJob: profile?.lookingForAJob,
    lookingForAJobDescription: profile?.lookingForAJobDescription,
    fullName: profile?.fullName,
    contacts: { ...profile?.contacts },
  };

  useEffect(() => {
    isEdit && setIsInfo(true);
  }, [isEdit, setIsInfo]);

  const handleSubmit: HandleSubmitType = async (values, form, callBack) => await setUserProfile(values, callBack);

  const handleToggleInfoClick = () => setIsInfo(isEdit ? true : !isInfo);

  return (
    <section className={cl.infoBlock}>
      <Form
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        render={({ handleSubmit, submitError }) => (
          <form id='myForm' onSubmit={handleSubmit}>
            <MainInfo
              fullNameUpperCase={fullNameUpperCase}
              isProfile={isProfile}
              status={status}
              isEdit={isEdit}
              isSetStatusPending={isSetStatusPending}
              setStatus={setStatus}
              submitError={submitError}
            />
            <Divider />
            <InfoRow
              isLoading={!isProfile}
              keyValue={'Looking for a job:'}
              value={profile?.lookingForAJob ? 'Open to work' : `I'm not looking for a job`}
              Element={'input'}
              fieldName={'lookingForAJob'}
              fieldType={'checkbox'}
              fieldValidators={[]}
              isEdit={isEdit}
              className={cl.checkbox}
            />
            <div
              onClick={handleToggleInfoClick}
              className={cl.showInfoBtn}
              children={!isInfo ? 'Show full information' : 'Hide full information'}
            />
            <ExtraInfo
              isProfile={isProfile}
              profile={profile}
              isProfileFetching={isProfileFetching}
              isEdit={isEdit}
              isInfo={isInfo}
            />
          </form>
        )}
      />
      <CountersRow friendsAmount={friendsAmount} />
    </section>
  );
};

export default InfoBlock;
