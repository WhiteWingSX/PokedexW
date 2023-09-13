import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchInput = styled.input`
  margin-top: -52px;
  position: fixed;
  width: 100%;
  padding: 10px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #cccccc;
  
  input::placeholder{
    text-align: center;
  }
`;

const SearchPokemon = ({ onSearch }) => {
    const [pokeSearch, setPokeSearch] = useState('');

    const handleSearch = (event) => {
        const query = event.target.value;
        setPokeSearch(query);
        onSearch(query);
    };

    return (
        <div>
            <StyledSearchInput
                type="text"
                placeholder="Search Pokémon by name/Id ..."
                value={pokeSearch}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchPokemon;