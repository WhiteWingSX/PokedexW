import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  color: #dddddd;
  background-image: linear-gradient(to top, #cb1413, #de5834aa);
`;
const FootCopy = () => {
    return (
        <StyledFooter>
            <h5>All content of website is property of Nintendo, Game Freak and The Pokémon Company</h5>
        </StyledFooter>
    );
};

export default FootCopy;