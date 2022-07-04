import ErrorPopUp from "../../common/ErrorPopUp/ErrorPopUp"
import { FieldWithValidation } from "../../common/FieldWithValidation/FieldWithValidation"
import { Status } from "../Status/Status"
import cl from './MainInfo.module.scss'

/* ------------- Types ------------- */
interface MainInfoProps {
  submitError: string | null
  isEdit: boolean
  fullNameUpperCase: string | undefined
  status: string | null
  userId: number | undefined
  authProfileId: number | undefined
  isSetStatusPending: boolean
  setStatus: (status: string) => void
}

/* ------------- Component ------------- */
const MainInfo: React.FC<MainInfoProps> = ({
  authProfileId,
  userId,
  submitError,
  fullNameUpperCase,
  isEdit,
  status,
  isSetStatusPending,
  setStatus,
}) => {
  const FullNameComponent = isEdit ? (
    <FieldWithValidation
      Element={'input'}
      name={'fullName'}
      type={'text'}
      validators={[]}
      defaultValue={fullNameUpperCase}
      className={cl.inputName}
    />
  ) : (<h2 className={cl.name} children={fullNameUpperCase} />)

  return (
    <div className={cl.mainInfo}>
      {<ErrorPopUp titlesArray={[submitError || null]} />}
      {FullNameComponent}
      <Status
        currentUserId={userId}
        authProfileId={authProfileId}
        status={status}
        setStatus={setStatus}
        isSetStatusPending={isSetStatusPending}
      />
    </div>
  )
}

export default MainInfo