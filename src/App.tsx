import React from 'react';
import './App.css';
import { AlertProvider } from './components/AlertProvider';
import Main from './components/Main';


function App() {

  return (
    <AlertProvider>
    <div className="App">
      <h1>React App</h1>
      <Main />
    </div>
    </AlertProvider>
  );
}

export default App;
