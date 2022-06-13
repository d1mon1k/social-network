import React, { useEffect, useState } from 'react'
import { reduceLine } from '../../../../helpers/helpers'
import cl from './ProfileStatus.module.scss'

/* ------------- Types ------------- */
interface IProfileStatus {
  status: string | null
  authProfileId: number | null | undefined
  currentUserId: number | null
  setStatus: (status: string) => void
}

/* ------------- Component ------------- */
export const ProfileStatus: React.FC<IProfileStatus> = ({
  authProfileId,
  currentUserId,
  ...props
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [status, setStatus] = useState<string | null>(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const toggleEditMode = () => {
    if (authProfileId === currentUserId) {
      setEditMode(!editMode)
    }
    return
  }

  const onStatusChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(e.target.value)
  }

  const onEnterPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      status !== null && props.setStatus(status)
      setEditMode(false)
    }
  }

  return (
    <>
      {!editMode && (
        <div
          onClick={toggleEditMode}
          className={`${cl.status} ${props.status ? '' : cl.statusEmpty}`}
        >
          {reduceLine(props.status, 75) || 'empty'}
        </div>
      )}
      {editMode && (
        <input
          onKeyPress={onEnterPressHandler}
          onChange={onStatusChangeHandler}
          autoFocus={true}
          onBlur={toggleEditMode}
          type="text"
          className={cl.input}
          value={status || ''}
        />
      )}
    </>
  )
}
