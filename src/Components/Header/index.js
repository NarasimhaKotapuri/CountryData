import React from 'react';
import {
  HeaderContainer,
  HeaderCustomTitle,
  HeaderCustomTitleWrapper,
} from './elements';

const Header = () =>{
    return (
      <HeaderContainer>
        <HeaderCustomTitleWrapper>
            <HeaderCustomTitle>Country Data</HeaderCustomTitle>
        </HeaderCustomTitleWrapper>
      </HeaderContainer>
    );
}
export default Header;
