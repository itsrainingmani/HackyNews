import React from 'react';
import { Container, List, Button } from 'semantic-ui-react';
import { Link } from '@reach/router';

const convUnixTime = unixtime => {
  let date = new Date(unixtime * 1000);
  return date.toLocaleDateString('en-US');
};

function StoryList(props) {
  return (
    <List relaxed verticalAlign="middle">
      {props.storyList.map(story => (
        <List.Item key={story.id}>
          <List.Content>
            <List.Header as="a">
              <a href={story.url}>{story.title}</a>
            </List.Header>
            by {story.by} at {convUnixTime(story.time)} with {story.score}{' '}
            points
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

export default class Stories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      topStories: []
    };
  }

  async componentDidMount() {
    let stories = await this.getTopStories();
    this.setState({ topStories: stories });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.type !== prevProps.type ||
      this.props.page !== prevProps.page
    ) {
      let stories = await this.getTopStories();
      this.setState({ topStories: stories });
    }
  }

  getTopStories = async () => {
    let response = await fetch(
      `/stories/${this.props.type}/${this.props.page || 1}`
    );
    let storylist = await response.json();

    console.log(storylist);
    if (!response.ok) throw Error('Something went wrong');
    else return storylist;
  };

  render() {
    return (
      <Container>
        <StoryList storyList={this.state.topStories} />
        <Button>
          {this.props.type !== 'top' ? (
            <Link
              to={`/${this.props.type}/${(parseInt(this.props.page) || 1) + 1}`}
            >
              More
            </Link>
          ) : (
            <Link to={`${(parseInt(this.props.page) || 1) + 1}`}>More</Link>
          )}
        </Button>
      </Container>
    );
  }
}
