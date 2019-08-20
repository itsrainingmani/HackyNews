const express = require('express');
const axios = require('axios');
const router = express.Router();

const storyTypes = ['top', 'best', 'new', 'ask', 'show', 'job'];
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

const getSelectStories = async (type, pageNum) => {
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

// Router-level middleware that validates story type
router.use('/:type', (req, res, next) => {
  if (storyTypes.includes(req.params.type)) next();
  else res.status(404).send('Invalid Story type');
});

// type can be top, best, new, ask, show, job
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
