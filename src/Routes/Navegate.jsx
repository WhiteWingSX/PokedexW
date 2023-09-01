import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled.div`
  margin: 10px 10px;
`;

const StyledNavegate = styled.div`
  display: flex;
`;

const Navigation = () => {
    return (
        <nav>
            <StyledNavegate>
                <StyledLink>
                    <Link to="/">Home</Link>
                </StyledLink>
                <StyledLink>
                    <Link to="/pokemon-list">Pokemon</Link>
                </StyledLink>
                <StyledLink>
                    <Link to="/info">Copyright</Link>
                </StyledLink>
            </StyledNavegate>
        </nav>
    );
};

export default Navigation;