import React from 'react';
import {
  Container,
  List,
  Button,
  Header,
  Table,
  Icon
} from 'semantic-ui-react';
import { Link } from '@reach/router';

const convUnixTime = unixtime => {
  let date = new Date(unixtime * 1000);
  return date.toLocaleDateString('en-US');
};

function StoryList(props) {
  return (
    <List divided relaxed verticalAlign="middle" size="large">
      {props.storyList.map(story => (
        <List.Item key={story.id}>
          <List.Content>
            <Header size="small" color="orange" floated="left">
              <strong>
                {story.score}
                <Icon name="caret up"></Icon>
              </strong>
              <a href={story.url}>{story.title}</a>&nbsp; by{' '}
              <strong>{story.by}</strong> at {convUnixTime(story.time)}
            </Header>
          </List.Content>
        </List.Item>
      ))}
    </List>
  );
}

// function StoryTable(props) {
//   return (
//     <Table fixed singleLine>
//       <Table.Body>
//         {props.storyList.map(story => (
//           <Table.Row key={story.id}>
//             <Table.Cell width={1} textAlign="right">
//               <strong>
//                 {story.score}
//                 <Icon name="caret up"></Icon>
//               </strong>
//             </Table.Cell>
//             <Table.Cell>
//               <a href={story.url}>{story.title}</a>
//             </Table.Cell>
//             <Table.Cell>
//               by <strong>{story.by}</strong> at {convUnixTime(story.time)}
//             </Table.Cell>
//           </Table.Row>
//         ))}
//       </Table.Body>
//     </Table>
//   );
// }

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
            <Link to={`/${(parseInt(this.props.page) || 1) + 1}`}>More</Link>
          )}
        </Button>
      </Container>
    );
  }
}
