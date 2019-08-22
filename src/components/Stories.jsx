import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import StoryList from './StoryDisplay';
import { getSelectStories } from '../hackerapi';

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
    try {
      let storylist = await getSelectStories(this.props.type, this.props.page);
      storylist = storylist.filter(story => story !== null);
      console.log(storylist);
      return storylist;
    } catch (err) {
      return [];
    }
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
