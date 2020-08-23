import React from 'react';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useStateValue } from './Components/StateProvider';
import Login from './Components/Login';

function App() {
  const [ { user },  ] = useStateValue();
  return (
    <div className="app">
      {!user ? (
        <Login />
      ):(
        <div className="main">
          <Router>
            <Sidebar />
            <Switch>
              {/* sidebar */}
              <Route exact path="/"></Route>
              {/* chat */}
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
}

export default App;
