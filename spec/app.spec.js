process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest")(app);
const { expect } = require("chai");
const {
  articleData,
  commentData,
  topicData,
  usersData
} = require("../seed/test-data");
const seedDB = require("../seed/seed");
const mongoose = require("mongoose");

describe("/api", () => {
  let articleDocs,
    commentDocs,
    topicDocs,
    userDocs,
    wrongId = mongoose.Types.ObjectId();
  beforeEach(() => {
    return seedDB(articleData, commentData, topicData, usersData).then(docs => {
      [articleDocs, commentDocs, topicDocs, userDocs] = docs;
    });
  });

  after(() => {
    mongoose.disconnect();
  });

  describe("/", () => {
    it("return a static HTML page on api route", () => {
      return request.get("/api").expect(200);
    });
  });
  describe("api/topics", () => {
    it("Get returns the correct topics Object", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topicData.length).to.equal(2);
          expect(Array.isArray(res.body.topicData)).to.be.true;
        });
    });
    it("Get returns the articles object populated with correct keys", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topicData[0]).to.contain.keys(
            "_id",
            "title",
            "slug",
            "__v"
          );
        });
    });
    it("GET returns the articles in order", () => {
      return request
        .get("/api/topics")
        .expect(200)
        .then(res => {
          expect(res.body.topicData[0].title).to.equal("Mitch");
          expect(res.body.topicData[0].slug).to.equal("mitch");
        });
    });
    it("returns an array of articles when given a topic", () => {
      return request.get("/api/topics/cats/articles").then(res => {
        expect(Array.isArray(res.body.topicData)).to.be.true;
        expect(res.body.topicData.length).to.equal(2);
      });
    });

    it("GET returns an array of articles with the correct keys", () => {
      return request
        .get("/api/topics/cats/articles")
        .expect(200)
        .then(res => {
          expect(res.body.topicData[0]).to.contain.keys(
            "votes",
            "title",
            "created_by",
            "__v",
            "_id",
            "body"
          );
        });
    });
    it("GET returns a 400 when passed a slug that dosnt exist", () => {
      return request
        .get("/api/topics/mice/articles")
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal(
            "There are no articles for this topic"
          );
        });
    });
  });
  it("POST article to topic posts are article and returns the article", () => {
    const newArticle = {
      title: "This is a test title",
      body: "This is some test content"
    };
    return request
      .post("/api/topics/cats/articles")
      .send(newArticle)
      .expect(201)
      .then(res => {
        expect(res.body.article).to.have.all.keys(
          "votes",
          "title",
          "created_at",
          "belongs_to",
          "__v",
          "_id",
          "body"
        );
      });
  });

  describe("api/articles", () => {
    it("Get returns the correct Articles Object", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articleData.length).to.equal(4);
          expect(Array.isArray(res.body.articleData)).to.be.true;
        });
    });
    it("GET returns the articles object populated with correct keys", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articleData[0]).to.contain.keys(
            "votes",
            "_id",
            "title",
            "body",
            "created_by",
            "belongs_to",
            "__v"
          );
        });
    });
    it("GET returns the articles in order", () => {
      return request
        .get("/api/articles")
        .expect(200)
        .then(res => {
          expect(res.body.articleData[0].votes).to.equal(0);
          expect(res.body.articleData[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.articleData[0].body).to.equal(
            "I find this existence challenging"
          );
          expect(res.body.articleData[0].belongs_to).to.equal("mitch");
        });
    });
    it("GET article with article id returns an article", () => {
      return request
        .get(`/api/articles/${articleDocs[0]._id}`)
        .expect(200)
        .then(res => {
          expect(res.body.articleData[0].votes).to.equal(0);
          expect(res.body.articleData[0].title).to.equal(
            "Living in the shadow of a great man"
          );
          expect(res.body.articleData[0].body).to.equal(
            "I find this existence challenging"
          );
          expect(res.body.articleData[0].belongs_to).to.equal("mitch");
        });
    });
    it("GET returns an error when passed an id that does not exist", () => {
      return request
        .get(`/api/articles/${wrongId}`)
        .expect(400)
        .then(res => {
          expect(res.body.message).to.equal("No article exists with this ID");
        });
    });

    it("GET returns an error when passed an invalid id", () => {
        return request
          .get(`/api/articles/xyz`)
          .expect(404)
          .then(res => {
            expect(res.body.message).to.equal('Cast to ObjectId failed for value "xyz" at path "_id" for model "articles"');
          });
      });

    it("GET article comments", () => {
        return request
          .get(`/api/articles/${articleDocs[0]._id}`)
          .expect(200)
          .then(res => {
            expect(res.body.articleData[0].votes).to.equal(0);
            expect(res.body.articleData[0].title).to.equal(
              "Living in the shadow of a great man"
            );
            expect(res.body.articleData[0].body).to.equal(
              "I find this existence challenging"
            );
            expect(res.body.articleData[0].belongs_to).to.equal("mitch");
          });
      });
      it("GET returns an error when passed an id that does not exist", () => {
        return request
          .get(`/api/articles/${wrongId}/comments`)
          .expect(400)
          .then(res => {
            expect(res.body.message).to.equal("No article exists with this ID");
          });
      });
  
      it("GET returns an error when passed an invalid id", () => {
          return request
            .get(`/api/articles/xyz/comments`)
            .expect(404)
            .then(res => {
              expect(res.body.message).to.equal('Cast to ObjectId failed for value "xyz" at path "belongs_to" for model "comments"');
            });
        });
        it("POST comment to article posts a comment and returns the comment", () => {
            const newComment = {
              created_by: `${userDocs[0]._id}`,
              body: "This is a test comment"
            };
            return request
              .post(`/api/articles/${articleDocs[0]._id}/comments`)
              .send(newComment)
              .expect(201)
              .then(res => {
                expect(res.body.comment).to.have.all.keys(
                  "votes",
                  "belongs_to",
                  "created_at",
                  "created_by",
                  "__v",
                  "_id",
                  "body"
                );
              });
          });
          it("POST comment returns an error when passed invalid articleId", () => {
            const newComment = {
              created_by: `${userDocs[0]._id}`,
              body: "This is a test comment"
            };
            return request
              .post(`/api/articles/xyz/comments`)
              .send(newComment)
              .expect(404)
              .then(res => {
                expect(res.body.message).to.equal('comments validation failed: belongs_to: Cast to ObjectID failed for value "xyz" at path "belongs_to"');
              });
          });
          it("POST comment returns an error when passed non existent articleId", () => {
            const newComment = {
              created_by: `${userDocs[0]._id}`,
              body: "This is a test comment"
            };
            return request
              .post(`/api/articles/${wrongId}/comments`)
              .send(newComment)
              .expect(404)
              .then(res => {
                expect(res.body.message).to.equal('comments validation failed: belongs_to: Cast to ObjectID failed for value "xyz" at path "belongs_to"');
              });
          });
        


  });
});
