import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FootCopy from '../../Home/Foot';
import styled from 'styled-components';
import '../../Styles/CardStyle/style.css'
import backupImageUrl from '../../Img/MissingImg2.png';

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  background-image: linear-gradient(to top, #1111bbbb, transparent);
  border-radius: 100px;
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
        const [types, setTypes] = useState([]);

        useEffect(() => {
            async function fetchPokemonDetail() {
                try {
                    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                    setPokemon(response.data);

                    const types = response.data.types.map((type) => type.type.name);
                    setTypes(types);
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
            <div className='styledCard'>
            <div>
                <h1 className='title'>{pokemon.name} N°{pokemon.id}</h1>
                <h2 className='title'>{generation}</h2>
            </div>
            <div className='bodyCard'>
                <div>
            <StyledImg
                className='PokeImg'
                src={imageUrl}
                alt={pokemon.name}
                onError={(e) => {
                    e.target.src = backupImageUrl;
                }}
            />
                    <h3 className="title">Type</h3>
                    <div className="types-list">
                        {types.map((type, index) => (
                            <span key={index} className={`type ${type.toLowerCase()}`}>
                  {type}
                </span>
                        ))}
                    </div>

                    <h3 className='title'>Abilities</h3>
                    <p className='text'> {pokemon.abilities.map((ability) => ability.ability.name).join(', ')}</p>


            </div>
                <div>
                    <div className='order'>
                        <div style={{flexDirection: 'column', padding: '0px 5px'}}>
                    <h3 className='title'>Height</h3>
                <p className='text'>{convertToMeters(pokemon.height)} Mts.</p>
                    </div>
                        <div style={{flexDirection: 'column', padding: '0px 5px'}}>
                    <h3 className='title'>Weight</h3>
                    <p className='text'>{(pokemon.weight / 10).toFixed(1)} Kgs.</p>
                        </div>
                </div>

                    <div className='orderDes'>
                <h3 className='title'>Description</h3>
                    <p className='text'>{description}</p>
                </div>

                </div>


            </div>
                <h3 className='title'>Base Stats</h3>
                <ul className='textList'>
                    {stats.map((stat) => (
                        <li key={stat.stat.name}>
                            {stat.stat.name}: {stat.base_stat}
                        </li>
                    ))}
                </ul>

                <h3 className='title'>Evolutions</h3>
                {evolutions.length > 1 ? (
                    <ul>
                        {evolutions.map((evolution, index) => (
                            <li key={index} className='squaList'>
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
        </div>
            <div>
            <button onClick={handlePreviousClick}>Previous</button>
            <button onClick={handleBackToListClick}>Back to List</button>
            <button onClick={handleNextClick}>Next</button>
        </div>
        </div>
    );
};

export default PokemonDetail;