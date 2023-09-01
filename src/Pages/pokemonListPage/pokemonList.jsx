import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledPokemonList = styled.div`
  text-align: right;
  overflow-x: auto;
`;

const StyledPokemonUl = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  padding: 0;
  margin: 10rem 10px;
`;

const StyledPokemonLi = styled.li`
  text-align: center;
  margin: 0px 10px;
`;

const PokemonList = ({ allPokemonData, pokeSearch }) => {
    const filteredPokemon = allPokemonData.filter((pokemon) =>
        pokemon.name && pokemon.name.toLowerCase().includes(pokeSearch.toLowerCase())
    );

    return (
        <StyledPokemonList>
            <h2>Pokémon List</h2>
            <StyledPokemonUl>
                {filteredPokemon.map((pokemon) => (
                    <StyledPokemonLi key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>
                            <img src={pokemon.image} alt={`Image of ${pokemon.name}`} />
                            #{pokemon.pokedexNumber} - {pokemon.name}
                        </Link>
                    </StyledPokemonLi>
                ))}
            </StyledPokemonUl>
        </StyledPokemonList>
    );
};

export default PokemonList;