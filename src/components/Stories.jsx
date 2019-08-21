import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from '@reach/router';
import ErrorBoundary from './ErrorBoundary';
import StoryList from './StoryDisplay';

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
    storylist = storylist.filter(story => story !== null);
    console.log(storylist);
    if (!response.ok) throw Error('Something went wrong');
    else return storylist;
  };

  render() {
    return (
      <ErrorBoundary>
        <StoryList storyList={this.state.topStories} />
        <Button>
          {this.props.type !== 'top' ? (
            <Link
              to={`/${this.props.type}/${(parseInt(this.props.page) || 1) + 1}`}
            >
              More
            </Link>
          ) : (
            <Link to={`/${(parseInt(this.props.page) || 1) + 1}`}>More</Link>
          )}
        </Button>
      </ErrorBoundary>
    );
  }
}
