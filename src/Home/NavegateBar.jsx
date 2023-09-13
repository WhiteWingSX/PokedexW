import React from 'react';
import Navigation from '../Routes/Navegate';
import styled from 'styled-components';
import '../Styles/generalStyle/Style.css'

const title= require('../Img/Title.png');

const StyledNavegateBar = styled.div`
  display: flex;
  justify-content: center;
  margin: 15px 15px;
`;

const StyleTitle = styled.img `
  width: 250px;
  height: 100px;
`;

const NavigateBar = () => {
    return (
        <div className='navegate-bar'>
            <StyleTitle src={title} alt='Pokedex_W_Title'/>
            <StyledNavegateBar>
                <Navigation/>
            </StyledNavegateBar>
        </div>
    );
};

export default NavigateBar;