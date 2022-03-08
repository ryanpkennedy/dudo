import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../../Context/SocketProvider';

const Chat = () => {
  const context = useContext(SocketContext);
  // @ts-ignore
  let { socket } = context;
  const [id, setId] = useState<string>('');
  const [msgs, setMsgs] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    socket.on('connect', () => {
      setId(socket.id);
    });

    socket.on('receive-message', (newMsg: any) => {
      let tempMsgs = [...msgs];
      tempMsgs.push(newMsg);
      setMsgs([...tempMsgs]);
    });
  }, []);

  const handleClick = () => {
    socket.emit('custom-event', 155);
  };

  const handleInput = (e: any) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    let tempMsgs = [...msgs];
    tempMsgs.push(input);
    socket.emit('send-message', input);
    setInput('');
  };

  return (
    <div>
      {id}
      <div onClick={() => handleClick()}>Test Event</div>
      <input
        style={{ border: '1px solid black', height: '20px' }}
        value={input}
        onChange={(e) => {
          handleInput(e);
        }}></input>
      <div onClick={() => handleSubmit()}>Submit</div>
      {msgs.map((item) => {
        return <div key={item}>{item}</div>;
      })}
    </div>
  );
};

export default Chat;
