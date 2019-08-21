import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { Link } from '@reach/router';
import '../styles.css';

export default class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: '/' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <div className="layout">
        <Menu>
          <Menu.Item
            as={Link}
            to="/"
            name="/"
            active={activeItem === '/'}
            onClick={this.handleItemClick}
            header
          >
            Top
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="best"
            name="best"
            active={activeItem === 'best'}
            onClick={this.handleItemClick}
            header
          >
            Best
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="new"
            name="new"
            active={activeItem === 'new'}
            onClick={this.handleItemClick}
            header
          >
            New
          </Menu.Item>
        </Menu>
        <Container>{this.props.children}</Container>
        <footer className="footer">
          Copyright &copy; 2019 Manikandan Sundararajan. All Rights Reserved
        </footer>
      </div>
    );
  }
}