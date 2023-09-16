import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  position: sticky;
  bottom: 0;
  //left: 0;
  width: 100%;
  margin-top: 58px;
  color: #dddddd;
  background-image: linear-gradient(to top, #cb1413, #de5834aa);
`;

const StyledH = styled.footer`
  font-family: 'Work Sans', sans-serif;
  
  text-align: center;
  font-weight: bold;
  padding: 5px 0px;
`;

// const StyledH = styled.h5`
//
// `;

const FootCopy = () => {
    return (
        <StyledFooter>
            <StyledH>All content of website is property of Nintendo, Game Freak and The Pokémon Company</StyledH>
        </StyledFooter>
    );
};

export default FootCopy;