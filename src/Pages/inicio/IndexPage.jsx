import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../../Routes/Navegate';
import NavegateBar from '../../Home/NavegateBar';
import FootCopy from '../../Home/Foot';

const HomePage = () => {
    return (
        <div>
            <NavegateBar/>
            <h1>Inicio</h1>
            <p>Bienvenido a la página de inicio.</p>
            <footer>
                <FootCopy/>
            </footer>
        </div>
    );
};

export default HomePage;