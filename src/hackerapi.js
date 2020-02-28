import axios from 'axios';

// const storyTypes = ['top', 'best', 'new', 'ask', 'show', 'job'];
const numOfStories = 20;

// Gets all stories for a specified story type
const getAllStories = async type => {
	try {
		let response = await axios.get(
			`https://hacker-news.firebaseio.com/v0/${type}stories.json`
		);
		return response.data;
	} catch (error) {
		console.debug(error);
		throw Error(error);
	}
};

// Gets all stories for a given story type and page number
export const getSelectStories = async (type, pageNum) => {
	try {
		let selectTopStories = [];
		let allTopStories = await getAllStories(type);

		// gets the required slice. This might not work if there isn't any data left
		let topStoryTranch = allTopStories.slice(
			pageNum * numOfStories - numOfStories,
			pageNum * numOfStories
		);
		let promises = [];
		topStoryTranch.forEach(storyID => {
			promises.push(
				axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
			);
		});

		let resolvedStories = await axios.all(promises);
		resolvedStories.forEach(story => {
			selectTopStories.push(story.data);
		});
		return selectTopStories;
	} catch (error) {
		throw Error(error);
	}
};

export const getItem = async itemId => {
	try {
		let response = await axios.get(
			`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
		);
		return response.data;
	} catch (error) {
		console.debug(error);
		throw Error(error);
	}
};

// Async function that receives an itemID and returns an
// array of all child item data
export const getAllItems = async itemId => {
	try {
		let itemList = [];
		let story = await getItem(itemId);

		let promises = [];

		if (!Object.prototype.hasOwnProperty.call(story, 'kids')) {
			return [];
		}

		story.kids.forEach(storyID => {
			promises.push(
				axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
			);
		});

		let resolvedStories = await axios.all(promises);
		resolvedStories.forEach(story => {
			itemList.push(story.data);
		});
		return itemList;
	} catch (error) {
		throw Error(error);
	}
};

// Async function that receives an itemID and returns an
// array of all child item data
export const fullCommentSection = async itemId => {
	try {
		let itemList = [];
		let story = await getItem(itemId);
		let promises = [];

		if (!Object.prototype.hasOwnProperty.call(story, 'kids')) {
			return itemList; // empty
		}

		// Create a list of objects from the initial comment list
		// and set their depths to 0
		let children = story.kids.map(s => {
			return { id: s, depth: 0 };
		});

		while (children.length > 0) {
			// removes and returns the first element in an array
			let curNode = children.shift();
			let cId = curNode['id'];
			let cDepth = curNode['depth'];
			promises.push(
				axios.get(`https://hacker-news.firebaseio.com/v0/item/${cId}.json`)
			);
			let resolvedStories = await axios.all(promises);
			resolvedStories.forEach(story => {
				itemList.push({ ...story.data, depth: cDepth });
				let childNodes = [];
				if (Object.prototype.hasOwnProperty.call(story.data, 'kids')) {
					story.data.kids.forEach(k => {
						// increment the depth of children by 1
						childNodes.push({ id: k, depth: cDepth + 1 });
					});
				}
				children.unshift(...childNodes);
			});

			// clear out the promises array so that we don't get stuck making infinite requests
			promises = [];
		}
		return itemList;
	} catch (error) {
		throw Error(error);
	}
};
