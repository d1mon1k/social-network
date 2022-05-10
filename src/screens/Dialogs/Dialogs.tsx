import React, { useEffect, useRef } from 'react'
import cl from './Dialogs.module.scss'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { PropsFromRedux } from './DialogsContainer'
import { Field, Form } from 'react-final-form'

interface Props extends PropsFromRedux {}

const Dialogs: React.FC<Props> = ({dialogsPage, ...props}) => {
  const conversationWrapper = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(conversationWrapper.current?.scrollTo(0, 99999))
  }, [dialogsPage.messages])

  const messages = dialogsPage.messages.map((message) => {
    let isReverse = message.id % 2 === 0 ? true : false //BUG - ЗАГЛУШККА
    return (
      <Message photo={props.ProfilePhoto} key={message.id} message={message.text} isReverse={isReverse} />
    )
  })

  const dialogs = dialogsPage.dialogs.map((dialog) => {
    return (
      <DialogItem
        key={dialog.id}
        id={dialog.id}
        name={dialog.name}
        lastMessage={dialog.lastMessage}
        time={dialog.time}
        counter={dialog.counter}
        photo={props.ProfilePhoto}
      ></DialogItem>
    )
  })

  return (
    <div className={cl.dialogsPage}>
      <div className={cl.dialogsWrapper}>
        <ul className={cl.dialogs}>{dialogs}</ul>
      </div>
      <div className={cl.dialogBlock}>
        <div ref={conversationWrapper} className={cl.conversationWrapper}>
          <ul className={cl.conversation}>{messages}</ul>
        </div>
        <ReduxForm setMessages={props.setMessages} />
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

export default Dialogs
