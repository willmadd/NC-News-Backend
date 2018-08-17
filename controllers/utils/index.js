const { Topic } = require("../../models");


exports.checkTopicandCreateIfNonExists = (topicName) => {
    return Topic.find({ slug: topicName.toLowerCase() }).then(results => {
      if (results.length === 0) {
        let insertTopic = {
          title:
            topicName.slice(0, 1).toUpperCase() +
            topicName.slice(1).toLowerCase(),
          slug: topicName.toLowerCase()
        };
        Topic.create(insertTopic);
      }
      return topicName;
    });
  };


exports.convertIdToTitle = (articleId) => {

}

//   module.exports = {checkTopicandCreateIfNonExists};