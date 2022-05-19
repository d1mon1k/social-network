import React, { useEffect, useRef, useState } from 'react'
import cl from './Messenger.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Field, Form } from 'react-final-form'
import { DialogType, MessageType } from '../../redux/messenger/types'
import { Message } from './Message/Message'
import { convertDateFormat } from '../../helpers/helpers'
import { AuthenticatedUser } from '../../redux/auth/types'

interface MessengerProps {
  dialogs: DialogType[],
  messages: MessageType[],
  authProfileId: number | undefined,
  authProfilePhoto: string | undefined | null,
}

const Messenger: React.FC<MessengerProps> = ({
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto
}) => {
  const [interlocutorPhoto, setInterlocutorPhoto] = useState<null | string>(null)

  const conversationWrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    conversationWrapper.current?.scrollTo(0, 99999)
  }, [messages])

  const messagesList = messages.map((message) => {
    const photo = message.senderId === authProfileId ? authProfilePhoto : interlocutorPhoto

    return (
      <Message
        photo={photo}
        name={message.senderName}
        key={message.id}
        message={message.body}
        time={convertDateFormat(message.addedAt)}
      />
    )
  })

  const dialogsList = dialogs.map((dialog) => (
      <DialogItem
        setInterlocutorPhoto={setInterlocutorPhoto}
        key={dialog.id}
        id={dialog.id}
        userName={dialog.userName}
        lastDialogActivity={dialog.lastDialogActivityDate}
        newMessagesCounter={dialog.newMessagesCount}
        photo={dialog.photos.small}
        // lastMessage={dialog.lastMessage}
      />
    )
  )

  return (
    <div className={cl.dialogsPage}>
      <div className={cl.dialogsWrapper}>
        <ul className={cl.dialogs}>{dialogsList}</ul>
      </div>
      <div className={cl.dialogBlock}>
        <div ref={conversationWrapper} className={cl.conversationWrapper}>
          <ul className={cl.conversation}>{messagesList}</ul>
        </div>
        {/* <ReduxForm setMessages={props.setMessages} /> */}
      </div>
    </div>
  )
}

const ReduxForm = (props: {setMessages: (message: string) => {}}) => {
  const submitHandler = (values: {newMessage: string}) => {
    props.setMessages(values.newMessage)
    values.newMessage = ''
  }

  const onPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      document.getElementById('form')!.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
      e.preventDefault()
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      render={(props) => {
        return (
          <form id="form" onSubmit={props.handleSubmit}>
            <Field
              name="newMessage"
              placeholder="Write a message (reduxForm)"
              className={cl.newMessage}
              component="textarea"
              onKeyPress={onPressHandler}
            />
          </form>
        )
      }}
    />
  )
}

export default Messenger
