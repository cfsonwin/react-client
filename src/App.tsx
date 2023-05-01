import React from 'react';
import { Outlet, Link } from "react-router-dom";
import './App.css';

function App() {
  // const appList:string[] = ["Counter", "Todo List"]
  return (
    <div className="App">
      <header className="App-header">
        <div className='description'>
          React App with Typescript
        </div>
        <div className='navbar'>
          <Link to={"/applications/Lawi/"} className='nav-item'>Applications</Link>
          <Link to={"/Lawi/todolist/"} className='nav-item'>Todo List</Link>
        </div>
      </header>
      <div className='main-content'>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
