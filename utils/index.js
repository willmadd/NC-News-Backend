exports.formatArticle = (articleData, userDocs) => {
  return articleData.map(article => {
    let user = userDocs.find(user => {
      return user.username === article.created_by;
    });
    return {
      title: article.title,
      body: article.body,
      created_at: article.created_at,
      belongs_to: article.topic,
      created_by: user._id
    };
  });
};

exports.formatComment = (commentData, articleDocs, usersDocs)=>{
    return commentData.map(comment => {
        let user = usersDocs.find(user =>{
            return user.username === comment.created_by;
        })

        let articleRelation = articleDocs.find(article => {
            return article.title === comment.belongs_to;
        })


        return {
            body: comment.body,
            votes: comment.votes,
            created_at: comment.created_at,
            belongs_to: articleRelation._id,
            created_by: user._id


        }
    })
}
