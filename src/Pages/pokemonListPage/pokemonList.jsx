import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPokemonList = styled.div`
  
  text-align: right;
  overflow-x: auto;
  margin-top: 63%;
  width: 100%;
`;

const StyledPokemonUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  height: 150px;
`;

const StyledPokemonLi = styled.li`
  display: flex;
  padding: 5px;
`;

const NoResultsMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: gray;
  font-weight: bold;
  margin-top: 20%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  border-radius: 10px;
  background-image: linear-gradient(to top, #1234cccc, transparent);
  border-bottom: 2px solid #123488;
  display: flex;
  align-items: center;
`;

const StyledObject = styled.div`
  font-family: 'Pokemon Solid', sans-serif;
  
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #dddddd;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
  padding: 0px 5px;
  height: 10px;
`;

const StyledImg = styled.img`
  
  width: 120px;
  height: 120px;
  margin: 3px;
  border-radius: 100px;
  background-image: linear-gradient(to top, #1111bbbb, transparent);
  border-bottom: 4px solid #111188;
`;

const PokemonList = ({ allPokemonData, pokeSearch, loading }) => {
    const filteredPokemon = allPokemonData.filter((pokemon) =>
        (pokemon.name && pokemon.name.toLowerCase().includes(pokeSearch.toLowerCase())) ||
        (pokemon.pokedexNumber && pokemon.pokedexNumber.toString().includes(pokeSearch.toLowerCase()))
    );

    return (
        <StyledPokemonList>
            {filteredPokemon.length === 0  && !loading ? (
                <NoResultsMessage>Pokemon Not Found.</NoResultsMessage>
            ) : (
                <StyledPokemonUl>
                    {filteredPokemon.map((pokemon) => (
                        <StyledPokemonLi key={pokemon.name}>
                            <StyledLink to={`/pokemon/${pokemon.name}`}>
                                <div>
                                <StyledImg src={pokemon.image} alt={`Image of ${pokemon.name}`} />
                            </div>
                                <StyledObject>
                                   <StyledObject>
                                N°{pokemon.pokedexNumber}
                                </StyledObject>
                                    {pokemon.name}
                            </StyledObject>
                            </StyledLink>
                        </StyledPokemonLi>
                    ))}
                </StyledPokemonUl>
            )}
        </StyledPokemonList>
    );
};

export default PokemonList;