import React, { useEffect, useRef, useState } from 'react'
import cl from './Messenger.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Field, Form } from 'react-final-form'
import { DialogType, MessageType } from '../../redux/messenger/types'
import { Message } from './Message/Message'
import { convertDateFormat } from '../../helpers/helpers'
import { AuthenticatedUser } from '../../redux/auth/types'

interface MessengerProps {
  dialogs: DialogType[]
  messages: MessageType[]
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  sendMessage: (userId: number, messageBody: string) => void
}

const Messenger: React.FC<MessengerProps> = ({
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto,
  sendMessage
}) => {
  const [interlocutor, setInterlocutor] = useState<null | DialogType>(null)

  const conversationWrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    conversationWrapper.current?.scrollTo(0, 99999)
  }, [messages])

  const messagesList = messages.map((message) => {
    const photo = message.senderId === authProfileId ? authProfilePhoto : interlocutor?.photos.small

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
        key={dialog.id}
        dialogItem={dialog}
        setInterlocutor={setInterlocutor}
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
        <ReduxForm userId={interlocutor?.id} sendMessage={sendMessage} />
      </div>
    </div>
  )
}

interface ReduxFormProps {
  userId: number | undefined,
  sendMessage: (userId: number, messageBody: string) => void
}

const ReduxForm: React.FC<ReduxFormProps> = ({
  sendMessage,
  userId
}) => {
  const submitHandler = (values: {newMessage: string}) => {
    sendMessage(userId!, values.newMessage)
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
