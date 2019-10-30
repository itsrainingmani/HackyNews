import React, { useState, useEffect } from 'react';
import { convUnixTime, extractHostname } from './StoryUtils';
import { List, Header } from 'semantic-ui-react';
import * as HackerApi from '../hackerapi';
import ErrorBoundary from './ErrorBoundary';
import ReactHtmlParser from 'react-html-parser';

export default function CommentSection(props) {
	const [story, setStory] = useState({});
	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
		HackerApi.getItem(props.itemId)
			.then(data => setStory(data))
			.catch(err => {
				console.debug(err);
			});

		// HackerApi.getAllItems(props.itemId).then(data => {
		// 	console.log(data);
		// 	setCommentList(data);
		// });

		HackerApi.fullCommentSection(props.itemId).then(data => {
			setCommentList(data);
		});
	}, [props.itemId]);

	return (
		<ErrorBoundary>
			<React.Fragment>
				<CommentHeader story={story} />
				<CommentList comments={commentList} />
			</React.Fragment>
		</ErrorBoundary>
	);
}

function CommentHeader(props) {
	const story = props.story;
	return (
		<Header>
			<a href={story.url}>{story.title}</a>
			{/* <em>{` (${new URL(story.url).hostname}) `}</em> */}
			<em style={{ color: 'grey' }}>{` ${extractHostname(story.url)} `}</em>
			<Header.Subheader>
				<strong>{story.score}</strong>
				{' points by '}
				<strong>
					<em style={{ color: 'orange' }}>{story.by}</em>
				</strong>{' '}
				{convUnixTime(story.time)}
				{' | ' + story.descendants + ' comments'}
			</Header.Subheader>
		</Header>
	);
}

function CommentList(props) {
	return (
		<List relaxed divided verticalAlign="middle" size="large">
			{props.comments.length > 0
				? props.comments.map(comment => (
						<List.Item
							key={comment.id}
							style={{
								marginLeft: comment.depth * 20,
								backgroundColor: comment.depth % 2 === 0 ? 'white' : 'aliceblue'
							}}
						>
							<List.Icon name="caret up" verticalAlign="top" />
							<List.Content>
								<List.Header>
									{comment.deleted === 'true'
										? 'deleted'
										: `${comment.by} | ${convUnixTime(comment.time)}`}
								</List.Header>
								{ReactHtmlParser(comment.text)}
							</List.Content>
						</List.Item>
				  ))
				: "There's nothing here"}
		</List>
	);
}
