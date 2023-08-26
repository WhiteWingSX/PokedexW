import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from './pokemonList'
import PokemonDetail from './pokemonDetail';
import Pagination from './PokePage';
import '../../Styles/Styles.css';
import Routes from '../../Pages/LinkPages';

const ITEMS_PER_PAGE = 50;

const PokemonApi = () => {

    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        async function fetchPokemonData() {
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${ITEMS_PER_PAGE}&offset=${(currentPage - 1) * ITEMS_PER_PAGE}`);
                setPokemonData(response.data.results);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        }

        fetchPokemonData();
    }, [currentPage]);

    return (
        <div>
            <h1>Pokédex</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <PokemonList
                        pokemonData={pokemonData}
                        setSelectedPokemon={setSelectedPokemon}
                    />
                    <Pagination
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
}

export default PokemonApi;