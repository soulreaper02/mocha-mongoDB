const assert = require("assert");
const User = require("../src/user");
const Comment = require("../src/comment");
const BlogPost = require("../src/blogPost");

describe('Associations ref', () => {
  let joe, blogPost, comment
  beforeEach((done) => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({ title: 'JS is great', content: 'Who writes mocha tests'});
    comment = new Comment({ content: 'Actually it is a good practice to learn how to write test' });

    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    //comment has one rel so no push
    comment.user = joe;

    //promise.all combine all promises
    Promise.all([joe.save(), blogPost.save(), comment.save()])
    .then(() => done());
  });

  it('saves a relation between a user and blogpost', done => {
    User.findOne({ name: 'Joe' })
    .populate('blogPosts') //user model prop
    .then((user) => {
      assert(user.blogPosts[0].title === "JS is great")
      done()
    })
  })

  it('saves a full relation graph', done => {
    User.findOne({ name: 'Joe' })
    .populate({
      path: 'blogPosts',
      populate: {
        path: 'comments',
        model: 'comment',
        populate: {
          path: 'user',
          model: 'user'
        }
      }
    })
    .then((user) => {
      assert(user.name === 'Joe');
      assert(user.blogPosts[0].title === 'JS is great');
      assert(user.blogPosts[0].comments[0].content === 'Actually it is a good practice to learn how to write test');
      assert(user.blogPosts[0].comments[0].user.name === 'Joe');
      done();
    })
  })

});