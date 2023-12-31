import React from 'react';
import FootCopy from '../../Home/Foot';

const EndPage = () => {
    return (
        <div className='text-base' style={{padding: '0px 8px', marginBottom: '64px', alignItems: 'center'}}>
            <h1>Site information</h1>
            <h5>An open source site created by
                Bastian Rozas Neira for personal learning purposes.
                All data related to Pokémon was obtained from the PokéApi service.

                Information available for each Pokémon:
                Base statistics, elemental types, description, abilities, generation to which they belong,
                and the evolutionary tree of the species.</h5>

            <p>Explore the world of Pokémon!</p>
            <FootCopy/>

        </div>
    );
};

export default EndPage;