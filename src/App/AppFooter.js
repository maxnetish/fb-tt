/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  padding: 24px;
  color: rgba(255, 255, 255, 0.4);
  background-color: darkslategray;
`;

const Copyright = styled.span`
  padding-right: 0.5em;
`;

const Separator = styled.span`
  padding-right: 0.5em;
  padding-left: 0.5em;
`;

const ExtLink = styled.a`
  &,
  &:hover,
  &:active,
  &:visited {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

class AppFooter extends React.Component {
  render() {
    return <Footer />;
  }
}

export default AppFooter;
