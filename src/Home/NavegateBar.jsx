import React from 'react';
import Navigation from '../Routes/Navegate';
import styled from 'styled-components';

const StyledNavegateBar = styled.div`
  margin: 30px 30px;
`;

const NavigateBar = () => {
    return (
        <StyledNavegateBar>
            <Navigation/>
        </StyledNavegateBar>
    );
};

export default NavigateBar;