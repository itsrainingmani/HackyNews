const express = require('express');
const axios = require('axios');
const router = express.Router();

const getAllTopStories = async () => {
  try {
    let response = await axios.get(
      'https://hacker-news.firebaseio.com/v0/topstories.json'
    );
    return response.data;
  } catch (error) {
    console.debug(error);
    throw Error(error);
  }
};

const getSelectTopStories = async pageNum => {
  try {
    let selectTopStories = [];
    let allTopStories = await getAllTopStories();
    let topStoryTranch = allTopStories.slice(pageNum * 10 - 10, pageNum * 10);
    let promises = [];
    topStoryTranch.forEach(storyID => {
      promises.push(
        axios.get(`https://hacker-news.firebaseio.com/v0/item/${storyID}.json`)
      );
    });

    let resolvedStories = await axios.all(promises);
    resolvedStories.forEach(story => {
      let storyObj = {};
      storyObj[story.data.id] = story.data;
      selectTopStories.push(storyObj);
    });
    return selectTopStories;
  } catch (error) {
    throw Error(error);
  }
};

router.get('/', (_req, res, next) =>
  getAllTopStories()
    .then(data => res.send(data))
    .catch(err => next(err))
);

router.get('/:pagenum', (req, res, next) =>
  getSelectTopStories(req.params.pagenum)
    .then(data => res.send(data))
    .catch(err => next(err))
);

module.exports = router;
