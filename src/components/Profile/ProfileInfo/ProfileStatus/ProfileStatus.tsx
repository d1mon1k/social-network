import React, { useEffect, useState } from 'react'
import cl from './ProfileStatus.module.scss'

interface IProfileStatus {
  status: string | null
  setStatus: (status: string) => void
  authProfileId: number | null
  curUserId: number | null
}

export const ProfileStatus: React.FC<IProfileStatus> = (props) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [status, setStatus] = useState<string | null>(props.status)

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const toggleEditMode = () => {
    if (props.authProfileId === props.curUserId) {
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
        <p
          onClick={toggleEditMode}
          className={`${cl.status} ${props.status ? '' : cl.statusEmpty}`}
        >
          {props.status || '--empty--'}
        </p>
      )}
      {editMode && (
        <input
          onKeyPress={onEnterPressHandler}
          onChange={onStatusChangeHandler}
          autoFocus={true}
          onBlur={toggleEditMode}
          type="text"
          className={cl.status}
          value={status || ''}
        />
      )}
    </>
  )
}
