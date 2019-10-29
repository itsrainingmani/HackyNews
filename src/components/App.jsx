import React, { Suspense, lazy } from 'react';
import Layout from './Layout';
import { Route, Switch } from 'react-router-dom';
import CommentSection from './Comments';
import { Loader } from 'semantic-ui-react';

const Stories = lazy(() => import('./Stories'));
const renderLoader = <Loader active inline="centered" />;

// Each Route component has three route props
// match, location and history.
export default function App() {
	return (
		<Layout>
			<Suspense fallback={renderLoader}>
				<Switch>
					<Route
						exact
						path="/best"
						render={props => <Stories {...props} type="best" page={1} />}
					/>
					<Route
						path="/best/:page"
						render={props => (
							<Stories {...props} type="best" page={props.match.params.page} />
						)} // match object has following properties: params, isExact, path and url
					/>
					<Route
						exact
						path="/new"
						render={props => <Stories {...props} type="new" page={1} />}
					/>
					<Route
						exact
						path="/new/:page"
						render={props => (
							<Stories {...props} type="new" page={props.match.params.page} />
						)}
					/>
					<Route
						exact
						path="/ask"
						render={props => <Stories {...props} type="ask" page={1} />}
					/>
					<Route
						exact
						path="/ask/:page"
						render={props => (
							<Stories {...props} type="ask" page={props.match.params.page} />
						)}
					/>
					<Route
						exact
						path="/show"
						render={props => <Stories {...props} type="show" page={1} />}
					/>
					<Route
						exact
						path="/show/:page"
						render={props => (
							<Stories {...props} type="show" page={props.match.params.page} />
						)}
					/>
					<Route
						exact
						path="/job"
						render={props => <Stories {...props} type="job" page={1} />}
					/>
					<Route
						exact
						path="/job/:page"
						render={props => (
							<Stories {...props} type="job" page={props.match.params.page} />
						)}
					/>
					<Route
						exact
						path="/item/:itemId"
						render={props => (
							<CommentSection {...props} itemId={props.match.params.itemId} />
						)}
					/>
					<Route
						exact
						path="/"
						render={props => <Stories {...props} type="top" page={1} />}
					/>
					<Route
						path="/:page"
						render={props => (
							<Stories {...props} type="top" page={props.match.params.page} />
						)}
					/>
				</Switch>
			</Suspense>
		</Layout>
	);
}
