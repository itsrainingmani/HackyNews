import axios from 'axios';

// const storyTypes = ['top', 'best', 'new', 'ask', 'show', 'job'];
const numOfStories = 20;

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
