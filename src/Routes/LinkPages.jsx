import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IndexPage from '../Pages/inicio/IndexPage';
import PokemonDetail from '../Pages/cardPage/pokemonDetail';
import InfoPageCopy from '../Pages/Copyright/infoPageCopy';
import NotFoundPage from '../Pages/error404';
import PokemonApi from '../Pages/pokemonListPage/PokemonData';

const LinkPages = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<IndexPage />} />
                <Route path="/pokemon-list" element={<PokemonApi />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
                <Route path="/info" element={<InfoPageCopy />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
};

export default LinkPages;