import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FootCopy from '../../Home/Foot';
import styled from 'styled-components';
import '../../Styles/CardStyle/style.css'


const arrow = require('../../Img/arrow.webp')
const menu = require('../../Img/Menu2.webp')

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  background-image: linear-gradient(to top, #1111bbbb, transparent);
  border-radius: 100px;
  
  @media (min-width: 768px) {
    width: 150px;
    height: 150px;
  }
  
`;

const StyledImg2 = styled.img`
  
  width: 88px;
  height: 88px;
  margin: 3px;
  border-radius: 100px;
  background-image: linear-gradient(to top, #1111bbbb, transparent);
  border-bottom: 4px solid #111188;
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, auto);
  gap: 10px;
`;

const StatItem = styled.li`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
`;

const StyledStatName = styled.span `
  color: #dddddd;
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
`;

const StyledStat = styled.span `
  justify-content: center;
  color: #dddddd;
  font-weight: bold;
`;

const StyledCenter = styled.div `
  display: flex;
  justify-content: center;
  margin: 75px auto;
  width: 100px;
`;

const EvolutionsContainer = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 10px;
  align-items: center;
  justify-content: center;
`;

const EvolutionItem = styled.div`
  text-align: center;
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
                <div>
                    <h3 className='title'>Base Stats</h3>
                    <StatsContainer>
                        {stats.map((stat) => (
                            <StatItem key={stat.stat.name}>
                                <StyledStatName>{stat.stat.name}</StyledStatName>
                                <StyledStat>{stat.base_stat}</StyledStat>
                            </StatItem>
                        ))}
                    </StatsContainer>
                </div>

                <h3 className='title'>Evolutions</h3>
                {evolutions.length > 1 ? (
                    <EvolutionsContainer>
                        {evolutions.map((evolution, index) => (
                            <EvolutionItem key={index}>
                                {evolution && (
                                    <Link to={`/pokemon/${evolution}`}>
                                        <StyledImg2 src={pokemonImageUrls[index]} alt={evolution} />
                                    </Link>
                                )}
                            </EvolutionItem>
                        ))}
                    </EvolutionsContainer>
                ) : (
                    <p>This Pokémon has no evolutions.</p>
                )}
        </div>
            <StyledCenter>
            <button className='btn' onClick={handlePreviousClick}><img className='imgsBack' src={arrow} alt='Previus'/></button>
            <button className='btn' onClick={handleBackToListClick}><img className='imgs' src={menu} alt='Menu'/></button>
            <button className='btn' onClick={handleNextClick}><img className='imgs' src={arrow} alt='next'/></button>
        </StyledCenter>
            <div style={{position: 'sticky'}}>
            <FootCopy/>
        </div>
        </div>
    );
};

export default PokemonDetail;