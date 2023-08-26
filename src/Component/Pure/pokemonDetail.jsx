import React from 'react';

const PokemonDetail = ({ selectedPokemon }) => {
    if (!selectedPokemon) {
        return null;
    }

    return (
        <div className="pokemon-detail">
            <h2>{selectedPokemon.name}</h2>
            {/* Agregar más detalles aquí, como imagen, tipo, habilidades, etc. */}
        </div>
    );
};

export default PokemonDetail;