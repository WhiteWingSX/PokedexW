import React from 'react';
import NavegateBar from '../../Home/NavegateBar';
import FootCopy from '../../Home/Foot';

const EndPage = () => {
    return (
        <div>
            <NavegateBar/>
            <h1>Copyright</h1>
            <p>This is a simple Pokémon application built with React.</p>
            <p>Explore the world of Pokémon!</p>
            <footer>
                <FootCopy/>
            </footer>
        </div>
    );
};

export default EndPage;