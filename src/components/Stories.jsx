import React, { useState, useEffect } from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import StoryList from './StoryDisplay';
import { getSelectStories } from '../hackerapi';

export default function Stories(props) {
  const [topStories, setTopStories] = useState([]);

  useEffect(() => {
    const getTopStories = async () => {
      try {
        let storylist = await getSelectStories(props.type, props.page);
        storylist = storylist.filter(story => story !== null);
        console.log(storylist);
        return storylist;
      } catch (err) {
        return [];
      }
    };

    getTopStories()
      .then(sl => setTopStories(sl))
      .catch(sl => setTopStories(sl));
  }, [props.type, props.page]);

  return (
    <ErrorBoundary>
      <StoryList storyList={topStories} />
      <Button>
        {props.type !== 'top' ? (
          <Link to={`/${props.type}/${(parseInt(props.page) || 1) + 1}`}>
            More
          </Link>
        ) : (
          <Link to={`/${(parseInt(props.page) || 1) + 1}`}>More</Link>
        )}
      </Button>
    </ErrorBoundary>
  );
}
