import React, { useState, useEffect } from 'react';
import { Menu, Container, Dropdown } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import '../styles.css';

function Layout(props) {
	const [activeItem, setActiveItem] = useState('');

	const handleItemClick = (_e, { name }) => setActiveItem(name);

	// The useEffect Hook is equivalent to the component LifeCycle methods,
	// componentDidMount and componentDidUpdate
	useEffect(() => {
		if (props.location.pathname.includes('new')) {
			setActiveItem('new');
		} else if (props.location.pathname.includes('best')) {
			setActiveItem('best');
		} else {
			setActiveItem('/');
		}
	}, [props.location.pathname]);

	return (
		<div className="layout">
			<Menu size="mini">
				<Menu.Item>
					<img src={require('../logo.png')} />
				</Menu.Item>
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

export default withRouter(Layout);
