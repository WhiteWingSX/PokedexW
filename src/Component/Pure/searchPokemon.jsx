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
        const newPokeSearch = event.target.value;
        setPokeSearch(newPokeSearch);
        onSearch(newPokeSearch); // Llama a la función de búsqueda del componente padre
    };

    return (
        <div>
            <StyledSearchInput
                type="text"
                placeholder="Search Pokémon..."
                value={pokeSearch}
                onChange={handleSearch}
            />
        </div>
    );
};

export default SearchPokemon;