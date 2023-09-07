import React, { useState } from 'react';
import styled from 'styled-components';

const StyledSearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
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
                placeholder="Search Pokémon by name or number..."
                value={pokeSearch}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchPokemon;