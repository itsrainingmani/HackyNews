import React, { useState, useEffect } from 'react';
import { Container, List, Button } from 'semantic-ui-react';

function StoryList(props) {
  return (
    <List relaxed verticalAlign="middle">
      {props.storyList.map(story => (
        <List.Item key={story.id}>
          <List.Content>
            <List.Header as="a">
              <a href={story.url}>{story.title}</a>
            </List.Header>
            by {story.by}
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default function Stories(props) {
  const [topStories, setTopStories] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getTopStories() {
      let response = await fetch(`/stories/${props.type}/${page}`);
      let storylist = await response.json();

      console.log(storylist);
      if (!response.ok) throw Error('Something went wrong');
      else setTopStories(storylist);
    }
    getTopStories();
  }, [page, props.type]);

  return (
    <Container>
      <StoryList storyList={topStories} />
      <Button onClick={() => setPage(page + 1)}>More</Button>
    </Container>
  );
}
