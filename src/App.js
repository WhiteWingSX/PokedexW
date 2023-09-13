import React from 'react';
import './App.css';
import './Styles/generalStyle/Style.css'
import Routes from './Routes/LinkPages';
import FootCopy from './Home/Foot';

function App() {
  return (
    <div>
        <Routes/>
        <footer>
            <FootCopy/>
        </footer>
    </div>
  );
}

export default App;
