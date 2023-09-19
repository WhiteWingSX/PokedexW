import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import IndexPage from '../Pages/inicio/IndexPage';
import PokemonDetail from '../Pages/cardPage/pokemonDetail';
import InfoPageCopy from '../Pages/Copyright/infoPageCopy';
import NotFoundPage from '../Pages/error404';
import PokemonApi from '../Pages/pokemonListPage/PokemonData';
import styled from 'styled-components';


const title= require('../Img/Title.png');

const StyleTitle = styled.img `
  width: 250px;
  height: 100px;
`;

const StyledLink = styled.div`
  padding: 10px 10px;
  margin-top: 5px;
  
  
  &:hover{
    background-color: #de5834cc;
  }
`;

const StyledNavegate = styled.div`
  display: flex;
  justify-content: center;
  
`;

const StyledLinkTo = styled(Link)`
  text-decoration: none;
  color: #ffffffcc;
  
  &:hover{
    border-radius: 15px;
    cursor: pointer;
    color: #ffffffff;;
  }
  
    &:focus{
      background-color: #de5834cc;
      font-weight: bold;
    }
  
`;

const LinkPages = () => {
    return (
        <Router>
        <div>
            <div className='navegate-bar'>
                <StyleTitle src={title} alt='Pokedex_W_Title'/>
            <nav>
                <StyledNavegate>
                    <StyledLink>
                        <StyledLinkTo to="/">Home</StyledLinkTo>
                    </StyledLink>
                    <StyledLink>
                        <StyledLinkTo to="/pokemon-list">Pokémon</StyledLinkTo>
                    </StyledLink>
                    <StyledLink>
                        <StyledLinkTo to="/info">About Pokedex</StyledLinkTo>
                    </StyledLink>
                </StyledNavegate>
            </nav>
        </div>

            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/pokemon-list" element={<PokemonApi />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
                <Route path="/info" element={<InfoPageCopy />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>

</div>
</Router>
    );
};

export default LinkPages;