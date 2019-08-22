import React, { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import StoryList, { StoryButton, GetTopStories } from './StoryUtils';

export default function Stories(props) {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    GetTopStories(props.type, props.page)
      .then(sl => setTopStories(sl))
      .catch(sl => setTopStories(sl));
  }, [props.type, props.page]);

  return (
    <ErrorBoundary>
      <StoryList storyList={topStories} />
      <StoryButton type={props.type} page={props.page} />
    </ErrorBoundary>
  );
}
