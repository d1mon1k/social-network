import Skeleton from 'react-loading-skeleton';
import ErrorPopUp from '../../common/ErrorPopUp/ErrorPopUp';
import { FieldWithValidation } from '../../common/FieldWithValidation/FieldWithValidation';
import { Status } from '../Status/Status';
import cl from './MainInfo.module.scss';

/* ------------- Types ------------- */
interface MainInfoProps {
  submitError: string | null;
  isEdit: boolean;
  fullNameUpperCase: string | undefined;
  status: string | null;
  isProfile: boolean;
  isSetStatusPending: boolean;
  setStatus: (status: string) => void;
}

/* ------------- Component ------------- */
const MainInfo: React.FC<MainInfoProps> = ({
  submitError,
  fullNameUpperCase,
  isEdit,
  isProfile,
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
  ) : (
    <h2 className={cl.name} children={fullNameUpperCase} />
  );

  const FullNamePreloader = <Skeleton height={20} count={0.5} />;

  return (
    <div className={cl.mainInfo}>
      {<ErrorPopUp titlesArray={[submitError || null]} />}
      {!isProfile ? FullNamePreloader : FullNameComponent}
      {!isProfile ? (
        <Skeleton className={cl.statusPreloader} height={14} />
      ) : (
        <Status status={status} setStatus={setStatus} isSetStatusPending={isSetStatusPending} />
      )}
    </div>
  );
};

export default MainInfo;
