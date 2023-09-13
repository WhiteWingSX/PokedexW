import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../Styles/generalStyle/Style.css'

const StyledLink = styled.div`
  margin: 10px 10px;
  
  &:hover{
    background-color: #de5834cc;
  }
`;

const StyledNavegate = styled.div`
  display: flex;
`;

const StyledLinkTo = styled(Link)`
text-decoration: none;
color: #ffffff;

  &:hover{
    background-color: #de5834cc;
  }
`;

const Navigation = () => {
    return (
        <nav>
            <StyledNavegate>
                <StyledLink>
                    <StyledLinkTo to="/">Home</StyledLinkTo>
                </StyledLink>
                <StyledLink>
                    <StyledLinkTo to="/pokemon-list">Pokemon</StyledLinkTo>
                </StyledLink>
                <StyledLink>
                    <StyledLinkTo to="/info">Copyright</StyledLinkTo>
                </StyledLink>
            </StyledNavegate>
        </nav>
    );
};

export default Navigation;