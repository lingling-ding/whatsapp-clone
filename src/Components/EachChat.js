import React, { useEffect, useState } from 'react';
import './EachChat.css';
import { Avatar } from '@material-ui/core';
import db from '../firebase';
import { Link } from 'react-router-dom';

const EachChat = ({ id, name, avatar, addNewChat }) => {
  const [ messages, setMessages ] = useState([]);
  const createChat = () => {
    const roomName = prompt('Please enter name for chat!');
    if(roomName) {
      db.collection('rooms').add({
        name: roomName,
        avatar: `https://avatars.dicebear.com/api/human/${roomName}.svg`,
      });
    };
  };
  const deleteChat = () => {
    db.collection('rooms').doc(id).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  
  };
  useEffect(()=>{
    if(id){
      db.collection('rooms').doc(id).collection('messages')
      .orderBy("timestamp", 'desc')
      .onSnapshot(snapshot=>(setMessages(snapshot.docs.map(doc=>doc.data()))))
    }
  },[]);
  return !addNewChat? (
    <div className="each-chat-container">
      <div>
        <Link to={`/rooms/${id}`}>
          <div  className="each-chat">
            <div className="each-chat-left">
              <Avatar src={avatar} />
            </div>
            <div className="each-chat-right">
              <h5>{name}</h5>
              <p>{messages[0]?.message}</p>
            </div>
          </div>
        </Link>
      </div>
      <Link to='/'>
        <div className="delete-btn">
          <p onClick={deleteChat}>X</p>
        </div>
      </Link>
    </div>
  ): (
    <div onClick={createChat} className="each-chat-container">
      <h5>Add New Chat</h5>
    </div>
  );
};

export default EachChat;
