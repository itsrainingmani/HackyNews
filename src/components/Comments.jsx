import React, { useState, useEffect } from 'react';
import { convUnixTime, extractHostname } from './StoryUtils';
import { List, Header, Segment } from 'semantic-ui-react';
import * as HackerApi from '../hackerapi';
import ErrorBoundary from './ErrorBoundary';

export default function CommentSection(props) {
  const [story, setStory] = useState({});

  useEffect(() => {
    HackerApi.getItem(props.itemId)
      .then(data => setStory(data))
      .catch(err => {
        console.debug(err);
      });
  }, [props.itemId]);

  return (
    <ErrorBoundary>
      <CommentHeader story={story} />
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
