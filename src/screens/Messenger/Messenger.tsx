import React, { useEffect, useRef, useState } from 'react'
import cl from './Messenger.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { DialogType, MessageType } from '../../redux/messenger/types'
import { Message } from './Message/Message'
import { convertDateFormat } from '../../helpers/helpers'

interface MessengerProps {
  dialogs: DialogType[]
  messages: MessageType[]
  authProfileId: number | undefined
  authProfilePhoto: string | undefined | null
  interlocutorId: number
  sendMessage: (userId: number, messageBody: string) => void
}

const Messenger: React.FC<MessengerProps> = ({
  dialogs,
  messages,
  authProfileId,
  authProfilePhoto,
  sendMessage,
  interlocutorId,
}) => {
  const currentDialog = [...dialogs].filter(dialog => dialog.id === interlocutorId)[0]
  
  const [newMessage, setNewMessage] = useState('')

  const messagesWrapper = useRef<HTMLDivElement>(null)
  useEffect(() => {
    messagesWrapper.current?.scrollTo(0, 99999)
  }, [messages])

  const handleSending = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if(e.key === 'Enter' && !e.shiftKey) {
      sendMessage(interlocutorId, newMessage)
      setNewMessage('')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage(e.target.value)

  const messagesList = messages.map((message) => {
    const photo = message.senderId === authProfileId ? authProfilePhoto : currentDialog?.photos.small
    return (
      <Message
        photo={photo}
        name={message.senderName}
        key={message.id}
        message={message.body}
        time={convertDateFormat(message.addedAt, true)}
      />
    )
  })

  const dialogsList = dialogs.map((dialog) => (
      <DialogItem
        key={dialog.id}
        dialogItem={dialog}
      />
    )
  )

  return (
    <div className={cl.messenger}>
      <div className={cl.dialogsWrapper}>
        <ul className={cl.dialogs}>{dialogsList}</ul>
      </div>
      <div className={cl.messagesBlock}>
        <div ref={messagesWrapper} className={cl.messagesWrapper}>
          <ul className={cl.messages}>{messagesList}</ul>
        </div>
        <div className={cl.textareaWrapper}>
          <textarea
            onKeyDown={handleSending}
            value={newMessage}
            onChange={handleChange}
            placeholder="Write message"
            className={cl.newMessageField}
          ></textarea>
        </div>
      </div>
    </div>
  )
}

//bug
// interface ReduxFormProps {
//   userId: number | undefined,
//   sendMessage: (userId: number, messageBody: string) => void
// }

// const ReduxForm: React.FC<ReduxFormProps> = ({
//   sendMessage,
//   userId
// }) => {
//   const submitHandler = (values: {newMessage: string}) => {
//     sendMessage(userId!, values.newMessage)
//     values.newMessage = ''
//   }

//   const onPressHandler = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       document.getElementById('form')!.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))
//       e.preventDefault()
//     }
//   }

//   return (
//     <Form
//       onSubmit={submitHandler}
//       render={(props) => {
//         return (
//           <form id="form" onSubmit={props.handleSubmit}>
//             <Field
//               name="newMessage"
//               placeholder="Write a message"
//               className={cl.newMessage}
//               component="textarea"
//               onKeyPress={onPressHandler}
//             />
//           </form>
//         )
//       }}
//     />
//   )
// }

export default Messenger
