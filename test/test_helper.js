const mongoose = require("mongoose");

// Connect to the mongo database

/**
 * Diffrence between before and beforeEach is that before only executes once.
 */

before((done ) => {
  mongoose.connect(
    "mongodb://localhost:27017/user",
    { useNewUrlParser: true }
  );
  mongoose.connection
    .once("open", () => {done(); })
    .on("error", error => {
      console.warn("Warning: ", error);
    });
});

//Pre hook : this hook will run before each test.
beforeEach(done => {
  const { users, comments, blogposts} = mongoose.connection.collections
  //mongo lowercases blogPosts to blogpost
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
