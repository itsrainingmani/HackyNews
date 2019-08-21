import React, { Component } from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
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
            to="/best"
            name="best"
            active={activeItem === 'best'}
            onClick={this.handleItemClick}
            header
          >
            Best
          </Menu.Item>
          <Menu.Item
            as={Link}
            to="/new"
            name="new"
            active={activeItem === 'new'}
            onClick={this.handleItemClick}
            header
          >
            New
          </Menu.Item>
          <Dropdown item simple text="More" className="link item">
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/ask">
                Ask HN
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/show">
                Show HN
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/job">
                Jobs
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu>
        <Container>{this.props.children}</Container>
        <footer className="footer">
          Copyright &copy; 2019 Manikandan Sundararajan. All Rights Reserved
        </footer>
      </div>
    );
  }
}
