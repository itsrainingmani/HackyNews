import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '@reach/router';

export default class Menus extends Component {
  constructor(props) {
    super(props);

    this.state = { activeItem: 'top' };
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <React.Fragment>
        <Menu pointing secondary>
          <Menu.Item
            name="top"
            active={activeItem === 'top'}
            onClick={this.handleItemClick}
            header
          >
            <Link to="/">Top</Link>
          </Menu.Item>
          <Menu.Item
            name="best"
            active={activeItem === 'best'}
            onClick={this.handleItemClick}
            header
          >
            <Link to="/best">Best</Link>
          </Menu.Item>
          <Menu.Item
            name="new"
            active={activeItem === 'new'}
            onClick={this.handleItemClick}
            header
          >
            <Link to="/new">New</Link>
          </Menu.Item>
        </Menu>

        {this.props.children}
      </React.Fragment>
    );
  }
}
