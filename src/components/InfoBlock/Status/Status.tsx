import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { reduceLine } from '../../../helpers/helpers';
import Preloader from '../../common/Preloader/Preloader';
import cl from './Status.module.scss';

/* ------------- Types ------------- */
interface StatusProps {
  status: string | null;
  isSetStatusPending: boolean;
  setStatus: (status: string) => void;
}

/* ------------- Component ------------- */
export const Status: React.FC<StatusProps> = ({ isSetStatusPending, status, setStatus }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [statusInput, setStatusInput] = useState<string | null>(status);
  const { userId } = useParams();
  const isAuthenticatedUser = userId === undefined;

  useEffect(() => {
    setStatusInput(status);
  }, [status]);

  const toggleEditMode = () => isAuthenticatedUser && setIsEditMode(!isEditMode);

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => setStatusInput(e.target.value);

  const handlePressButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      statusInput !== null && setStatus(statusInput);
      setIsEditMode(false);
    }
  };

  if (isSetStatusPending) {
    return <Preloader position={'absolute'} width='23px' height='23px' margin='4px auto 0px auto' />;
  }

  return (
    <>
      {!isEditMode && (
        <div
          onClick={toggleEditMode}
          className={`${cl.status} ${isAuthenticatedUser && cl.ownProfile} ${!status && cl.statusEmpty}`}
          children={reduceLine(status, 75) || 'empty'}
        />
      )}
      {isEditMode && (
        <input
          onKeyPress={handlePressButton}
          onChange={handleStatusChange}
          autoFocus={true}
          onBlur={toggleEditMode}
          type='text'
          className={cl.input}
          value={statusInput || ''}
        />
      )}
    </>
  );
};
