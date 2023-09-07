import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FootCopy from '../../Home/Foot';
import styled from 'styled-components';

const StyledImg = styled.img`
  width: 350px;
  height: 350px;
`;
    const PokemonDetail = () => {
        const { name } = useParams();
        const navigate = useNavigate();
        const [pokemon, setPokemon] = useState(null);
        const [description, setDescription] = useState('');
        const [stats, setStats] = useState([]);
        const [generation, setGeneration] = useState('');
        const [evolutions, setEvolutions] = useState([]);
        const [pokemonImageUrls, setPokemonImageUrls] = useState([]);

        useEffect(() => {
            async function fetchPokemonDetail() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    setPokemon(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            async function fetchPokemonDescription() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
                    const entries = response.data.flavor_text_entries;

                    const englishEntry = entries.find(entry => entry.language.name === 'en');
                    if (englishEntry) {
                        setDescription(englishEntry.flavor_text);
                    }
                } catch (error) {
                    console.error('Error fetching description:', error);
                }
            }

            async function fetchPokemonStats() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    setStats(response.data.stats);
                } catch (error) {
                    console.error('Error fetching stats:', error);
                }
            }

            async function fetchPokemonGeneration() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
                    const generationUrl = response.data.generation.url;
                    const generationResponse = await axios.get(generationUrl);
                    setGeneration(generationResponse.data.name);
                } catch (error) {
                    console.error('Error fetching generation:', error);
                }
            }

            async function fetchPokemonEvolutions() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
                    const evolutionChainUrl = response.data.evolution_chain.url;
                    const evolutionChainResponse = await axios.get(evolutionChainUrl);
                    const evolutionChain = getEvolutionChain(evolutionChainResponse.data.chain);

                    const imageUrls = await Promise.all(evolutionChain.map(async (evolution) => {
                        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evolution}`);
                        return pokemonResponse.data.sprites.front_default;
                    }));

                    setEvolutions(evolutionChain);
                    setPokemonImageUrls(imageUrls);
                } catch (error) {
                    console.error('Error fetching evolutions:', error);
                }
            }

            fetchPokemonDetail();
            fetchPokemonDescription();
            fetchPokemonStats();
            fetchPokemonGeneration();
            fetchPokemonEvolutions();
        }, [name]);

        const getEvolutionChain = (chain) => {
            const evolutionChain = [];
            while (chain) {
                evolutionChain.push(chain.species.name);
                chain = chain.evolves_to[0];
            }
            return evolutionChain;
        };

        const getPokemonImageUrl = (pokemonIndex) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonIndex}.svg`;
        };

        const convertToMeters = (decimetres) => {
            return (decimetres / 10).toFixed(2);
        };

        const handleNextClick = () => {
            if (pokemon && pokemon.id < 151) {
                navigate(`/pokemon/${pokemon.id + 1}`);
            }
        };

        const handlePreviousClick = () => {
            if (pokemon && pokemon.id > 1) {
                navigate(`/pokemon/${pokemon.id - 1}`);
            }
        };

        const handleBackToListClick = () => {
            navigate('/pokemon-list');
        };

        if (!pokemon) {
            return <p>Loading...</p>;
        }

        const imageUrl = getPokemonImageUrl(pokemon.id);

        const backupImageUrl = require('../../Img/MissingImg2.png');


    return (
        <div className="pokemon-detail">
            <h2>Pokémon Details - {pokemon.name}</h2>
            <p>Number: #{pokemon.id}</p>
            <StyledImg
                src={imageUrl}
                alt={pokemon.name}
                onError={(e) => {
                    e.target.src = backupImageUrl;
                }}
            />
            <p>Type: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
            <p>Abilities: {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>
            <p>Height: {convertToMeters(pokemon.height)} meters</p>
            <p>Weight: {(pokemon.weight / 10).toFixed(1)} kilograms</p>
            <p>Description: {description}</p>
            <p>Generation: {generation}</p>
            <h3>Base Stats:</h3>
            <ul>
                {stats.map((stat) => (
                    <li key={stat.stat.name}>
                        {stat.stat.name}: {stat.base_stat}
                    </li>
                ))}
            </ul>
            <button onClick={handlePreviousClick}>Previous Pokémon</button>
            <button onClick={handleNextClick}>Next Pokémon</button>
            <button onClick={handleBackToListClick}>Back to Pokémon List</button>
            <h3>Evolutions:</h3>
            {evolutions.length > 1 ? (
                <ul>
                    {evolutions.map((evolution, index) => (
                        <li key={index}>
                            {evolution && (
                                <Link to={`/pokemon/${evolution}`}>
                                    <img src={pokemonImageUrls[index]} alt={evolution} />
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>This Pokémon has no evolutions.</p>
            )}
            <footer>
                <FootCopy />
            </footer>
        </div>
    );
};

export default PokemonDetail;