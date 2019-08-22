import React, { useState } from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import '../styles.css';

export default function Layout(props) {
  const [activeItem, setActiveItem] = useState('/');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="layout">
      <Menu>
        <Menu.Item
          as={Link}
          to="/"
          name="/"
          active={activeItem === '/'}
          onClick={handleItemClick}
          header
        >
          Top
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/best"
          name="best"
          active={activeItem === 'best'}
          onClick={handleItemClick}
          header
        >
          Best
        </Menu.Item>
        <Menu.Item
          as={Link}
          to="/new"
          name="new"
          active={activeItem === 'new'}
          onClick={handleItemClick}
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
      <Container>{props.children}</Container>
      <footer className="footer">
        Copyright &copy; 2019 Manikandan Sundararajan. All Rights Reserved
      </footer>
    </div>
  );
}
