import React from 'react';
import { List, Header, Table, Icon, Segment } from 'semantic-ui-react';

const convUnixTime = unixtime => {
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

export default function StoryList(props) {
  return (
    <List
      divided
      relaxed
      verticalAlign="middle"
      size="large"
      selection
      animated
    >
      {props.storyList.map(story => (
        <List.Item key={story.id}>
          <List.Icon name="caret up" verticalAlign="middle" />
          <List.Content>
            <List.Header>
              <a href={story.url} target="_blank" rel="noopener noreferrer">
                {story.title}
              </a>
            </List.Header>
            <Header size="tiny" color="orange" floated="left">
              <strong>{story.score}</strong>
              {' points by '}
              <strong>
                <em>{story.by}</em>
              </strong>{' '}
              {convUnixTime(story.time)}
              {' with ' + story.descendants + ' comments'}
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
