import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { List, Header, Table, Icon, Segment } from 'semantic-ui-react';
import { getSelectStories } from '../hackerapi';

export const convUnixTime = unixtime => {
	let date = new Date(unixtime * 1000);
	let timeInMs = Date.now();
	let timeDiff = (timeInMs - date) / 1000;

	if (timeDiff / 3600 < 1) {
		return 'less than an hour ago';
	} else if (timeDiff / 3600 > 0.9 && timeDiff / 3600 <= 1.1) {
		return `an hour ago`;
	} else if (timeDiff / 3600 >= 1.1 && timeDiff / 3600 < 24) {
		return `${Math.floor(timeDiff / 3600)} hour${
			Math.floor(timeDiff / 3600) === 1 ? '' : 's'
		} ago`;
	} else if (timeDiff / 86400 >= 0.99 && timeDiff / 86400 <= 1.01) {
		return `1 day ago`;
	} else if (timeDiff / 86400 > 1 && timeDiff / 86400 < 7) {
		return `${Math.floor(timeDiff / 86400)} day${
			Math.floor(timeDiff / 86400) === 1 ? '' : 's'
		} ago`;
	} else {
		return (
			' on ' +
			date.toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'short',
				day: 'numeric'
			})
		);
	}
};

// Tries to match a regex. If there are no matches, get hostname via URL constructor
export const extractHostname = storyURL => {
	if (storyURL === null || storyURL === undefined) {
		return '';
	}
	let matches = storyURL.match(/^https?:\/\/www.?([^/?#]+)(?:[/?#]|$)/i);
	let domain = matches ? matches[1] : new URL(storyURL).hostname;
	return `(${domain})`;
};

export default function StoryList(props) {
	return (
		<List
			relaxed
			selection
			animated
			divided
			verticalAlign="middle"
			size="large"
		>
			{props.storyList.map(story => (
				<List.Item key={story.id}>
					<List.Icon name="caret up" verticalAlign="middle" />
					<List.Content>
						<List.Header>
							<a target="_blank" rel="noopener noreferrer" href={story.url}>
								{story.title}
							</a>
							{/* <em>{` (${new URL(story.url).hostname}) `}</em> */}
							<em>{` ${extractHostname(story.url)} `}</em>
						</List.Header>
						<Header size="tiny" color="orange" floated="left">
							<strong>{story.score}</strong>
							{' points by '}
							<strong>
								<em>{story.by}</em>
							</strong>{' '}
							{convUnixTime(story.time)}
							{' with '}
							<Link to={`/item/${story.id}`}>
								{+story.descendants + ' comments'}
							</Link>
						</Header>
					</List.Content>
				</List.Item>
			))}
		</List>
	);
}

export function StorySegment(props) {
	return (
		<Segment.Group raised>
			{props.storyList.map(story => (
				<Segment.Group horizontal compact key={story.id}>
					<Segment>
						<Header size="small" color="orange" textAlign="right">
							<strong>
								{story.score}
								<Icon name="caret up"></Icon>
							</strong>
						</Header>
					</Segment>
					<Segment>
						<a href={story.url}>{story.title}</a>
					</Segment>
					<Segment>
						&nbsp; by <strong>{story.by}</strong> at {convUnixTime(story.time)}
					</Segment>
				</Segment.Group>
			))}
		</Segment.Group>
	);
}

export function StoryTable(props) {
	return (
		<Table fixed singleLine>
			<Table.Body>
				{props.storyList.map(story => (
					<Table.Row key={story.id}>
						<Table.Cell width={1}>
							<List horizontal>
								<List.Item floated="left">
									<Header size="small" color="orange" textAlign="right">
										<strong>
											{story.score}
											<Icon name="caret up"></Icon>
										</strong>
									</Header>
								</List.Item>
								<List.Item>
									<a href={story.url}>{story.title}</a>&nbsp; by{' '}
									<strong>{story.by}</strong> at {convUnixTime(story.time)}
								</List.Item>
							</List>
						</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	);
}

export function StoryButton(props) {
	const { type, page } = props;
	const linkTo =
		type !== 'top'
			? `/${props.type}/${(parseInt(page) || 1) + 1}`
			: `/${(parseInt(page) || 1) + 1}`;
	return (
		<Button>
			<Link to={linkTo}>More</Link>
		</Button>
	);
}

export const GetTopStories = async (type, page) => {
	try {
		let storylist = await getSelectStories(type, page);
		storylist = storylist.filter(story => story !== null);
		console.log(storylist);
		return storylist;
	} catch (err) {
		return [];
	}
};
