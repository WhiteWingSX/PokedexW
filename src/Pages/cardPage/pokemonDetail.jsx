import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FootCopy from '../../Home/Foot';

const PokemonDetail = () => {
    const { name } = useParams();
    const navigate = useNavigate(); // Para la navegación
    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        async function fetchPokemonDetail() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchPokemonDetail();
    }, [name]);

    const getPokemonImageUrl = (pokemonIndex) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`;
    };

    const handleNextClick = () => {
        // Increment the current Pokemon's ID to get the next Pokemon
        navigate(`/pokemon/${pokemon.id + 1}`);
    };

    const handlePreviousClick = () => {
        // Decrement the current Pokemon's ID to get the previous Pokemon
        navigate(`/pokemon/${pokemon.id - 1}`);
    };

    const handleBackToListClick = () => {
        // Navigate back to the Pokemon list page
        navigate('/pokemon-list');
    };

    if (!pokemon) {
        return <p>Loading...</p>;
    }

    const imageUrl = getPokemonImageUrl(pokemon.id);

    return (
        <div className="pokemon-detail">
            <h2>Pokémon Details - {pokemon.name}</h2>
            <img src={imageUrl} alt={pokemon.name} />
            <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p>Height: {pokemon.height} decimetres</p>
            <p>Weight: {pokemon.weight} hectograms</p>
            <button onClick={handlePreviousClick}>Previous Pokémon</button>
            <button onClick={handleNextClick}>Next Pokémon</button>
            <button onClick={handleBackToListClick}>Back to Pokémon List</button>
            <footer>
                <FootCopy/>
            </footer>
        </div>
    );
};

export default PokemonDetail;