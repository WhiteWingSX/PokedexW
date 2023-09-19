import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchInput = styled.input`
  position: static;
  width: 93.6%;
  padding: 10px;
  background: transparent;
  border: none;
  border-bottom: 2px solid #cccccc;
  
  input::placeholder{
    text-align: center;
    
    }  
  
  @media (min-width: 576px) {
    width: 96.6%;
  }

  @media (min-width: 768px) {
    width: 97.4%;
  }

  @media (min-width: 998px) {
    width: 98%;
  }

  @media (min-width: 1200px) {
    width: 98.3%;
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