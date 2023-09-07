import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './pokemonList';
import '../../Styles/Styles.css';
import NavegateBar from '../../Home/NavegateBar';
import FootCopy from '../../Home/Foot';
import SearchPokemon from '../../Component/Pure/searchPokemon';

const ITEMS_PER_PAGE = 1010;

const PokemonApi = () => {
    const [allPokemonData, setAllPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokeSearch, setPokeSearch] = useState('');

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`);

                const pokemonDetailsPromises = response.data.results.map(async (pokemon) => {
                    const detailResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                    return {
                        ...pokemon,
                        pokedexNumber: detailResponse.data.id,
                        image: detailResponse.data.sprites.front_default,
                    };
                });

                const combinedPokemonData = await Promise.all(pokemonDetailsPromises);
                setAllPokemonData(combinedPokemonData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchPokemonData();
    }, [currentPage]);

    const handleSearch = (newPokeSearch) => {
        setPokeSearch(newPokeSearch);
    };

    return (
        <div>
            <NavegateBar/>
            <h1>Pokédex</h1>
            <SearchPokemon onSearch={handleSearch}/>
            <PokemonList allPokemonData={allPokemonData} pokeSearch={pokeSearch}/>
            {loading && <p>Loading...</p>}
            <footer>
                <FootCopy/>
            </footer>
        </div>
    );
};

export default PokemonApi;