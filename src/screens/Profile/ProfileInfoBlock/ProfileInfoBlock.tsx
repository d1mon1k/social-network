import cl from './ProfileInfoBlock.module.scss'
import { makeFirstLetterUppercase } from '../../../helpers/helpers'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import { UserProfile } from '../../../redux/profile/types'
import Preloader from '../../../components/common/Preloader/Preloader'
import { useEffect, useState } from 'react'
import { FieldWithValidation } from '../../../components/common/FieldWithValidation/FieldWithValidation'
import { Form } from 'react-final-form'
import { SetUserRequiredBodyApi } from '../../../api/profile'
import { FormApi } from 'final-form'
import { ErrorPopUp } from '../../../components/common/ErrorPopUp/ErrorPopUp'
 interface ProfileInfoBlockProps {
  profile: UserProfile | undefined
  status: string | null
  authProfileId: number | null | undefined
  isProfileStatusFetching: boolean
  isEdit: boolean
  setUserProfile: (userData: SetUserRequiredBodyApi, errorCallBack: ProfileInfoFormCallBackType) => void
  setStatus: (status: string) => void
}

export type ProfileInfoFormValuesType = SetUserRequiredBodyApi
export type ProfileInfoFormCallBackType = ((errors: Object | undefined) => void) | undefined

const ProfileInfoBlock: React.FC<ProfileInfoBlockProps> = ({
  authProfileId,
  isProfileStatusFetching,
  profile,
  setStatus,
  status,
  isEdit,
  setUserProfile
}) => {
  const [isShowInfo, setIsShowInfo] = useState(false)

  useEffect(() => {
    isEdit && setIsShowInfo(true) 
  }, [isEdit])

  const handleSubmit = async (
    values: ProfileInfoFormValuesType,
    form: FormApi<ProfileInfoFormValuesType>,
    callBack: ProfileInfoFormCallBackType
  ) => await setUserProfile(values, callBack)

  const initialFormValues: ProfileInfoFormValuesType = {
    aboutMe: profile?.aboutMe,
    lookingForAJob: profile?.lookingForAJob,
    lookingForAJobDescription: profile?.lookingForAJobDescription,
    fullName: profile?.fullName,
    contacts: {
      ...profile?.contacts
    }
  }

  const fullNameUpperCase = makeFirstLetterUppercase(profile?.fullName)

  return (
    <section className={cl.infoBlock}>
      <Form
        initialValues={initialFormValues}
        onSubmit={handleSubmit} 
        render={({ handleSubmit, submitError }) => {
          return <form id='myForm' onSubmit={handleSubmit}>
            <div className={cl.mainInfo}>
            {<ErrorPopUp titlesArray={[submitError || null]}/>}
            {isEdit ? 
            (<FieldWithValidation 
              Element={'input'}
              name={'fullName'}
              type={'text'}
              validators={[]}
              defaultValue={fullNameUpperCase}
              className={cl.inputName}
            />) 
            : (<h2 className={cl.name}>{fullNameUpperCase}</h2>)}
            {isProfileStatusFetching ? (
              <Preloader
                position={'absolute'}
                width="23px"
                height="23px"
                margin="4px auto 0px auto"
              />
              ) : (
              <ProfileStatus
                currentUserId={profile ? profile.userId : null}
                authProfileId={authProfileId}
                status={status}
                setStatus={setStatus}
              />
            )}
            </div>
            <DividerBlock />
              <InfoRow 
                keyValue={'Looking for a job:'} 
                value={profile && profile.lookingForAJob} 
                Element={'input'} 
                fieldName={'lookingForAJob'} 
                fieldType={'checkbox'} 
                fieldValidators={[]} 
                isEdit={isEdit} 
                className={cl.checkbox}
              />
            <div onClick={() => setIsShowInfo(isEdit ? true : !isShowInfo)} className={cl.showInfoBtn}>
              {!isShowInfo ? 'Show full information' : 'Hide full information'}
            </div>
            {isShowInfo &&
            <div className={cl.additionalInfo}>
              <DividerBlock dividerName={'Main information'} />
              <InfoRow 
                keyValue={'About me:'} 
                value={profile && profile.aboutMe} 
                Element={'textarea'}
                fieldName={'aboutMe'}
                fieldType={'text'}
                fieldValidators={[]}
                isEdit={isEdit}
                className={cl.textArea}
              />
              <InfoRow 
                keyValue={'My professional skills:'} 
                value={(profile && profile.lookingForAJobDescription)} 
                Element={'textarea'}
                fieldName={'lookingForAJobDescription'}
                fieldType={'text'}
                fieldValidators={[]}
                isEdit={isEdit}
                className={cl.textArea}
              />
              <DividerBlock dividerName={'Contact information'} />
              {profile &&
                Object.entries(profile.contacts).map(([network, value]) => {
                  return <InfoRow 
                    key={network} 
                    keyValue={`${network}:`} 
                    value={value}
                    Element={'input'}
                    fieldName={`contacts.${network}`}
                    fieldType={'text'}
                    fieldValidators={[]}
                    isEdit={isEdit}
                    className={cl.input}
                  />
                })}
            </div>}
          </form>}
        }
      />
        <DividerBlock/>
        <div className={cl.countersRow}>
          <CounterBlock counterName={'friends'} amount={129} />
          <CounterBlock counterName={'followers'} amount={79} />
          <CounterBlock counterName={'gifts'} amount={5} />
          <CounterBlock counterName={'tracks'} amount={13} />
        </div>
    </section>
  )
}

/* ------------- InfoRow component ------------- */
interface InfoRowProps {
  keyValue: string
  value: string | boolean | undefined
  isEdit: boolean
  Element: 'input' | 'textarea'
  fieldName: string
  fieldType: string
  fieldValidators: any[]
  className: string
}

const InfoRow: React.FC<InfoRowProps> = ({
  keyValue,
  value,
  isEdit,
  Element,
  fieldName,
  fieldType,
  fieldValidators,
  className
}) => {

  let _value
  if(typeof value === 'boolean' && value === true) {
    _value = 'Open to work'
  }else if(typeof value === 'boolean' && value === false){
    _value = `I'm not looking for a job`
  }

  return (
    <div className={cl.infoRow}>
      <div className={cl.leftColumn}>{keyValue}</div>
      {isEdit ? (
        <FieldWithValidation
          Element={Element}
          name={fieldName}
          type={fieldType}
          validators={fieldValidators}
          className={className}
        />
      ) : (
        <div className={cl.rightColumn}>{_value || value || 'empty'}</div>
      )}
    </div>
  )
}

/* ------------- DividerBlock component ------------- */
interface DividerNameProps {
  dividerName?: string
}

const DividerBlock: React.FC<DividerNameProps> = ({ dividerName }) => {
  return (
    <div className={cl.dividerBlock}>
      {dividerName && <div className={cl.dividerName}>{dividerName}</div>}
      <div className={cl.divider}></div>
    </div>
  )
}

/* ------------- CounterBlock component ------------- */
interface CounterBlockProps {
  counterName: string
  amount: number
}

const CounterBlock: React.FC<CounterBlockProps> = ({ counterName, amount }) => {
  return (
    <div className={cl.counterBlock}>
      <div className={cl.counter}>{amount}</div>
      <div className={cl.counterName}>{counterName}</div>
    </div>
  )
}

export default ProfileInfoBlock
