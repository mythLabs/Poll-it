import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Container } from '.././styledComponents/layout';

const HeaderContainer = styled.header`
  ${props => props.background};
  margin-bottom: 1.45rem;
`;

const Heading1 = styled.h1`
  margin: 0;
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const BACKGROUND = 'background-color: #20232a';

const Header = ({ background, title }) => (
  <HeaderContainer background={background}>
    <Container>
      <Heading1>
        <StyledLink to="/">{title}</StyledLink>
      </Heading1>
    </Container>
  </HeaderContainer>
);

Header.defaultProps = {
  background: BACKGROUND,
  title: 'Poll It',
};

Header.propTypes = {
  background: PropTypes.string,
  title: PropTypes.string,
};

export default Header;
