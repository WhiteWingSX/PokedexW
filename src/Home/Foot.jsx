import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  text-align: center;
  padding: 10px;
  background-color: #f0f0f0;
`;
const FootCopy = () => {
    return (
        <StyledFooter>
            <h3>All content of website is property of Nintendo, Game Freak and The Pokémon Company</h3>
        </StyledFooter>
    );
};

export default FootCopy;