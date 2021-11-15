import React, { useRef } from "react";
import cl from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";

const Dialogs = ({ data }) => {
  const newMessageArea = useRef();

  const sendMessage = () => {
    alert(newMessageArea.current.value);
  };

  const messages = data.messages.map((message) => {
    let isReverse = message.id % 2 === 0 ? true : false; //BUG - ЗАГЛУШККА
    return (
      <Message
        key={message.id}
        message={message.message}
        isReverse={isReverse}
      />
    );
  });

  const dialogs = data.dialogs.map((dialog) => {
    return (
      <DialogItem
        key={dialog.id}
        id={dialog.id}
        name={dialog.name}
      ></DialogItem>
    );
  });

  return (
    <div className={cl.dialogs}>
      <ul className={cl.users}>{dialogs}</ul>
      <div>
        <ul className={cl.conversation}>{messages}</ul>
        <div className={cl.newMessageColumn}>
          <textarea ref={newMessageArea} className={cl.newMessage}></textarea>
          <button onClick={sendMessage} className={cl.sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;
