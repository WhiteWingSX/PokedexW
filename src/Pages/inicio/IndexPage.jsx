import React from 'react';
import './../../Styles/generalStyle/Style.css'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FootCopy from '../../Home/Foot';

const StyledButton = styled.button`
  border: none;
  border-radius: 10px;
  height: 30px;
  color: #ffffff;
  background-color: #4395ac;
  border-bottom: 2px solid #25515d;
`;

const HomePage = () => {

    const navigate = useNavigate();
    const handleGoToListClick = () => {
        navigate('/pokemon-list');
    };

    return (
        <div className='text-base' style={{padding: '30px 10px', alignItems: 'center'}}>
            <h1>Wellcome Trainer</h1>
            <p>We are present de new generation of pokedex, you have access to information of 1010 Pokemons</p>
            <StyledButton onClick={handleGoToListClick}>Go to Pokedex</StyledButton>
            <FootCopy/>
        </div>
    );
};

export default HomePage;