import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Avatar, ButtonBase } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import EachChat from './EachChat';
import db from '../firebase';
import { useStateValue } from './StateProvider';

const Sidebar = () => {
  const [{user},] = useStateValue();
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    db.collection('rooms').onSnapshot(snapshot =>(
      setRooms(snapshot.docs.map(
        doc => ({
          id: doc.id,
          data: doc.data()
        })
      ))
    ));
  },[]);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-header-left">
          <Avatar src={user?.photoURL} />
        </div>
        <div className="sidebar-header-right">
          <ButtonBase>
            <DonutLargeIcon />
          </ButtonBase>
          <ButtonBase>
            <ChatIcon />
          </ButtonBase>
          <ButtonBase>
            <MoreVertIcon />
          </ButtonBase>
        </div>
      </div>
      <div className="sidebar-search">
        <div>
        <SearchIcon />
        <input placeholder="search..."></input>
        </div>
      </div>
      <div className="sidebar-chats">
        <EachChat addNewChat />
        {rooms.map(room => (
          <EachChat key={room.id} id={room.id} name={room.data.name} avatar={room.data.avatar} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar;
