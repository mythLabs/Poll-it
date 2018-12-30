import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';

import { Container as BaseContainerStyles } from '../styledComponents/layout';

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Header
          background="background-color: #0093E9;background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);"
          title={data.site.siteMetadata.title}
        />
        <BaseContainerStyles>
          {children}
          <footer>
            © 2018, Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </BaseContainerStyles>
      </>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
