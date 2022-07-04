import { UserProfile } from "../../../redux/profile/types"
import Divider from "../Divider/Divider"
import InfoRow from "../InfoRow/InfoRow"
import cl from './ExtraInfo.module.scss'

/* ------------- Types ------------- */
interface ExtraInfoProps {
  isInfo: boolean
  isEdit: boolean
  profile: UserProfile | undefined
}

/* ------------- Component ------------- */
const ExtraInfo: React.FC<ExtraInfoProps> = ({ isEdit, isInfo, profile }) => {
  return (
    <>
      {isInfo && (
        <div className={cl.additionalInfo}>
          <Divider dividerName={'Main information'} />
          <InfoRow
            keyValue={'About me:'}
            value={profile?.aboutMe}
            Element={'textarea'}
            fieldName={'aboutMe'}
            fieldType={'text'}
            fieldValidators={[]}
            isEdit={isEdit}
            className={cl.textArea}
          />
          <InfoRow
            keyValue={'My professional skills:'}
            value={profile?.lookingForAJobDescription}
            Element={'textarea'}
            fieldName={'lookingForAJobDescription'}
            fieldType={'text'}
            fieldValidators={[]}
            isEdit={isEdit}
            className={cl.textArea}
          />
          <Divider dividerName={'Contact information'} />
          {Object.entries(profile?.contacts || {}).map(([network, value]) => (
            <InfoRow
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
          ))}
        </div>
      )}
    </>
  )
}

export default ExtraInfo