const express = require('express');
const axios = require('axios');
const router = express.Router();

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

const getSelectStories = async (type, pageNum) => {
  try {
    let selectTopStories = [];
    let allTopStories = await getAllStories(type);
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

router.get('/:type', (req, res, next) =>
  getAllStories(req.params.type)
    .then(data => res.send(data))
    .catch(err => next(err))
);

router.get('/:type/:pagenum', (req, res, next) =>
  getSelectStories(req.params.type, req.params.pagenum)
    .then(data => res.send(data))
    .catch(err => next(err))
);

module.exports = router;
