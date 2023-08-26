import React from 'react';

    const PokemonList = ({ pokemonData, setSelectedPokemon }) => {
        const handlePokemonClick = (pokemon) => {
            setSelectedPokemon(pokemon);
        };

    return (
        <ul className="pokemon-list">
            {pokemonData.map((pokemon) => (
                <li
                    key={pokemon.name}
                    className="pokemon-list-item"
                    onClick={() => handlePokemonClick(pokemon)}
                >
                    {pokemon.name}
                </li>
            ))}
        </ul>
    );
};

export default PokemonList;