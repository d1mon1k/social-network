import React, { useEffect, useState } from 'react'
import { reduceLine } from '../../../helpers/helpers'
import Preloader from '../../common/Preloader/Preloader'
import cl from './Status.module.scss'

/* ------------- Types ------------- */
interface StatusProps {
  authProfileId: number | undefined
  currentUserId: number | undefined
  status: string | null
  isSetStatusPending: boolean
  setStatus: (status: string) => void
}

/* ------------- Component ------------- */
export const Status: React.FC<StatusProps> = ({
  authProfileId,
  currentUserId,
  isSetStatusPending,
  status,
  setStatus
}) => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [statusInput, setStatusInput] = useState<string | null>(status)

  useEffect(() => {
    setStatusInput(status)
  }, [status])

  const toggleEditMode = () => (authProfileId === currentUserId) && setIsEditMode(!isEditMode)

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => setStatusInput(e.target.value)

  const handlePressButton = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      statusInput !== null && setStatus(statusInput)
      setIsEditMode(false)
    }
  }

  if(isSetStatusPending) {
    return <Preloader
        position={'absolute'}
        width="23px"
        height="23px"
        margin="4px auto 0px auto"
      />
  }

  return (
    <>
      {!isEditMode && (
        <div
          onClick={toggleEditMode}
          className={`${cl.status} ${status ? '' : cl.statusEmpty}`}
          children={reduceLine(status, 75) || 'empty'}
        />
      )}
      {isEditMode && (
        <input
          onKeyPress={handlePressButton}
          onChange={handleStatusChange}
          autoFocus={true}
          onBlur={toggleEditMode}
          type="text"
          className={cl.input}
          value={statusInput || ''}
        />
      )}
    </>
  )
}
