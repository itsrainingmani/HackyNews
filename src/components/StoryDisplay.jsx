import React from 'react';
import { List, Header, Table, Icon, Segment } from 'semantic-ui-react';

const convUnixTime = unixtime => {
  let date = new Date(unixtime * 1000);
  return date.toLocaleDateString('en-US');
};

export default function StoryList(props) {
  return (
    <List divided relaxed verticalAlign="middle" size="large" selection>
      {props.storyList.map(story => (
        <List.Item key={story.id}>
          <Icon name="caret up"></Icon>
          <List.Content>
            <List.Header>
              <a href={story.url}>{story.title}</a>
            </List.Header>
            <Header size="tiny" color="orange" floated="left">
              <strong>{story.score}</strong>&nbsp;points by&nbsp;
              <strong>{story.by}</strong> at {convUnixTime(story.time)}
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
