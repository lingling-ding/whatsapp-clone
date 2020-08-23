import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, ButtonBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MicIcon from '@material-ui/icons/Mic';
import MoodIcon from '@material-ui/icons/Mood';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';

const Chat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [{user},] = useStateValue();
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState('');
  const [avatar, setAvatar] = useState('');
  const sendMessage = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      name: user.displayName,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput('');
  };
  useEffect(()=>{
    if(roomId) {
      db.collection('rooms').doc(roomId).onSnapshot(snapshot=>{
        if(snapshot.data()) {
            setRoomName(snapshot.data().name);
            setAvatar(snapshot.data().avatar);
        }
      })
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(
        snapshot => (setMessages(snapshot.docs.map(doc=>doc.data())))
      )
    }
  },[roomId]);
  return (
    <div className="chat">
      {/* header */}
      <div className="chat-header">
        <div className="chat-header-left">
          <Avatar src={avatar} />
          <div className="chat-info">
            <h5>{roomName}</h5>
            <p>last reading at {messages[messages.length-1]?.timestamp?.toDate().toUTCString()}</p>
          </div>
        </div>
        <div className="chat-header-right">
          <ButtonBase>
            <SearchIcon />
          </ButtonBase>
          <ButtonBase>
            <AttachFileIcon />
          </ButtonBase>
          <ButtonBase>
            <MoreVertIcon />
          </ButtonBase>
        </div>
      </div>
      {/* body */}
      <div className="chat-body">
        {messages.map(message=>(
          <div className={`chat-msg ${message.name===user.displayName && "chat-msg-reciever"}`}>
            <p>{message.name}</p>
            <div className={`chat-content ${message.name===user.displayName && "chat-content-reciever"}`}>
              <p>{message.message}</p>
              <p className="chat-time">{new Date(message.timestamp?.toDate()).toUTCString()}</p>
            </div>
          </div>
        ))}
      </div>
      {/* footer */}
      <div className="chat-footer">
        <ButtonBase>
          <MicIcon />
        </ButtonBase>
        <form>
          <input value={input} onChange={handleChange} type="text" placeholder="text..." />
          <ButtonBase>
            <MoodIcon />
          </ButtonBase>
          <button onClick={sendMessage} className="submit-btn" type="submit">send</button>
        </form>
        <ButtonBase>
          <AddCircleOutlineIcon />
        </ButtonBase>
      </div>
    </div>
  );
};

export default Chat;
