import cl from './Chat.module.scss'

import { Field, Form } from "react-final-form"
import { useEffect, useRef } from 'react'

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

const Chat = () => {
  const conversationWrapper = useRef<HTMLDivElement>(null)
  
  // useEffect(() => {
  //   conversationWrapper.current?.scrollTo(0, 99999)
  // }, [dialogsPage.messages])

  useEffect(() => {
    ws.addEventListener('message', (e) => {
      console.log(JSON.parse(e.data))
    })
  })

  return (
    <>
      <div className={cl.dialogBlock}>
        <div ref={conversationWrapper} className={cl.conversationWrapper}>
          <ul className={cl.conversation}></ul>
        </div>
        {/* <ReduxForm setMessages={(props.setMessages)} /> */}
      </div>
    </>
  )
}

const ReduxForm = (props: {setMessages: (message: string) => {}}) => {
  const submitHandler = (values: {newMessage: string}) => {
    // props.setMessages(values.newMessage)
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

export default Chat
