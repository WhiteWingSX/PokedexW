import React from 'react';
import '../../Styles/generalStyle/Style.css'
import Routes from '../../Routes/LinkPages';
import FootCopy from '../../Home/Foot';
import NavegateBar from '../../Home/NavegateBar';


function Main() {
    return (
        <div className="App">
            <NavegateBar/>
            <Routes/>
            <FootCopy/>
        </div>
    );
}

export default Main;
