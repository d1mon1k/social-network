import React, { useRef } from "react";
import cl from "./Dialogs.module.scss";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { PropsFromRedux } from "../Dialogs/DialogsContainer";

interface Props extends PropsFromRedux {}

const Dialogs: React.FC<Props> = (props) => {
  const newMessageArea = useRef<HTMLTextAreaElement>(null);

  const addNewMessage = () => {
    props.setMessagesActionCreator();
  };

  const onChangeMessageHandler = () => {
    const message = newMessageArea.current!.value;
    props.setNewMessageActionCreator(message);
  };

  const onPressHandler = (e: React.KeyboardEvent) => {
   if (e.key === 'Enter') {
     addNewMessage()
     e.preventDefault()
   }    
  }

  const messages = props.dialogsPage.messages.map((message) => {
    let isReverse = message.id % 2 === 0 ? true : false; //BUG - ЗАГЛУШККА
    return (
      <Message
        key={message.id}
        message={message.text}
        isReverse={isReverse}
      />
    );
  });

  const dialogs = props.dialogsPage.dialogs.map((dialog) => {
    return (
      <DialogItem
        key={dialog.id}
        id={dialog.id}
        name={dialog.name}
        lastMessage={dialog.lastMessage}
        time={dialog.time}
        counter={dialog.counter}
      ></DialogItem>
    );
  });

  return (
    <div className={cl.dialogsPage}>
      <div className={cl.dialogsWrapper}>
        <ul className={cl.dialogs}>{dialogs}</ul>
      </div>
      <div className={cl.dialogBlock}>
        <div className={cl.conversationWrapper}>
          <ul className={cl.conversation}>{messages}</ul>
        </div>
          <textarea
            placeholder="Write a message"
            onKeyPress={onPressHandler}
            onChange={onChangeMessageHandler}
            ref={newMessageArea}
            value={props.dialogsPage.newMessage}
            className={cl.newMessage}
          ></textarea>
      </div>
    </div>
  );
};

export default Dialogs;
