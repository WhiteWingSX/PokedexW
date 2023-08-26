import React from 'react';
import { BrowserRouter, Route, Routes as RouterRoutes } from 'react-router-dom';
import PokemonDetail from '../Component/Pure/pokemonDetail';
import PokemonApi from '../Component/Pure/PokemonData';

const Routes = () => {
    return (
        <BrowserRouter>
            <RouterRoutes>
                <Route path="/" element={<PokemonApi />} />
                <Route path="/pokemon/:name" element={<PokemonDetail />} />
            </RouterRoutes>
        </BrowserRouter>
    );
};

export default Routes;